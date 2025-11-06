import express from "express";
import cors from "cors";
import { Client as MinioClient } from "minio";

const PORT = process.env.UPLOADER_PORT
  ? Number(process.env.UPLOADER_PORT)
  : 4001;
const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || "localhost";
const MINIO_PORT = process.env.MINIO_PORT
  ? Number(process.env.MINIO_PORT)
  : 9000;
const MINIO_USE_SSL = (process.env.MINIO_USE_SSL || "false") === "true";
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || "minio";
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || "minio12345";
const MINIO_PUBLIC_URL =
  process.env.MINIO_PUBLIC_URL || `http://localhost:${MINIO_PORT}`;

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));

const minio = new MinioClient({
  endPoint: MINIO_ENDPOINT,
  port: MINIO_PORT,
  useSSL: MINIO_USE_SSL,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
});

async function ensureBucket(bucket) {
  const exists = await minio.bucketExists(bucket).catch(() => false);
  if (!exists) {
    await minio.makeBucket(bucket, "us-east-1");
    // Política pública de lectura: opcional para dev
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${bucket}/*`],
        },
      ],
    };
    await minio.setBucketPolicy(bucket, JSON.stringify(policy));
  }
}

app.post("/sign", async (req, res) => {
  try {
    const {
      bucket = "gallery",
      path,
      contentType = "application/octet-stream",
    } = req.body || {};
    if (!path) return res.status(400).json({ error: "path is required" });

    await ensureBucket(bucket);

    // Presigned PUT
    const expires = 60; // seconds
    const signedUrl = await minio.presignedPutObject(bucket, path, expires, {
      "Content-Type": contentType,
    });

    // Construir URL pública sin encodear las barras del path
    const publicUrl = `${MINIO_PUBLIC_URL}/${bucket}/${path}`;

    res.json({ url: signedUrl, publicUrl });
  } catch (e) {
    console.error("sign error", e);
    res.status(500).json({ error: String(e?.message || e) });
  }
});

app.delete("/object", async (req, res) => {
  try {
    const { bucket = "gallery", path } = req.query;
    if (!path) return res.status(400).json({ error: "path is required" });

    await minio.removeObject(bucket, path);
    res.json({ ok: true });
  } catch (e) {
    console.error("delete error", e);
    res.status(500).json({ error: String(e?.message || e) });
  }
});

app.post("/list", async (req, res) => {
  try {
    const { bucket = "gallery", prefix = "" } = req.body || {};

    await ensureBucket(bucket);

    const stream = minio.listObjects(bucket, prefix, false);
    const files = [];

    stream.on("data", (obj) => {
      if (obj.name && !obj.name.endsWith("/")) {
        files.push({
          name: obj.name,
          size: obj.size,
          lastModified: obj.lastModified,
        });
      }
    });

    stream.on("end", () => {
      res.json({ files });
    });

    stream.on("error", (err) => {
      console.error("list error", err);
      res.status(500).json({ error: String(err?.message || err) });
    });
  } catch (e) {
    console.error("list error", e);
    res.status(500).json({ error: String(e?.message || e) });
  }
});

app.get("/health", (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Uploader listening on http://0.0.0.0:${PORT}`);
});
