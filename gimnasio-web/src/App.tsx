// El mapa de rutas. Todas son hijas del <Layout>: se pintan en su <Outlet />.
import { Navigate, Route, Routes } from 'react-router';
import { Layout } from './componentes/Layout.tsx';
import { NoEncontrado } from './componentes/NoEncontrado.tsx';
import { PaginaClase } from './paginas/PaginaClase.tsx';
import { PaginaClases } from './paginas/PaginaClases.tsx';
import PaginaEntrar from './paginas/PaginaEntrar.tsx';
import PaginaRegistro from './paginas/PaginaRegistro.tsx';

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

        <Route path="entrar" element={<PaginaEntrar />} />
        <Route path="registro" element={<PaginaRegistro />} />

        {/* Cualquier otra dirección. Es hija del Layout: por eso también lleva encabezado y pie. */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}
