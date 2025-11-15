import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { logEnvironmentStatus, ensureRequiredEnv } from "./lib/validate-env";

// Validar configuración de variables de entorno
if (import.meta.env.DEV) {
  logEnvironmentStatus();
} else {
  try {
    ensureRequiredEnv();
  } catch (error) {
    console.error(error);
    // En producción, mostrar mensaje al usuario
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        ">
          <div style="
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 600px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          ">
            <h1 style="color: #e53e3e; margin-bottom: 1rem;">⚠️ Configuración Incompleta</h1>
            <p style="color: #2d3748; margin-bottom: 1rem;">
              El sitio no está configurado correctamente. Por favor, contacta al administrador.
            </p>
            <pre style="
              background: #f7fafc;
              padding: 1rem;
              border-radius: 4px;
              overflow-x: auto;
              font-size: 0.875rem;
              color: #2d3748;
            ">${error instanceof Error ? error.message : 'Error desconocido'}</pre>
          </div>
        </div>
      `;
    }
  }
}

createRoot(document.getElementById("root")!).render(<App />);
