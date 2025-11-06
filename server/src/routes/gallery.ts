import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { authMiddleware } from "../auth";

const USE_MINIO = process.env.USE_MINIO === "true";
const UPLOADER_URL = process.env.UPLOADER_URL || "http://localhost:4001";

const baseDir = path.join(process.cwd(), "server", "uploads", "gallery");
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

// Multer para memoria (necesitamos el buffer para MinIO)
const upload = multer({
  storage: USE_MINIO
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: (req: any, _file: any, cb: any) => {
          const album = String(req.params.album || "").trim();
          if (!album) return cb(new Error("Álbum requerido"));
          const dir = path.join(baseDir, album);
          fs.mkdirSync(dir, { recursive: true });
          cb(null, dir);
        },
        filename: (_req: any, file: any, cb: any) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = path.extname(file.originalname) || ".jpg";
          cb(null, `${unique}${ext}`);
        },
      }),
});

export const galleryRouter = Router();

// Listar álbumes (carpetas dentro de gallery)
galleryRouter.get("/albums", authMiddleware, (_req: any, res: any) => {
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  const folders = entries
    .filter((e) => e.isDirectory())
    .map((e) => ({ name: e.name }));
  res.json(folders);
});

// Crear álbum
galleryRouter.post("/albums", authMiddleware, (req: any, res: any) => {
  const name = String(req.body?.name || "").trim();
  if (!name) return res.status(400).json({ error: "Nombre requerido" });
  const dir = path.join(baseDir, name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  res.status(201).json({ name });
});

// Listar imágenes de un álbum
galleryRouter.get(
  "/albums/:album/images",
  authMiddleware,
  async (req: any, res: any) => {
    const album = String(req.params.album || "").trim();

    if (USE_MINIO) {
      try {
        // Llamar al cliente MinIO a través de un simple endpoint que podríamos agregar,
        // o usar API directa de MinIO. Por simplicidad, usamos fetch al API de MinIO
        const minioEndpoint = process.env.MINIO_ENDPOINT || "minio";
        const minioPort = process.env.MINIO_PORT || "9000";

        // Usamos la API de listado de MinIO directamente
        // Nota: MinIO API requiere autenticación AWS Signature, así que mejor usar el uploader
        const listResponse = await fetch(`${UPLOADER_URL}/list`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bucket: "gallery", prefix: `${album}/` }),
        });

        if (!listResponse.ok) {
          console.error("[GALLERY] Error listing from MinIO");
          return res.json([]);
        }

        const { files } = await listResponse.json();
        const publicUrl =
          process.env.MINIO_PUBLIC_URL || "http://localhost:9000";

        const images = files.map((f: any) => ({
          url: `${publicUrl}/gallery/${f.name}`,
          path: f.name,
        }));

        return res.json(images);
      } catch (error) {
        console.error("[GALLERY] Error listing images from MinIO:", error);
        return res.json([]);
      }
    }

    // Sistema de archivos local (fallback)
    const dir = path.join(baseDir, album);
    if (!fs.existsSync(dir)) return res.json([]);
    const files = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isFile())
      .map((e) => ({
        url: `/uploads/gallery/${album}/${e.name}`,
        path: `${album}/${e.name}`,
      }));
    res.json(files);
  },
);

// Subir imágenes a un álbum
galleryRouter.post(
  "/albums/:album/images",
  authMiddleware,
  upload.array("files", 20),
  async (req: any, res: any) => {
    const album = String(req.params.album || "").trim();
    const files = (req.files as any[] | undefined) || [];

    if (USE_MINIO) {
      try {
        const uploadPromises = files.map(async (file: any) => {
          const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname) || ".jpg"}`;
          const filePath = `${album}/${filename}`;

          // Obtener URL presignada del servicio uploader
          const signResponse = await fetch(`${UPLOADER_URL}/sign`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bucket: "gallery",
              path: filePath,
              contentType: file.mimetype || "image/jpeg",
            }),
          });

          if (!signResponse.ok) {
            throw new Error("Error al obtener URL de carga");
          }

          const { url: signedUrl, publicUrl } = await signResponse.json();

          console.log("[GALLERY] Signed URL:", signedUrl);
          console.log("[GALLERY] Public URL:", publicUrl);

          // Subir archivo a MinIO usando la URL presignada
          const uploadResponse = await fetch(signedUrl, {
            method: "PUT",
            headers: { "Content-Type": file.mimetype || "image/jpeg" },
            body: file.buffer,
          });

          if (!uploadResponse.ok) {
            console.error(
              "[GALLERY] Upload failed with status:",
              uploadResponse.status,
            );
            throw new Error("Error al subir archivo a MinIO");
          }

          console.log("[GALLERY] File uploaded successfully to:", publicUrl);

          return { url: publicUrl, path: filePath };
        });

        const results = await Promise.all(uploadPromises);
        return res.status(201).json(results);
      } catch (error) {
        console.error("Error uploading to MinIO:", error);
        return res
          .status(500)
          .json({ error: "Error al subir imágenes a MinIO" });
      }
    }

    // Sistema de archivos local (fallback)
    const out = files.map((f: any) => ({
      url: `/uploads/gallery/${album}/${f.filename}`,
      path: `${album}/${f.filename}`,
    }));
    res.status(201).json(out);
  },
);

// Eliminar imagen
galleryRouter.delete("/images", authMiddleware, async (req: any, res: any) => {
  const pathParam = String(req.query.path || "").trim(); // formato: album/filename
  if (!pathParam || pathParam.includes(".."))
    return res.status(400).json({ error: "Ruta inválida" });

  if (USE_MINIO) {
    try {
      const deleteResponse = await fetch(
        `${UPLOADER_URL}/object?bucket=gallery&path=${encodeURIComponent(pathParam)}`,
        {
          method: "DELETE",
        },
      );

      if (!deleteResponse.ok) {
        console.error("[GALLERY] Error deleting from MinIO");
        return res.status(500).json({ error: "Error al eliminar imagen" });
      }

      console.log("[GALLERY] Image deleted from MinIO:", pathParam);
      return res.json({ ok: true });
    } catch (error) {
      console.error("[GALLERY] Error deleting image from MinIO:", error);
      return res.status(500).json({ error: "Error al eliminar imagen" });
    }
  }

  // Sistema de archivos local (fallback)
  const filePath = path.join(baseDir, pathParam);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  res.json({ ok: true });
});

// Eliminar álbum entero
galleryRouter.delete("/albums/:album", authMiddleware, (req: any, res: any) => {
  const album = String(req.params.album || "").trim();
  const dir = path.join(baseDir, album);
  if (fs.existsSync(dir)) {
    // borrar recursivo
    fs.rmSync(dir, { recursive: true, force: true });
  }
  res.json({ ok: true });
});
