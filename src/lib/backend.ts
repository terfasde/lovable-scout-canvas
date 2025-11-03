import { supabase } from "@/integrations/supabase/client"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080"
const MODE = (import.meta.env.VITE_BACKEND || "supabase").toLowerCase()

export function isLocalBackend() {
  return MODE === "local"
}

function getStoredToken() {
  return localStorage.getItem("local_api_token")
}

function setStoredToken(token: string) {
  localStorage.setItem("local_api_token", token)
}

async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error("Login fallido")
  const data = await res.json()
  return data.token as string
}

async function register(email: string, password: string, username: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username })
  })
  if (!res.ok) throw new Error("Registro fallido")
  const data = await res.json()
  return data.token as string
}

export async function ensureLocalToken() {
  let token = getStoredToken()
  if (token) return token

  // Intentamos mapear con el usuario de Supabase si existe
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user

  const DEFAULT_PASSWORD = "supabase-bridge-password"

  if (user?.email) {
    const email = user.email
    const username = (user.user_metadata as any)?.username || email.split("@")[0]
    try {
      token = await login(email, DEFAULT_PASSWORD)
    } catch {
      token = await register(email, DEFAULT_PASSWORD, username)
    }
    setStoredToken(token)
    return token
  }

  // Si no hay usuario Supabase, creamos uno invitado
  const rand = Math.random().toString(36).slice(2, 8)
  const email = `guest-${rand}@local.dev`
  const password = "guest"
  const username = `guest_${rand}`
  try {
    token = await login(email, password)
  } catch {
    token = await register(email, password, username)
  }
  setStoredToken(token)
  return token
}

export async function apiFetch(path: string, init: RequestInit = {}) {
  const token = await ensureLocalToken()
  const headers = new Headers(init.headers || {})
  headers.set("Authorization", `Bearer ${token}`)
  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers })
  if (!res.ok) {
    let msg = `Error ${res.status}`
    try {
      const j = await res.json()
      msg = j?.error || msg
    } catch (e) {
      // ignore parse error; keep generic message
    }
    throw new Error(msg)
  }
  const contentType = res.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return res.json()
  }
  return res.text()
}

export async function uploadImage(file: File): Promise<string> {
  const token = await ensureLocalToken()
  const fd = new FormData()
  fd.append("file", file)
  const res = await fetch(`${API_BASE}/upload/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd
  })
  if (!res.ok) throw new Error("Error al subir imagen")
  const data = await res.json()
  return data.url as string
}
