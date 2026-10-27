// sesion/SesionProvider.tsx — el proveedor: guarda la sesión en el estado y en localStorage,
// y se la da a todos los componentes que estén dentro de él.
import { useState, type ReactNode } from 'react';
import * as servicioSesion from '../servicios/sesion.ts';
import type { Sesion } from '../tipos.ts';
import { guardarSesion, leerSesion } from './almacenamiento.ts';
import { SesionContext, type ValorSesion } from './SesionContext.tsx';

export function SesionProvider({ children }: { children: ReactNode }) {
  // Al arrancar se lee lo guardado: así la sesión sobrevive a recargar la página.
  const [sesion, setSesion] = useState<Sesion | null>(leerSesion);

  function cambiar(nueva: Sesion | null) {
    guardarSesion(nueva); // primero localStorage: de ahí lee el token el interceptor de Axios
    setSesion(nueva);
  }

  const valor: ValorSesion = {
    sesion,
    entrar: async (correo, password) => cambiar(await servicioSesion.entrar(correo, password)),
    registrar: async (nombre, correo, password) =>
      cambiar(await servicioSesion.registrar(nombre, correo, password)),
    salir: () => cambiar(null),
  };

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}
