// Declaraciones de tipos para importar assets y módulos externos faltantes
// Evita errores de "No se encuentra el módulo" para archivos estáticos.
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module 'nodemailer' {
  const nodemailer: any;
  export default nodemailer;
}
