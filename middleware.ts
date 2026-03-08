import NextAuth from "next-auth";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const session = await auth();

    // /admin 으로 시작하는 경로 보호
    if (request.nextUrl.pathname.startsWith("/admin")) {
        if (!session) {
            const loginUrl = new URL("/auth/signin", request.url);
            loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // /auth/signin 접근 시 이미 로그인되어 있다면 /admin으로 이동
    if (request.nextUrl.pathname.startsWith("/auth/signin")) {
        if (session) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/auth/signin"],
};
