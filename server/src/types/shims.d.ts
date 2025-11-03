// Shims para evitar errores de TypeScript en VS Code cuando aún no instalaste node_modules
// (útil si npm install falla en Windows por dependencias nativas como better-sqlite3)

declare module 'express';
declare module 'cors';
declare module 'morgan';
declare module 'jsonwebtoken';
declare module 'multer';
declare module 'socket.io';
declare module 'bcryptjs';
declare module 'better-sqlite3';
