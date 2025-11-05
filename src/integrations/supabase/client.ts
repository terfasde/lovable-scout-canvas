/**
 * Mock Supabase Client
 * Reemplaza la funcionalidad de Supabase con implementación local
 */

import { authMock, type User, type Session } from '@/lib/auth-mock';
import { localDB } from '@/lib/local-db';
// Mantenemos los tipos para compatibilidad
import type { Database } from './types';

// Helper para crear promesa de respuesta vacía
const mockPromise = () => Promise.resolve({ data: null, error: null });
const mockArrayPromise = () => Promise.resolve({ data: [], error: null });
const mockCountPromise = () => Promise.resolve({ data: null, error: null, count: 0 });

// Tipos auxiliares para las queries - interfaz completa que retorna Promise
interface QueryBuilder extends Promise<{ data: any; error: any; count?: number }> {
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
    case 'profiles':
      data = localDB.getProfiles();
      break;
    case 'eventos':
    case 'events':
      data = localDB.getEvents();
      break;
    case 'gallery':
    case 'gallery_images':
      data = localDB.getGallery();
      break;
    case 'messages':
      data = localDB.getMessages();
      break;
    case 'conversations':
      data = localDB.getConversations();
      break;
    case 'follows':
      data = localDB.getFollows();
      break;
    case 'groups':
      data = localDB.getGroups();
      break;
    case 'group_members':
      data = localDB.getGroupMembers();
      break;
    case 'group_messages':
      data = localDB.getGroupMessages();
      break;
    default:
      data = [];
  }
  
  let filteredData = [...data];
  let limitValue: number | null = null;
  let rangeStart: number | null = null;
  let rangeEnd: number | null = null;
  
  const builder: any = {
    eq: (column: string, value: any) => {
      filteredData = filteredData.filter(item => item[column] === value);
      return builder;
    },
    in: (column: string, values: any[]) => {
      filteredData = filteredData.filter(item => values.includes(item[column]));
      return builder;
    },
    or: (filter: string) => {
      // Simplificado: no procesamos filtros complejos
      return builder;
    },
    not: (column: string, operator: string, value: any) => {
      if (operator === 'is') {
        filteredData = filteredData.filter(item => item[column] !== value);
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
      return Promise.resolve({ data: result, error: null });
    },
    maybeSingle: () => {
      const result = filteredData[0] || null;
      return Promise.resolve({ data: result, error: null });
    },
    select: (columns?: string, options?: any) => {
      if (options?.count) {
        return Promise.resolve({ data: null, error: null, count: filteredData.length });
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
      
      return resolve({ data: result, error: null });
    }
  };
  
  return builder as QueryBuilder;
};

// Mock del cliente Supabase usando servicio local
export const supabase = {
  auth: {
    getSession: () => authMock.getSession(),
    getUser: () => authMock.getUser(),
    signInWithPassword: (credentials: { email: string; password: string }) => 
      authMock.signInWithPassword(credentials),
    signInWithOAuth: (options: { provider: string; options?: any }) =>
      Promise.resolve({ data: { url: null, provider: options.provider }, error: new Error('OAuth no disponible en modo local') }),
    signUp: (credentials: { email: string; password: string; options?: any }) => 
      authMock.signUp(credentials),
    signOut: () => authMock.signOut(),
    onAuthStateChange: (callback: (event: string, session: Session | null) => void) => 
      authMock.onAuthStateChange(callback),
    updateUser: (updates: Partial<User> & { password?: string }) => authMock.updateUser(updates),
  },
  
  // Mock de otras funcionalidades de Supabase
  from: (table: string) => ({
    select: (columns?: string, options?: any): any => {
      if (options?.count) {
        return mockCountPromise();
      }
      return createQueryBuilder(table);
    },
    insert: (data: any, options?: any): any => {
      // Guardar datos en la tabla correspondiente
      let newItem: any;
      
      switch (table) {
        case 'profiles':
          newItem = localDB.upsertProfile(data);
          break;
        case 'eventos':
        case 'events':
          newItem = localDB.addEvent(data);
          break;
        case 'messages':
          newItem = localDB.addMessage(data);
          break;
        case 'follows':
          newItem = localDB.addFollow(data.follower_id, data.followed_id);
          break;
        case 'groups':
          newItem = localDB.addGroup(data);
          break;
        case 'group_members':
          newItem = localDB.addGroupMember(data);
          break;
        case 'group_messages':
          newItem = localDB.addGroupMessage(data);
          break;
      }
      
      const promise = Promise.resolve({ data: newItem, error: null }) as any;
      promise.select = () => createQueryBuilder(table);
      return promise;
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
      if (table === 'profiles') {
        const result = localDB.upsertProfile(data);
        return Promise.resolve({ data: result, error: null });
      }
      return mockPromise();
    }
  }),
  
  // Mock de RPC (Remote Procedure Calls)
  rpc: (functionName: string, params?: any) => {
    // Implementar RPCs específicas
    if (functionName === 'list_profiles_directory') {
      const profiles = localDB.getProfiles();
      return Promise.resolve({ data: profiles, error: null });
    }
    
    if (functionName === 'create_or_get_conversation') {
      return authMock.getUser().then(({ data: { user } }) => {
        if (user && params?.other_user_id) {
          const conversation = localDB.getOrCreateConversation(user.id, params.other_user_id);
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
        options?: any
      ): Promise<{ data: { path: string; fullPath: string } | null; error: any | null }> => {
        // Convertir archivo a base64 y guardar en localStorage
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;

            // Guardar en galería si es el bucket de imágenes
            if (bucket === 'avatars' || bucket === 'gallery' || bucket === 'thread-images') {
              authMock.getUser().then(({ data: { user } }) => {
                if (user) {
                  const imageData = {
                    name: path,
                    url: base64,
                    album: bucket,
                    user_id: user.id,
                  };
                  localDB.addImage(imageData);
                }
              });
            }

            resolve({ data: { path, fullPath: `${bucket}/${path}` }, error: null });
          };
          reader.readAsDataURL(file);
        });
      },
      getPublicUrl: (
        path: string
      ): { data: { publicUrl: string } } => {
        // Buscar imagen en la galería
        const images = localDB.getGallery();
        const image = images.find((img) => img.name === path);

        if (image && image.url) {
          return { data: { publicUrl: image.url } };
        }

        return {
          data: { publicUrl: `/mock-storage/${path}` },
        };
      },
      remove: (
        paths: string[]
      ): Promise<{ data: null; error: any | null }> => {
        // Eliminar imágenes de la galería
        paths.forEach((path) => {
          const images = localDB.getGallery();
          const image = images.find((img) => img.name === path);
          if (image) {
            localDB.deleteImage(image.id);
          }
        });
        return Promise.resolve({ data: null, error: null });
      },
      list: (
        path?: string,
        options?: any
      ): Promise<{ data: Array<{ name: string; id: string; created_at: string }>; error: any | null }> => {
        // Listar imágenes del bucket/álbum
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
      subscribe: () => ({})
    })
  }),
  
  removeChannel: (channel: any) => {}
};