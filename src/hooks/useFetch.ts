/**
 * Hooks personalizados para fetching de datos con cleanup automático
 * Previene memory leaks y race conditions
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { APIError } from '@/lib/api-wrapper';
import { logger } from '@/lib/logger';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: APIError | null;
}

interface UseFetchOptions {
  /**
   * Si debe ejecutarse inmediatamente al montar
   */
  immediate?: boolean;
  /**
   * Dependencias para refetch automático
   */
  deps?: React.DependencyList;
  /**
   * Callback cuando se completa con éxito
   */
  onSuccess?: (data: any) => void;
  /**
   * Callback cuando falla
   */
  onError?: (error: APIError) => void;
}

/**
 * Hook para fetching con cleanup automático y prevención de race conditions
 * 
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useFetch(
 *   () => api.get('/users'),
 *   { immediate: true }
 * );
 * ```
 */
export function useFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions = {}
) {
  const { immediate = false, deps = [], onSuccess, onError } = options;

  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  // Ref para controlar si el componente está montado
  const isMountedRef = useRef(true);
  // Ref para cancelar requests pendientes
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async () => {
    // Cancelar request anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Crear nuevo AbortController
    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetchFn();

      // Solo actualizar estado si el componente sigue montado
      if (isMountedRef.current) {
        setState({ data, loading: false, error: null });
        onSuccess?.(data);
      }
    } catch (error) {
      // Ignorar errores de abort
      if (error instanceof Error && error.name === 'AbortError') {
        logger.debug('Request aborted');
        return;
      }

      const apiError = error instanceof APIError 
        ? error 
        : new APIError(
            error instanceof Error ? error.message : 'Error desconocido',
            undefined,
            'UNKNOWN_ERROR'
          );

      if (isMountedRef.current) {
        setState({ data: null, loading: false, error: apiError });
        onError?.(apiError);
      }

      logger.error('useFetch error', apiError);
    }
  }, [fetchFn, onSuccess, onError]);

  // Efecto para ejecutar inmediatamente o cuando cambien las deps
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute, ...deps]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    refetch: execute,
  };
}

/**
 * Hook para datos que se cargan en forma de lista (con paginación opcional)
 */
export function useList<T>(
  fetchFn: (page?: number) => Promise<T[]>,
  options: UseFetchOptions & { pageSize?: number } = {}
) {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error, refetch } = useFetch(
    () => fetchFn(page),
    options
  );

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAllData(data);
      } else {
        setAllData(prev => [...prev, ...data]);
      }

      // Si devolvió menos datos que pageSize, no hay más
      const pageSize = options.pageSize || 10;
      setHasMore(data.length >= pageSize);
    }
  }, [data, page, options.pageSize]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(p => p + 1);
    }
  }, [loading, hasMore]);

  const reset = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
    refetch();
  }, [refetch]);

  return {
    data: allData,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    refetch,
  };
}

/**
 * Hook para operaciones de mutación (POST, PUT, DELETE)
 */
export function useMutation<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: APIError, variables: TVariables) => void;
  } = {}
) {
  const [state, setState] = useState<{
    data: TData | null;
    loading: boolean;
    error: APIError | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setState({ data: null, loading: true, error: null });

      try {
        const data = await mutationFn(variables);

        if (isMountedRef.current) {
          setState({ data, loading: false, error: null });
          options.onSuccess?.(data, variables);
        }

        return data;
      } catch (error) {
        const apiError = error instanceof APIError
          ? error
          : new APIError(
              error instanceof Error ? error.message : 'Error desconocido',
              undefined,
              'MUTATION_ERROR'
            );

        if (isMountedRef.current) {
          setState({ data: null, loading: false, error: apiError });
          options.onError?.(apiError, variables);
        }

        logger.error('useMutation error', apiError);
        throw apiError;
      }
    },
    [mutationFn, options]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}

/**
 * Hook para debounce de valores (útil para búsquedas)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
