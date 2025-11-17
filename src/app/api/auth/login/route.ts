import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    const body = await request.json();

    const { email, password } = body;
    if(!email || !password) {
        return Response.json({ message: "Email and password are required" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        return Response.json({ message: error.message }, { status: 401 });
    }

    return Response.json({ message: "Login successful", user: data.user });
}