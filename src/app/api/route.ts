import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
  console.log(request.headers.get("user-id"));
  return Response.json({
    message: "Hello from the API route!",
  });
}
