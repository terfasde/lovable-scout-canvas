import { Router } from "express";
import { z } from "zod";
import { db } from "../db";
import bcrypt from "bcryptjs";
import { signToken } from "../auth";
import { randomUUID } from "node:crypto";

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_]+$/),
});

authRouter.post("/register", (req: any, res: any) => {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });
  const { email, password, username } = parse.data;

  const existing = db
    .prepare("SELECT id FROM users WHERE email = ? OR username = ?")
    .get(email, username);
  if (existing)
    return res.status(409).json({ error: "Email o usuario ya existe" });

  const id = randomUUID();
  const password_hash = bcrypt.hashSync(password, 10);
  db.prepare(
    "INSERT INTO users (id, email, password_hash, username) VALUES (?, ?, ?, ?)",
  ).run(id, email, password_hash, username);
  db.prepare(
    `INSERT INTO profiles (user_id, nombre_completo, is_public, seisena, patrulla, equipo_pioneros, comunidad_rovers, fecha_nacimiento, rol_adulto, telefono, avatar_url) 
    VALUES (?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`,
  ).run(id, username, 0);
  const token = signToken({ userId: id });
  res.json({ token, user: { id, email, username } });
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

authRouter.post("/login", (req: any, res: any) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });
  const { email, password } = parse.data;
  const row = db
    .prepare("SELECT id, password_hash, username FROM users WHERE email = ?")
    .get(email);
  if (!row) return res.status(400).json({ error: "Credenciales inválidas" });
  const valid = bcrypt.compareSync(password, row.password_hash);
  if (!valid) return res.status(400).json({ error: "Credenciales inválidas" });
  const token = signToken({ userId: row.id });
  res.json({ token, user: { id: row.id, email, username: row.username } });
});
