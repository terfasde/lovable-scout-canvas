Backend local (sin Supabase)

- Puerto por defecto: 8080
- Dev local: npm install; npm run dev
- Docker: docker build -t lsc-server ./server; docker run -p 8080:8080 lsc-server
- Compose (con frontend): docker compose up --build (backend en 8080, frontend en 8081)

Solución de problemas en Windows (npm install falla)

- Este proyecto usa better-sqlite3 (nativo). Si falla la instalación:
	1) Asegúrate de tener Node.js 18+ (recomendado 20.x LTS)
	2) Instala Visual Studio Build Tools (C++ Desktop workload) y Python 3.x en PATH
	3) Desde PowerShell (Administrador), puedes configurar:
		 npm config set msvs_version 2022
	4) Vuelve a intentar: npm install

- Alternativa sin instalar toolchain: usa Docker/Compose, que ya compila dentro del contenedor.
