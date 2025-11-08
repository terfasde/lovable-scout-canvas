/**
 * Supabase Client - Modo Dual (Real o Mock)
 * Usa el cliente real de Supabase en producción/staging
 * Usa mock local cuando VITE_BACKEND="local"
 */

import { createClient } from "@supabase/supabase-js";
import { authMock, type User, type Session } from "@/lib/auth-mock";
import { localDB } from "@/lib/local-db";
import type { Database } from "./types";

// Detectar modo de backend
const BACKEND_MODE = (import.meta.env.VITE_BACKEND || "supabase").toLowerCase();
const isLocalMode = BACKEND_MODE === "local";

// Configuración de Supabase (solo se usa si no es modo local)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper para crear promesa de respuesta vacía
const mockPromise = () => Promise.resolve({ data: null, error: null });
const mockArrayPromise = () => Promise.resolve({ data: [], error: null });
const mockCountPromise = () =>
  Promise.resolve({ data: null, error: null, count: 0 });

// Tipos auxiliares para las queries - interfaz completa que retorna Promise
interface QueryBuilder
  extends Promise<{ data: any; error: any; count?: number }> {
  eq: (column: string, value: any) => QueryBuilder;
  in: (column: string, values: any[]) => QueryBuilder;
  or: (filter: string) => QueryBuilder;
  not: (column: string, operator: string, value: any) => QueryBuilder;
  order: (column: string, options?: any) => QueryBuilder;
  limit: (count: number) => QueryBuilder;
  range: (from: number, to: number) => QueryBuilder;
  single: () => Promise<{ data: any; error: any }>;
  maybeSingle: () => Promise<{ data: any; error: any }>;
  select: (columns?: string, options?: any) => QueryBuilder;
}

// Helper para crear query builder mock que es una promesa real
const createQueryBuilder = (table: string, filters: any = {}): QueryBuilder => {
  let data: any[] = [];

  // Obtener datos de la tabla correspondiente
  switch (table) {
    case "profiles":
      data = localDB.getProfiles();
      break;
    case "eventos":
    case "events":
      data = localDB.getEvents();
      break;
    case "gallery":
    case "gallery_images":
      data = localDB.getGallery();
      break;
    case "messages":
      data = localDB.getMessages();
      break;
    case "conversations":
      data = localDB.getConversations();
      break;
    case "follows":
      data = localDB.getFollows();
      break;
    case "groups":
      data = localDB.getGroups();
      break;
    case "group_members":
      data = localDB.getGroupMembers();
      break;
    case "group_messages":
      data = localDB.getGroupMessages();
      break;
    default:
      data = [];
  }

  let filteredData = [...data];
  let limitValue: number | null = null;
  let rangeStart: number | null = null;
  let rangeEnd: number | null = null;
  let countRequested: false | "exact" | "planned" | "estimated" = false;
  let headRequested = false;

  const builder: any = {
    eq: (column: string, value: any) => {
      filteredData = filteredData.filter((item) => item[column] === value);
      return builder;
    },
    in: (column: string, values: any[]) => {
      filteredData = filteredData.filter((item) =>
        values.includes(item[column]),
      );
      return builder;
    },
    or: (filter: string) => {
      // Simplificado: no procesamos filtros complejos
      return builder;
    },
    not: (column: string, operator: string, value: any) => {
      if (operator === "is") {
        filteredData = filteredData.filter((item) => item[column] !== value);
      }
      return builder;
    },
    order: (column: string, options?: any) => {
      const ascending = options?.ascending !== false;
      filteredData.sort((a, b) => {
        if (a[column] < b[column]) return ascending ? -1 : 1;
        if (a[column] > b[column]) return ascending ? 1 : -1;
        return 0;
      });
      return builder;
    },
    limit: (count: number) => {
      limitValue = count;
      return builder;
    },
    range: (from: number, to: number) => {
      rangeStart = from;
      rangeEnd = to;
      return builder;
    },
    single: () => {
      const result = filteredData[0] || null;
      if (result === null) {
        // Emular comportamiento de Supabase: single() con 0 filas => error PGRST116
        return Promise.resolve({
          data: null,
          error: {
            code: "PGRST116",
            message: "JSON object requested, multiple (or no) rows returned",
          },
        });
      }
      return Promise.resolve({ data: result, error: null });
    },
    maybeSingle: () => {
      const result = filteredData[0] || null;
      // maybeSingle no retorna error cuando no hay filas
      return Promise.resolve({ data: result, error: null });
    },
    select: (columns?: string, options?: any) => {
      if (options?.count) {
        countRequested = options.count;
      }
      if (options?.head) {
        headRequested = true;
      }
      return builder;
    },
    then: (resolve: any) => {
      let result = filteredData;

      if (rangeStart !== null && rangeEnd !== null) {
        result = result.slice(rangeStart, rangeEnd + 1);
      } else if (limitValue !== null) {
        result = result.slice(0, limitValue);
      }

      // Soporte para update/delete si fueron configurados en from().update()/delete()
      const isDelete = (builder as any)._isDelete === true;
      const updateData = (builder as any)._updateData;
      if (isDelete || updateData) {
        switch (table) {
          case "profiles": {
            const list = localDB.getProfiles();
            const key = "user_id";
            const changed = isDelete
              ? list.filter(
                  (item) => !result.some((r: any) => r[key] === item[key]),
                )
              : list.map((item) =>
                  result.some((r: any) => r[key] === item[key])
                    ? { ...item, ...updateData }
                    : item,
                );
            localDB.saveProfiles(changed as any);
            break;
          }
          case "eventos":
          case "events": {
            const list = localDB.getEvents();
            const key = "id";
            const changed = isDelete
              ? list.filter(
                  (item) => !result.some((r: any) => r[key] === item[key]),
                )
              : list.map((item) =>
                  result.some((r: any) => r[key] === item[key])
                    ? { ...item, ...updateData }
                    : item,
                );
            localDB.saveEvents(changed as any);
            break;
          }
          case "gallery":
          case "gallery_images": {
            const list = localDB.getGallery();
            const key = "id";
            const changed = isDelete
              ? list.filter(
                  (item) => !result.some((r: any) => r[key] === item[key]),
                )
              : list.map((item) =>
                  result.some((r: any) => r[key] === item[key])
                    ? { ...item, ...updateData }
                    : item,
                );
            localDB.saveGallery(changed as any);
            break;
          }
          case "messages": {
            const list = localDB.getMessages();
            const key = "id";
            const changed = isDelete
              ? list.filter(
                  (item) => !result.some((r: any) => r[key] === item[key]),
                )
              : list.map((item) =>
                  result.some((r: any) => r[key] === item[key])
                    ? { ...item, ...updateData }
                    : item,
                );
            localDB.saveMessages(changed as any);
            break;
          }
          case "conversations": {
            const list = localDB.getConversations();
            const key = "id";
            const changed = isDelete
              ? list.filter(
                  (item) => !result.some((r: any) => r[key] === item[key]),
                )
              : list.map((item) =>
                  result.some((r: any) => r[key] === item[key])
                    ? { ...item, ...updateData }
                    : item,
                );
            localDB.saveConversations(changed as any);
            break;
          }
          case "follows": {
            const list = localDB.getFollows();
            const changed = isDelete
              ? list.filter(
                  (item) =>
                    !result.some(
                      (r: any) =>
                        r.follower_id === item.follower_id &&
                        r.followed_id === item.followed_id,
                    ),
                )
              : list.map((item) =>
                  result.some(
                    (r: any) =>
                      r.follower_id === item.follower_id &&
                      r.followed_id === item.followed_id,
                  )
                    ? { ...item, ...updateData }
                    : item,
                );
            localDB.saveFollows(changed as any);
            break;
          }
          case "groups": {
            const list = localDB.getGroups();
            const key = "id";
            const changed = isDelete
              ? list.filter(
                  (item) => !result.some((r: any) => r[key] === item[key]),
                )
              : list.map((item) =>
                  result.some((r: any) => r[key] === item[key])
                    ? { ...item, ...updateData }
                    : item,
                );
            localDB.saveGroups(changed as any);
            break;
          }
          case "group_members": {
            const list = localDB.getGroupMembers();
            const changed = isDelete
              ? list.filter(
                  (item) =>
                    !result.some(
                      (r: any) =>
                        r.group_id === item.group_id &&
                        r.user_id === item.user_id,
                    ),
                )
              : list.map((item) =>
                  result.some(
                    (r: any) =>
                      r.group_id === item.group_id &&
                      r.user_id === item.user_id,
                  )
                    ? { ...item, ...updateData }
                    : item,
                );
            localDB.saveGroupMembers(changed as any);
            break;
          }
          case "group_messages": {
            const list = localDB.getGroupMessages();
            const key = "id";
            const changed = isDelete
              ? list.filter(
                  (item) => !result.some((r: any) => r[key] === item[key]),
                )
              : list.map((item) =>
                  result.some((r: any) => r[key] === item[key])
                    ? { ...item, ...updateData }
                    : item,
                );
            localDB.saveGroupMessages(changed as any);
            break;
          }
        }
      }

      if (countRequested) {
        const count = result.length;
        return resolve({
          data: headRequested ? null : result,
          error: null,
          count,
        });
      }

      return resolve({ data: result, error: null });
    },
  };

  return builder as QueryBuilder;
};

// ============================================================================
// CLIENTE MOCK (para desarrollo local)
// ============================================================================

const mockSupabase = {
  auth: {
    getSession: () => authMock.getSession(),
    getUser: () => authMock.getUser(),
    signInWithPassword: (credentials: { email: string; password: string }) =>
      authMock.signInWithPassword(credentials),
    signInWithOAuth: (options: { provider: string; options?: any }) =>
      Promise.resolve({
        data: { url: null, provider: options.provider },
        error: new Error("OAuth no disponible en modo local"),
      }),
    signUp: (credentials: { email: string; password: string; options?: any }) =>
      authMock.signUp(credentials),
    signOut: () => authMock.signOut(),
    onAuthStateChange: (
      callback: (event: string, session: Session | null) => void,
    ) => authMock.onAuthStateChange(callback),
    updateUser: (updates: Partial<User> & { password?: string }) =>
      authMock.updateUser(updates),
  },

  // Mock de otras funcionalidades de Supabase
  from: (table: string) => ({
    select: (columns?: string, options?: any): any => {
      // Siempre devolver query builder para permitir encadenamiento
      const builder = createQueryBuilder(table);
      // Si hay opciones, configurarlas en el builder
      if (options?.count) {
        (builder as any).select("*", options);
      }
      return builder;
    },
    insert: (data: any, options?: any): any => {
      // Guardar datos en la tabla correspondiente
      let newItem: any;

      switch (table) {
        case "profiles":
          newItem = localDB.upsertProfile(data);
          break;
        case "eventos":
        case "events":
          newItem = localDB.addEvent(data);
          break;
        case "messages":
          newItem = localDB.addMessage(data);
          break;
        case "follows":
          newItem = localDB.addFollow(data.follower_id, data.followed_id);
          break;
        case "groups":
          newItem = localDB.addGroup(data);
          break;
        case "group_members":
          newItem = localDB.addGroupMember(data);
          break;
        case "group_messages":
          newItem = localDB.addGroupMessage(data);
          break;
      }

      // Retornar promesa con método .select() encadenable
      const insertPromise: any = Promise.resolve({
        data: newItem,
        error: null,
      });
      insertPromise.select = (columns?: string, options?: any) => {
        // Para .select() después de insert, devolver query builder ya filtrado
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
