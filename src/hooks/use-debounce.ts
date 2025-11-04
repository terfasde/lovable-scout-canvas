import { useEffect, useState } from "react";

/**
 * Hook para debounce de valores, útil en búsquedas y filtros
 * @param value - Valor a hacer debounce
 * @param delay - Delay en ms (default: 500ms)
 * @returns Valor con debounce aplicado
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
