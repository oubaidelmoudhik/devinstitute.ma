import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_PASSWORD || "fallback-secret-change-me",
)

const ADMIN_LOGIN = "/admin/login"
const ADMIN_ROOT = "/admin"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin (except /admin/login)
  if (!pathname.startsWith(ADMIN_ROOT) || pathname === ADMIN_LOGIN) {
    return NextResponse.next()
  }

  const token = req.cookies.get("admin_token")?.value

  if (!token) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN, req.url))
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    // Token expired or invalid
    const response = NextResponse.redirect(new URL(ADMIN_LOGIN, req.url))
    response.cookies.set("admin_token", "", { maxAge: 0, path: "/" })
    return response
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
