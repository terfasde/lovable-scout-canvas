// Legacy backup eliminado: este archivo queda vacío para evitar errores de tipos.
export {};
        const builder = createQueryBuilder(table);
        // Aplicar filtro automático según la tabla y newItem
        if (table === "profiles" && newItem?.user_id) {
          return builder.eq("user_id", newItem.user_id);
        } else if (newItem?.id) {
          return builder.eq("id", newItem.id);
        }
        return builder;
      };
      return insertPromise;
    },
    update: (data: any): any => {
      // Update se maneja con el query builder
      const builder = createQueryBuilder(table);
      // Guardar referencia para actualizar después del filtrado
      (builder as any)._updateData = data;
      (builder as any)._updateTable = table;
      return builder;
    },
    delete: (): any => {
      const builder = createQueryBuilder(table);
      (builder as any)._isDelete = true;
      return builder;
    },
    upsert: (data: any): any => {
      if (table === "profiles") {
        const result = localDB.upsertProfile(data);
        return Promise.resolve({ data: result, error: null });
      }
      return mockPromise();
    },
  }),

  // Mock de RPC (Remote Procedure Calls)
  rpc: (functionName: string, params?: any) => {
    // Implementar RPCs específicas
    if (functionName === "list_profiles_directory") {
      const profiles = localDB.getProfiles();
      return Promise.resolve({ data: profiles, error: null });
    }

    if (functionName === "create_or_get_conversation") {
      return authMock.getUser().then(({ data: { user } }) => {
        if (user && params?.other_user_id) {
          const conversation = localDB.getOrCreateConversation(
            user.id,
            params.other_user_id,
          );
          return { data: conversation.id, error: null };
        }
        return { data: null, error: null };
      });
    }

    return Promise.resolve({ data: null, error: null });
  },

  storage: {
    from: (bucket: string) => ({
      upload: async (
        path: string,
        file: File | Blob,
        options?: any,
      ): Promise<{
        data: { path: string; fullPath: string } | null;
        error: any | null;
      }> => {
        const useMinio = (import.meta as any).env?.VITE_STORAGE === "minio";
        if (useMinio) {
          try {
            const contentType =
              (file as any).type || "application/octet-stream";
            const resp = await fetch("http://localhost:4001/sign", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ bucket, path, contentType }),
            });
            const { url, publicUrl, error } = await resp.json();
            if (!resp.ok || !url) {
              return { data: null, error: error || "sign failed" };
            }
            // PUT directo al presigned URL
            const put = await fetch(url, {
              method: "PUT",
              body: file,
              headers: { "Content-Type": contentType },
            });
            if (!put.ok) return { data: null, error: "upload failed" };

            // Guardar índice local apuntando al publicUrl
            const {
              data: { user },
            } = await authMock.getUser();
            if (user) {
              localDB.addImage({
                name: path,
                url: publicUrl,
                album: bucket,
                user_id: user.id,
              });
            }
            return {
              data: { path, fullPath: `${bucket}/${path}` },
              error: null,
            };
          } catch (e: any) {
            return { data: null, error: e?.message || String(e) };
          }
        }

        // Fallback local: base64 en localStorage
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            if (
              bucket === "avatars" ||
              bucket === "gallery" ||
              bucket === "thread-images" ||
              bucket === "group-covers"
            ) {
              authMock.getUser().then(({ data: { user } }) => {
                if (user) {
                  localDB.addImage({
                    name: path,
                    url: base64,
                    album: bucket,
                    user_id: user.id,
                  });
                }
              });
            }
            resolve({
              data: { path, fullPath: `${bucket}/${path}` },
              error: null,
            });
          };
          reader.readAsDataURL(file);
        });
      },
      getPublicUrl: (path: string): { data: { publicUrl: string } } => {
        const useMinio = (import.meta as any).env?.VITE_STORAGE === "minio";
        const images = localDB.getGallery();
        const image = images.find((img) => img.name === path);
        if (image?.url) return { data: { publicUrl: image.url } };
        if (useMinio) {
          // Asumir URL pública directa en MinIO
          const [album, ...rest] = path.split("/");
          const objectPath = rest.length ? rest.join("/") : album;
          return {
            data: {
              publicUrl: `http://localhost:9000/${bucket}/${encodeURIComponent(objectPath)}`,
            },
          };
        }
        return { data: { publicUrl: `/mock-storage/${path}` } };
      },
      remove: (paths: string[]): Promise<{ data: null; error: any | null }> => {
        const useMinio = (import.meta as any).env?.VITE_STORAGE === "minio";
        return (async () => {
          for (const path of paths) {
            const images = localDB.getGallery();
            const image = images.find((img) => img.name === path);
            if (image) localDB.deleteImage(image.id);
            if (useMinio) {
              try {
                const url = new URL("http://localhost:4001/object");
                url.searchParams.set("bucket", bucket);
                url.searchParams.set("path", path);
                await fetch(url.toString(), { method: "DELETE" });
              } catch (_e) {
                /* noop */
              }
            }
          }
          return { data: null, error: null };
        })();
      },
      list: (
        path?: string,
        options?: any,
      ): Promise<{
        data: Array<{ name: string; id: string; created_at: string }>;
        error: any | null;
      }> => {
        const images = localDB.getGallery(path);
        const fileObjects = images.map((img) => ({
          name: img.name,
          id: img.id,
          created_at: img.created_at,
        }));
        return Promise.resolve({ data: fileObjects, error: null });
      },
    }),
  },

  channel: (name: string) => ({
    on: (event: string, filter: any, callback: any) => ({
      subscribe: () => ({}),
    }),
  }),

  removeChannel: (channel: any) => {
    // Mock: no mantenemos estado de canales en modo local
    return true;
  },
};

// ============================================================================
// EXPORTACIÓN: Cliente real de Supabase o Mock según configuración
// ============================================================================

// Función para crear el cliente con validación
function createSupabaseClient() {
  if (isLocalMode) {
    console.log("🔧 Modo LOCAL: Usando cliente mock de Supabase");
    return mockSupabase as any;
  }

  // Modo producción: usar Supabase real
  console.log("☁️ Modo PRODUCCIÓN: Usando Supabase real");
  console.log("📍 VITE_BACKEND:", import.meta.env.VITE_BACKEND || "(vacío - por defecto Supabase)");
  console.log("🔗 VITE_SUPABASE_URL:", supabaseUrl ? "✓ Configurado" : "✗ FALTA");
  console.log("🔑 VITE_SUPABASE_ANON_KEY:", supabaseAnonKey ? "✓ Configurado" : "✗ FALTA");

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ ERROR: Variables de Supabase no configuradas correctamente");
    console.error("Necesitas configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY");
    // Retornar mock como fallback para evitar crash
    console.warn("⚠️ Usando cliente mock como fallback");
    return mockSupabase as any;
  }

  try {
    const client = createClient<Database>(supabaseUrl, supabaseAnonKey);
    console.log("✅ Cliente de Supabase creado exitosamente");
    return client;
  } catch (error) {
    console.error("❌ Error al crear cliente de Supabase:", error);
    console.warn("⚠️ Usando cliente mock como fallback");
    return mockSupabase as any;
  }
}

export const supabase = createSupabaseClient();

export type { Database };
