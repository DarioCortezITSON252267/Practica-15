// hooks/useClase.ts — el patrón de useClases, pero para UNA clase con sus horarios.
// El id va en las dependencias: si cambia (de /clases/1 a /clases/2), el efecto vuelve a pedir.
import { useEffect, useState } from 'react';
import { traerClase } from '../servicios/gimnasio.ts';
import { mensajeDeError } from '../servicios/api.ts';
import type { ClaseConHorarios } from '../tipos.ts';

export function useClase(id: number) {
  const [clase, setClase] = useState<ClaseConHorarios | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0); // cambiarlo repite el efecto

  useEffect(() => {
    let vigente = true; // ¿este efecto sigue siendo el actual?
    traerClase(id)
      .then((datos) => {
        if (vigente) {
          setClase(datos);
          setError(null);
        }
      })
      .catch((e) => { if (vigente) setError(mensajeDeError(e, 'No se pudo cargar la clase.')); })
      .finally(() => { if (vigente) setCargando(false); });
    return () => { vigente = false; }; // la limpieza
  }, [id, intento]);

  function reintentar() {
    setCargando(true);
    setError(null);
    setIntento((n) => n + 1);
  }

  return { clase, cargando, error, reintentar };
}
