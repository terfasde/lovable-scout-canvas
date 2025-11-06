import { Router } from "express";
import { z } from "zod";
import { db } from "../db";
import { authMiddleware } from "../auth";
import { randomUUID } from "node:crypto";

export const groupsRouter = Router();

// List my groups and public groups (simplified)
groupsRouter.get("/", authMiddleware, (req: any, res: any) => {
  const userId = (req as any).user.id as string;
  const myGroups = db
    .prepare(
      `
    SELECT g.*, COALESCE(m.role, NULL) as my_role
    FROM groups g
    LEFT JOIN group_members m ON m.group_id = g.id AND m.user_id = ?
    ORDER BY g.updated_at DESC
  `,
    )
    .all(userId);
  res.json(myGroups);
});

const createSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  cover_url: z.string().url().optional(),
});

groupsRouter.post("/", authMiddleware, (req: any, res: any) => {
  const userId = (req as any).user.id as string;
  const parse = createSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });
  const id = randomUUID();
  const { name, description, cover_url } = parse.data;
  db.prepare(
    "INSERT INTO groups (id, name, description, cover_url, creator_id) VALUES (?, ?, ?, ?, ?)",
  ).run(id, name, description ?? null, cover_url ?? null, userId);
  // owner membership
  db.prepare(
    "INSERT OR IGNORE INTO group_members (group_id, user_id, role) VALUES (?, ?, ?)",
  ).run(id, userId, "owner");
  const group = db.prepare("SELECT * FROM groups WHERE id = ?").get(id);
  res.status(201).json(group);
});

groupsRouter.get("/:id", authMiddleware, (req: any, res: any) => {
  const id = req.params.id;
  const group = db.prepare("SELECT * FROM groups WHERE id = ?").get(id);
  if (!group) return res.status(404).json({ error: "Grupo no encontrado" });
  res.json(group);
});

groupsRouter.get("/:id/members", authMiddleware, (req: any, res: any) => {
  const id = req.params.id;
  const rows = db
    .prepare(
      `
    SELECT m.user_id, m.role, u.username, u.email
    FROM group_members m
    JOIN users u ON u.id = m.user_id
    WHERE m.group_id = ?
    ORDER BY CASE m.role WHEN 'owner' THEN 0 WHEN 'admin' THEN 1 ELSE 2 END, u.username
  `,
    )
    .all(id);
  res.json(rows);
});

groupsRouter.post("/:id/join", authMiddleware, (req: any, res: any) => {
  const groupId = req.params.id;
  const userId = (req as any).user.id as string;
  const exists = db.prepare("SELECT id FROM groups WHERE id = ?").get(groupId);
  if (!exists) return res.status(404).json({ error: "Grupo no encontrado" });
  db.prepare(
    "INSERT OR IGNORE INTO group_members (group_id, user_id, role) VALUES (?, ?, ?)",
  ).run(groupId, userId, "member");
  res.json({ ok: true });
});

groupsRouter.post("/:id/leave", authMiddleware, (req: any, res: any) => {
  const groupId = req.params.id;
  const userId = (req as any).user.id as string;
  const member = db
    .prepare(
      "SELECT role FROM group_members WHERE group_id = ? AND user_id = ?",
    )
    .get(groupId, userId);
  if (!member) return res.status(400).json({ error: "No eres miembro" });
  if (member.role === "owner")
    return res.status(400).json({
      error:
        "El propietario no puede salir. Transfiere propiedad o elimina el grupo.",
    });
  db.prepare(
    "DELETE FROM group_members WHERE group_id = ? AND user_id = ?",
  ).run(groupId, userId);
  res.json({ ok: true });
});

const inviteSchema = z.object({ userIds: z.array(z.string().uuid()).min(1) });
groupsRouter.post(
  "/:id/members/invite",
  authMiddleware,
  (req: any, res: any) => {
    const groupId = req.params.id;
    const userId = (req as any).user.id as string;
    const me = db
      .prepare(
        "SELECT role FROM group_members WHERE group_id = ? AND user_id = ?",
      )
      .get(groupId, userId);
    if (!me || (me.role !== "owner" && me.role !== "admin"))
      return res.status(403).json({ error: "Permisos insuficientes" });
    const parse = inviteSchema.safeParse(req.body);
    if (!parse.success)
      return res.status(400).json({ error: parse.error.flatten() });
    const { userIds } = parse.data;
    const insert = db.prepare(
      "INSERT OR IGNORE INTO group_members (group_id, user_id, role) VALUES (?, ?, ?)",
    );
    const tx = db.transaction((ids: string[]) => {
      for (const uid of ids) insert.run(groupId, uid, "member");
    });
    tx(userIds);
    res.json({ added: userIds.length });
  },
);

groupsRouter.delete("/:id", authMiddleware, (req: any, res: any) => {
  const groupId = req.params.id;
  const userId = (req as any).user.id as string;
  const owner = db
    .prepare(
      "SELECT 1 FROM group_members WHERE group_id = ? AND user_id = ? AND role = ?",
    )
    .get(groupId, userId, "owner");
  if (!owner)
    return res
      .status(403)
      .json({ error: "Solo el propietario puede eliminar" });
  db.prepare("DELETE FROM groups WHERE id = ?").run(groupId);
  res.json({ ok: true });
});

const messageSchema = z.object({
  content: z.string().max(4000).optional(),
  image_url: z.string().url().optional(),
});
groupsRouter.post("/:id/messages", authMiddleware, (req: any, res: any) => {
  const groupId = req.params.id;
  const userId = (req as any).user.id as string;
  const member = db
    .prepare("SELECT 1 FROM group_members WHERE group_id = ? AND user_id = ?")
    .get(groupId, userId);
  if (!member) return res.status(403).json({ error: "Debes ser miembro" });
  const parse = messageSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });
  const { content, image_url } = parse.data;
  if (!content && !image_url)
    return res.status(400).json({ error: "Mensaje vacío" });
  const id = randomUUID();
  db.prepare(
    "INSERT INTO group_messages (id, group_id, user_id, content, image_url) VALUES (?, ?, ?, ?, ?)",
  ).run(id, groupId, userId, content ?? null, image_url ?? null);
  const row = db
    .prepare(
      `
    SELECT m.id, m.group_id, m.user_id, m.content, m.image_url, m.created_at, u.username
    FROM group_messages m JOIN users u ON u.id = m.user_id WHERE m.id = ?
  `,
    )
    .get(id);
  // Emit via Socket.IO (if attached)
  const io = req.app.get("io") as any;
  io?.to(`group:${groupId}`).emit("group:message", row);
  res.status(201).json(row);
});

groupsRouter.get("/:id/messages", authMiddleware, (req: any, res: any) => {
  const groupId = req.params.id;
  const since = req.query.since as string | undefined;
  let rows;
  if (since) {
    rows = db
      .prepare(
        "SELECT * FROM group_messages WHERE group_id = ? AND datetime(created_at) > datetime(?) ORDER BY created_at ASC",
      )
      .all(groupId, since);
  } else {
    rows = db
      .prepare(
        "SELECT * FROM group_messages WHERE group_id = ? ORDER BY created_at ASC",
      )
      .all(groupId);
  }
  res.json(rows);
});

// --- Admin operations: promote/demote/kick/update ---
const roleBodySchema = z.object({ userId: z.string().uuid() });
groupsRouter.post(
  "/:id/admins/promote",
  authMiddleware,
  (req: any, res: any) => {
    const groupId = req.params.id;
    const me = (req as any).user.id as string;
    const meRow = db
      .prepare(
        "SELECT role FROM group_members WHERE group_id = ? AND user_id = ?",
      )
      .get(groupId, me) as { role?: string } | undefined;
    if (!meRow || meRow.role !== "owner")
      return res
        .status(403)
        .json({ error: "Solo el propietario puede promover" });
    const parse = roleBodySchema.safeParse(req.body);
    if (!parse.success)
      return res.status(400).json({ error: parse.error.flatten() });
    const { userId } = parse.data;
    const target = db
      .prepare(
        "SELECT role FROM group_members WHERE group_id = ? AND user_id = ?",
      )
      .get(groupId, userId) as { role?: string } | undefined;
    if (!target)
      return res.status(404).json({ error: "Miembro no encontrado" });
    if (target.role === "owner")
      return res
        .status(400)
        .json({ error: "No puedes cambiar el propietario" });
    db.prepare(
      "UPDATE group_members SET role = ? WHERE group_id = ? AND user_id = ?",
    ).run("admin", groupId, userId);
    res.json({ ok: true });
  },
);

groupsRouter.post(
  "/:id/admins/demote",
  authMiddleware,
  (req: any, res: any) => {
    const groupId = req.params.id;
    const me = (req as any).user.id as string;
    const meRow = db
      .prepare(
        "SELECT role FROM group_members WHERE group_id = ? AND user_id = ?",
      )
      .get(groupId, me) as { role?: string } | undefined;
    if (!meRow || meRow.role !== "owner")
      return res
        .status(403)
        .json({ error: "Solo el propietario puede degradar" });
    const parse = roleBodySchema.safeParse(req.body);
    if (!parse.success)
      return res.status(400).json({ error: parse.error.flatten() });
    const { userId } = parse.data;
    const target = db
      .prepare(
        "SELECT role FROM group_members WHERE group_id = ? AND user_id = ?",
      )
      .get(groupId, userId) as { role?: string } | undefined;
    if (!target)
      return res.status(404).json({ error: "Miembro no encontrado" });
    if (target.role === "owner")
      return res
        .status(400)
        .json({ error: "No puedes cambiar el propietario" });
    db.prepare(
      "UPDATE group_members SET role = ? WHERE group_id = ? AND user_id = ?",
    ).run("member", groupId, userId);
    res.json({ ok: true });
  },
);

groupsRouter.delete(
  "/:id/members/:userId",
  authMiddleware,
  (req: any, res: any) => {
    const groupId = req.params.id;
    const userId = req.params.userId;
    const me = (req as any).user.id as string;
    const meRow = db
      .prepare(
        "SELECT role FROM group_members WHERE group_id = ? AND user_id = ?",
      )
      .get(groupId, me) as { role?: string } | undefined;
    if (!meRow || (meRow.role !== "owner" && meRow.role !== "admin"))
      return res.status(403).json({ error: "Permisos insuficientes" });
    const target = db
      .prepare(
        "SELECT role FROM group_members WHERE group_id = ? AND user_id = ?",
      )
      .get(groupId, userId) as { role?: string } | undefined;
    if (!target)
      return res.status(404).json({ error: "Miembro no encontrado" });
    if (target.role === "owner")
      return res
        .status(400)
        .json({ error: "No puedes expulsar al propietario" });
    db.prepare(
      "DELETE FROM group_members WHERE group_id = ? AND user_id = ?",
    ).run(groupId, userId);
    res.json({ ok: true });
  },
);

const updateGroupSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  description: z.string().max(500).nullable().optional(),
  cover_url: z.string().url().nullable().optional(),
});
groupsRouter.put("/:id", authMiddleware, (req: any, res: any) => {
  const groupId = req.params.id;
  const me = (req as any).user.id as string;
  const meRow = db
    .prepare(
      "SELECT role FROM group_members WHERE group_id = ? AND user_id = ?",
    )
    .get(groupId, me) as { role?: string } | undefined;
  if (!meRow || (meRow.role !== "owner" && meRow.role !== "admin"))
    return res.status(403).json({ error: "Permisos insuficientes" });
  const parse = updateGroupSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });
  const { name, description, cover_url } = parse.data;
  const setParts: string[] = [];
  const params: any[] = [];
  if (name !== undefined) {
    setParts.push("name = ?");
    params.push(name);
  }
  if (description !== undefined) {
    setParts.push("description = ?");
    params.push(description);
  }
  if (cover_url !== undefined) {
    setParts.push("cover_url = ?");
    params.push(cover_url);
  }
  if (setParts.length === 0) return res.json({ ok: true });
  const sql = `UPDATE groups SET ${setParts.join(", ")}, updated_at = datetime('now') WHERE id = ?`;
  params.push(groupId);
  db.prepare(sql).run(...params);
  const group = db.prepare("SELECT * FROM groups WHERE id = ?").get(groupId);
  res.json(group);
});
