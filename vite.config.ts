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
    minify: 'esbuild', // esbuild es más rápido que terser
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router-dom")) return "vendor-router"
            if (id.includes("react-dom") || id.includes("react")) return "vendor-react"
            if (id.includes("@tanstack")) return "vendor-query"
            if (id.includes("@supabase")) return "vendor-supabase"
            if (id.includes("@radix-ui")) return "vendor-radix"
            if (id.includes("recharts")) return "vendor-charts"
            if (id.includes("@react-google-maps")) return "vendor-maps"
            if (id.includes("date-fns") || id.includes("react-day-picker")) return "vendor-date"
            if (id.includes("lucide-react")) return "vendor-icons"
            if (id.includes("clsx") || id.includes("class-variance-authority")) return "vendor-style"
            return "vendor"
          }
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
