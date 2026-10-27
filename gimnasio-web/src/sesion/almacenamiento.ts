// sesion/almacenamiento.ts — dónde vive la sesión entre recargas: el localStorage del navegador.
// Lo usan el proveedor (para guardar y leer la sesión) y el interceptor de Axios (para leer el token).
import type { Sesion, Usuario } from '../tipos.ts';

const CLAVE_TOKEN = 'token';
const CLAVE_USUARIO = 'usuario';

export function leerToken(): string | null {
  return localStorage.getItem(CLAVE_TOKEN);
}

export function leerSesion(): Sesion | null {
  const token = localStorage.getItem(CLAVE_TOKEN);
  const usuario = localStorage.getItem(CLAVE_USUARIO);
  if (!token || !usuario) return null;
  try {
    return { token, usuario: JSON.parse(usuario) as Usuario };
  } catch {
    return null; // si quedó algo que no es JSON, se trata como si no hubiera sesión
  }
}

export function guardarSesion(sesion: Sesion | null) {
  if (sesion) {
    localStorage.setItem(CLAVE_TOKEN, sesion.token);
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(sesion.usuario));
  } else {
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
  }
}
