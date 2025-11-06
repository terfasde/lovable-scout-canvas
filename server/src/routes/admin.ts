import { Router } from "express";
import { z } from "zod";
import { db } from "../db";
import { authMiddleware } from "../auth";

export const adminRouter = Router();

function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

function isSecretValid(req: any): boolean {
  const header = (req.headers?.["x-admin-secret"] ||
    req.headers?.["X-Admin-Secret"]) as string | undefined;
  const secret = process.env.ADMIN_SECRET;
  return !!secret && header === secret;
}

// Middleware que permite acceso si hay SECRET válido, de lo contrario requiere auth
function adminGate(req: any, res: any, next: any) {
  if (isSecretValid(req)) return next();
  return authMiddleware(req, res, next);
}

const deleteSchema = z.object({ email: z.string().email() });

adminRouter.post("/users/delete", adminGate, (req: any, res: any) => {
  const parse = deleteSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });
  const emailToDelete = parse.data.email;

  // Si no se usa SECRET, verificar que el usuario autenticado sea admin por email
  if (!isSecretValid(req)) {
    const userId = (req as any)?.user?.id as string | undefined;
    if (!userId) return res.status(401).json({ error: "No autorizado" });
    const current = db
      .prepare("SELECT email FROM users WHERE id = ?")
      .get(userId) as { email?: string } | undefined;
    if (!current || !isAdminEmail(current.email))
      return res.status(403).json({ error: "No autorizado" });
  }

  const target = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(emailToDelete) as { id?: string } | undefined;
  if (!target?.id)
    return res.status(404).json({ error: "Usuario no encontrado" });

  const tx = db.transaction((email: string) => {
    db.prepare("DELETE FROM users WHERE email = ?").run(email);
  });
  tx(emailToDelete);
  return res.json({ ok: true, deletedEmail: emailToDelete });
});

export default adminRouter;
