/**
 * Theme utilities and configuration
 * Proporciona helpers para manejar el tema de la aplicación
 */

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeConfig {
  theme: Theme;
  systemTheme: "light" | "dark" | undefined;
  resolvedTheme: "light" | "dark" | undefined;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Hook personalizado para manejar el tema con funciones adicionales
 */
export function useAppTheme(): ThemeConfig {
  const { theme, systemTheme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    
    const currentTheme = resolvedTheme || systemTheme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return {
    theme: (theme as Theme) || "system",
    systemTheme: systemTheme as "light" | "dark" | undefined,
    resolvedTheme: resolvedTheme as "light" | "dark" | undefined,
    setTheme: setTheme as (theme: Theme) => void,
    toggleTheme,
  };
}

/**
 * Obtiene la clase CSS para transiciones de tema
 */
export function getThemeTransitionClass(): string {
  return "transition-colors duration-300 ease-in-out";
}

/**
 * Aplica transiciones suaves al cambiar de tema
 */
export function enableThemeTransitions(): void {
  // Agregar clase de transición al documento
  if (typeof document !== "undefined") {
    document.documentElement.classList.add(
      "transition-colors",
      "duration-300",
      "ease-in-out"
    );
  }
}

/**
 * Configuración de colores por tema
 */
export const themeColors = {
  light: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(222.2 84% 4.9%)",
    primary: "hsl(221.2 83.2% 53.3%)",
    secondary: "hsl(210 40% 96.1%)",
    accent: "hsl(210 40% 96.1%)",
    muted: "hsl(210 40% 96.1%)",
    card: "hsl(0 0% 100%)",
    border: "hsl(214.3 31.8% 91.4%)",
  },
  dark: {
    background: "hsl(222.2 84% 4.9%)",
    foreground: "hsl(210 40% 98%)",
    primary: "hsl(217.2 91.2% 59.8%)",
    secondary: "hsl(217.2 32.6% 17.5%)",
    accent: "hsl(217.2 32.6% 17.5%)",
    muted: "hsl(217.2 32.6% 17.5%)",
    card: "hsl(222.2 84% 4.9%)",
    border: "hsl(217.2 32.6% 17.5%)",
  },
};

/**
 * Preferencias de tema persistidas
 */
export const THEME_STORAGE_KEY = "app-theme";

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch (error) {
    console.warn("Error al leer tema almacenado:", error);
  }
  
  return null;
}

export function setStoredTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn("Error al guardar tema:", error);
  }
}

/**
 * Detecta preferencia de sistema
 */
export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Hook para detectar cambios en preferencia de sistema
 */
export function useSystemTheme(): "light" | "dark" {
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(getSystemTheme());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    // Navegadores modernos
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    
    // Fallback para navegadores antiguos
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return systemTheme;
}

/**
 * Clase helper para componentes con tema
 */
export function themeAwareClass(
  baseClass: string,
  lightClass?: string,
  darkClass?: string
): string {
  const classes = [baseClass];
  
  if (lightClass) classes.push(`light:${lightClass}`);
  if (darkClass) classes.push(`dark:${darkClass}`);
  
  return classes.join(" ");
}
