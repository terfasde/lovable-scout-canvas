import { Router } from "express";
import { db } from "../db";
import { authMiddleware } from "../auth";
import { z } from "zod";
import { randomUUID } from "node:crypto";

export const threadsRouter = Router();

function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

// Listar hilos (feed simple)
threadsRouter.get("/", authMiddleware, (req: any, res: any) => {
  const limit = Math.min(Number(req.query.limit) || 50, 100);
  const rows = db
    .prepare(
      `
    SELECT id, author_id, content, image_url, created_at
    FROM threads
    ORDER BY datetime(created_at) DESC
    LIMIT ?
  `,
    )
    .all(limit);
  res.json(rows);
});

const createThreadSchema = z.object({
  content: z.string().max(500).optional().default(""),
  image_url: z.string().url().optional().nullable(),
});

// Crear hilo
threadsRouter.post("/", authMiddleware, (req: any, res: any) => {
  const userId = (req as any).user.id as string;
  const parse = createThreadSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });
  const { content, image_url } = parse.data;
  const trimmed = (content || "").trim();
  if (!trimmed && !image_url) {
    return res.status(400).json({ error: "El contenido no puede estar vacío" });
  }
  const id = randomUUID();
  db.prepare(
    `INSERT INTO threads (id, author_id, content, image_url) VALUES (?, ?, ?, ?)`,
  ).run(id, userId, trimmed, image_url ?? null);
  const row = db
    .prepare(
      `SELECT id, author_id, content, image_url, created_at FROM threads WHERE id = ?`,
    )
    .get(id);
  res.status(201).json(row);
});

// Eliminar hilo (solo autor)
threadsRouter.delete("/:id", authMiddleware, (req: any, res: any) => {
  const userId = (req as any).user.id as string;
  const id = String(req.params.id);
  const thread = db
    .prepare(`SELECT author_id FROM threads WHERE id = ?`)
    .get(id);
  if (!thread) return res.status(404).json({ error: "No encontrado" });
  if (thread.author_id !== userId) {
    // Permitir a admins eliminar cualquier hilo
    const u = db.prepare(`SELECT email FROM users WHERE id = ?`).get(userId) as
      | { email?: string }
      | undefined;
    if (!u || !isAdminEmail(u.email))
      return res.status(403).json({ error: "No autorizado" });
  }
  db.prepare(`DELETE FROM threads WHERE id = ?`).run(id);
  res.json({ ok: true });
});

// Listar comentarios de un hilo
threadsRouter.get("/:id/comments", authMiddleware, (req: any, res: any) => {
  const id = String(req.params.id);
  const rows = db
    .prepare(
      `
    SELECT id, thread_id, author_id, content, created_at
    FROM thread_comments
    WHERE thread_id = ?
    ORDER BY datetime(created_at) ASC
  `,
    )
    .all(id);
  res.json(rows);
});

const createCommentSchema = z.object({ content: z.string().min(1).max(500) });

// Agregar comentario a un hilo
threadsRouter.post("/:id/comments", authMiddleware, (req: any, res: any) => {
  const threadId = String(req.params.id);
  const userId = (req as any).user.id as string;
  const exists = db
    .prepare(`SELECT id FROM threads WHERE id = ?`)
    .get(threadId);
  if (!exists) return res.status(404).json({ error: "Hilo no encontrado" });
  const parse = createCommentSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });
  const id = randomUUID();
  db.prepare(
    `INSERT INTO thread_comments (id, thread_id, author_id, content) VALUES (?, ?, ?, ?)`,
  ).run(id, threadId, userId, parse.data.content.trim());
  const row = db
    .prepare(
      `SELECT id, thread_id, author_id, content, created_at FROM thread_comments WHERE id = ?`,
    )
    .get(id);
  res.status(201).json(row);
});

// Eliminar comentario (autor del comentario o autor del hilo)
threadsRouter.delete(
  "/:id/comments/:commentId",
  authMiddleware,
  (req: any, res: any) => {
    const threadId = String(req.params.id);
    const commentId = String(req.params.commentId);
    const userId = (req as any).user.id as string;
    const comment = db
      .prepare(`SELECT author_id, thread_id FROM thread_comments WHERE id = ?`)
      .get(commentId);
    if (!comment || comment.thread_id !== threadId)
      return res.status(404).json({ error: "Comentario no encontrado" });
    if (comment.author_id !== userId) {
      const thread = db
        .prepare(`SELECT author_id FROM threads WHERE id = ?`)
        .get(threadId);
      if (!thread || thread.author_id !== userId)
        return res.status(403).json({ error: "No autorizado" });
    }
    db.prepare(`DELETE FROM thread_comments WHERE id = ?`).run(commentId);
    res.json({ ok: true });
  },
);
