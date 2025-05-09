import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { login } from "./api/auth";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  try {
    const { access_token } = await login();

    response.cookies.set("access_token", access_token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });
  } catch (error) {
    console.error(error);
    response.cookies.set("access_token", "");
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/page/1", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
