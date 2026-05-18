/**
 * Shared JWT verification for admin API routes.
 * Import and call in any /api/admin/* route to protect it.
 *
 * Usage:
 *   const user = await verifyAdmin(request)
 *   if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })
 */

import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_PASSWORD || "fallback-secret-change-me",
)

/**
 * Verify the admin JWT from the request cookies.
 * Returns the payload on success, or null on failure.
 */
export async function verifyAdmin(request) {
  try {
    const cookieHeader = request.headers.get("cookie") || ""
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [key, ...val] = c.trim().split("=")
        return [key, val.join("=")]
      }),
    )
    const token = cookies["admin_token"]
    if (!token) return null

    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}
