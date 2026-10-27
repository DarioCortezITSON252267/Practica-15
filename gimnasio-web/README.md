## Respuestas · Práctica 16

### Ejercicio 1

**¿Por qué se usa un contexto y no props para la sesión?**
Porque la sesión la necesitan componentes en distintos lugares del árbol: el encabezado, la
página de entrar, la de registro y, después, las inscripciones. Con props habría que pasarla
por cada componente intermedio aunque no la use (el Layout, las rutas…), y las páginas las
pinta el Router en el `<Outlet />`, donde no se les pasan props. El contexto la deja disponible
para cualquiera que esté dentro del proveedor.

**¿Qué pasa si un componente usa la sesión fuera del proveedor?**
`useContext` regresa el valor por defecto, que es `null`. Nuestro hook `useSesion()` lo revisa y
lanza un error: la página queda en blanco y en la consola sale
`useSesion() se usó fuera de <SesionProvider>`. Así el error se nota de inmediato en lugar de
fallar más adelante con un `null`.

### Ejercicio 2

**¿Dónde se guarda el token y qué riesgo tiene ese lugar?**
En el `localStorage` del navegador (claves `token` y `usuario`), para que la sesión sobreviva a
recargar la página. El riesgo es que cualquier JavaScript que corra en la página puede leerlo:
si alguien logra meter código (un ataque XSS o una librería maliciosa), puede robar el token y
hacerse pasar por el usuario hasta que caduque (1 hora). Además se queda guardado aunque se
cierre el navegador, por ejemplo en una computadora compartida.
