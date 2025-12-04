import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  /** Proteccion de apis */
  if (pathname.startsWith("/api")) {
    if (pathname === "/api/auth/login" || pathname === "/api/auth/signup") {
      return NextResponse.next();
    }
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {
            // intentionally empty – cookies se sincronizan en updateSession
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    /** Insertar user en la request */
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user-id", user.id);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
