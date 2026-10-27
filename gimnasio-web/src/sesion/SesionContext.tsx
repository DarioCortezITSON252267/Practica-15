// sesion/SesionContext.tsx — el contexto de la sesión y el hook propio para leerlo.
// El proveedor está en SesionProvider.tsx: un archivo que exporta componentes y además
// otras cosas (como este hook) rompe la recarga en caliente de Vite.
import { createContext, useContext } from 'react';
import type { Sesion } from '../tipos.ts';

export interface ValorSesion {
  sesion: Sesion | null; // null = nadie ha iniciado sesión
  entrar: (correo: string, password: string) => Promise<void>;
  registrar: (nombre: string, correo: string, password: string) => Promise<void>;
  salir: () => void;
}

// El valor por defecto es null: sólo hay un valor real dentro de <SesionProvider>.
export const SesionContext = createContext<ValorSesion | null>(null);

export function useSesion(): ValorSesion {
  const valor = useContext(SesionContext);
  if (!valor) {
    throw new Error('useSesion() se usó fuera de <SesionProvider>');
  }
  return valor;
}
