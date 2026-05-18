"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Invalid password")
        return
      }

      router.push("/admin")
    } catch {
      setError("Connection error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1f2421",
        padding: "100px 20px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#1a1a1a",
          borderRadius: "20px",
          border: "1px solid rgba(254, 254, 254, 0.2)",
          padding: "50px 36px",
        }}
      >
        <h2
          style={{
            fontFamily: "Unbounded, sans-serif",
            color: "#fefefe",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 36px)",
            lineHeight: 1.2,
            letterSpacing: "-1.8px",
            marginBottom: "8px",
          }}
        >
          Admin Login
        </h2>
        <p
          style={{
            fontFamily: "Raleway, sans-serif",
            color: "#c8c8cd",
            fontSize: "16px",
            lineHeight: 1.67,
            marginBottom: "30px",
          }}
        >
          Enter the admin password to manage blog posts.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              style={{ height: "64px", borderRadius: "8px", fontSize: "16px" }}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#e74c3c",
                fontFamily: "Raleway, sans-serif",
                fontSize: "14px",
                marginBottom: "16px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !password}
            style={{
              width: "100%",
              height: "57px",
              fontSize: "16px",
              borderRadius: "2rem",
              backgroundColor: "#49a078",
              borderColor: "#49a078",
              color: "#1f2421",
            }}
          >
            <span>{loading ? "Signing in..." : "Sign In"}</span>
            <span>{loading ? "Signing in..." : "Sign In"}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
