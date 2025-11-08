import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    // Usamos 5173 para desarrollo local (evita conflicto con el backend en 8080)
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    sourcemap: false, // Desactiva source maps en producción para menor tamaño
    minify: "esbuild", // esbuild es más rápido que terser
    target: "esnext", // Permite optimizaciones modernas
    rollupOptions: {
      output: {
        // Chunks más granulares para mejor cache
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // React core (más usado, en chunk separado)
            if (id.includes("react-dom") || id.includes("react/"))
              return "vendor-react";
            // Router (usado en toda la app)
            if (id.includes("react-router-dom")) return "vendor-router";
            // Tanstack Query (usado en toda la app)
            if (id.includes("@tanstack")) return "vendor-query";
            // Supabase (backend alternativo)
            if (id.includes("@supabase")) return "vendor-supabase";
            // Radix UI (componentes grandes)
            if (id.includes("@radix-ui")) return "vendor-radix";
            // Charts (opcional, solo en algunas páginas)
            if (id.includes("recharts") || id.includes("d3-"))
              return "vendor-charts";
            // Maps (opcional, solo en página de contacto)
            if (id.includes("@react-google-maps") || id.includes("@googlemaps"))
              return "vendor-maps";
            // Date utilities
            if (id.includes("date-fns") || id.includes("react-day-picker"))
              return "vendor-date";
            // Icons (muy usado)
            if (id.includes("lucide-react")) return "vendor-icons";
            // Style utilities (muy pequeño, puede ir junto)
            if (
              id.includes("clsx") ||
              id.includes("class-variance-authority") ||
              id.includes("tailwind")
            )
              return "vendor-style";
            // Resto de vendor
            return "vendor";
          }
        },
        // Nombres de archivos con hash para mejor cache
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Optimizaciones adicionales
    cssCodeSplit: true, // Separar CSS por chunk
    reportCompressedSize: false, // Más rápido en build
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Deduplicate React to fix "Invalid hook call" error
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@tanstack/react-query'],
  },
}));
