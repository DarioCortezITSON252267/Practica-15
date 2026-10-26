// El mapa de rutas. Todas son hijas del <Layout>: se pintan en su <Outlet />.
import { Navigate, Route, Routes } from 'react-router';
import { Layout } from './componentes/Layout.tsx';
import { NoEncontrado } from './componentes/NoEncontrado.tsx';
import { PaginaClase } from './paginas/PaginaClase.tsx';
import { PaginaClases } from './paginas/PaginaClases.tsx';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* La portada no tiene página propia: manda a /clases. */}
        <Route index element={<Navigate to="/clases" replace />} />

        <Route path="clases">
          <Route index element={<PaginaClases />} />
          <Route path=":id" element={<PaginaClase />} />
        </Route>

        {/* Cualquier otra dirección. Es hija del Layout: por eso también lleva encabezado y pie. */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}
