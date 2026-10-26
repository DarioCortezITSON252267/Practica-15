# Gimnasio Titanes · Práctica 15

El frontend del gimnasio con React Router: un mapa de rutas con un layout compartido, el
catálogo de clases y el detalle de cada clase con sus horarios, leyendo el id desde la URL.

## Cómo correrlo

1. **La API** (`gimnasio-backend`, repositorio aparte), siguiendo su README:

   ```bash
   npm install
   copy .env.ejemplo .env               # y poner la contraseña de root de MySQL
   npx prisma migrate dev --name inicial
   npx prisma generate
   npx prisma db seed
   npm run start:dev                    # http://localhost:3000/clases
   ```

2. **El frontend** (este repositorio):

   ```bash
   npm install
   npm run dev                          # http://localhost:5173
   ```

## Rutas

| Ruta | Qué muestra |
|---|---|
| `/` | Redirige a `/clases` |
| `/clases` | El catálogo: una tarjeta por clase con su imagen, categoría y duración |
| `/clases/:id` | El detalle de la clase con sus horarios (hija de `/clases`) |
| `*` | La página 404 |

Todas son hijas de la ruta de layout, que pinta el encabezado, el pie y, en medio, el `<Outlet />`.

## Respuestas

### Ejercicio 1

**¿Por qué el 404 sí tiene encabezado y pie?**
Porque la ruta `*` es hija de la ruta del layout. El layout pinta el encabezado y el pie, y el
404 cae en su `<Outlet />`, igual que cualquier otra página.

**¿Qué cambia en la pestaña Red si usas `<a href>` en lugar de `Link`?**
Con `<a href>` el navegador recarga la página completa: pide otra vez el documento y vuelve a
descargar todos los scripts (en la prueba, 26) además de la petición a la API. Con `Link` sólo
cambia la URL: en la Red aparece únicamente la petición a la API (`/clases/1`) y la imagen.

### Ejercicio 2

**¿En qué tipo de dato llega el id de la URL y qué pasa si no lo conviertes?**
Llega como texto (`string`), porque todo lo que viene en la URL es texto. Si no se convierte,
TypeScript marca error porque `useClase` y `traerClase` piden un `number`:

```
Argument of type 'string | undefined' is not assignable to parameter of type 'number'.
```

Y aunque se forzara, cualquier comparación con un número fallaría (`'2' === 2` es `false`).

**¿Qué pasa al ir de `/clases/1` a `/clases/2` si el id no está en las dependencias del efecto?**
React Router reusa la misma página (sólo cambió el parámetro), así que no se vuelve a montar y
el efecto no se repite. La URL dice `/clases/2` pero se sigue viendo «Fuerza total», la clase 1,
y no sale ninguna petición nueva en la Red.
