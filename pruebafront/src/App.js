import React, { Fragment, Suspense, lazy, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Layout (Se mantienen cargados normalmente porque se usan en toda la app)
import Header from '../src/components/layout/Header';
import Navegacion from './components/layout/Navegacion';
import { CRMContext, CRMProvider } from './context/CRMContext';

// Lazy Loading de componentes
const Empleados = lazy(() => import('./components/empleados/Empleados'));
const NuevoEmpleado = lazy(() => import('./components/empleados/NuevoEmpleado'));
const EditarEmpleado = lazy(()=> import('./components/empleados/EditarEmpleado'));
const Solicitudes = lazy(() => import('./components/solicitudes/Solicitudes'));
const NuevaSolicitud = lazy(()=> import('./components/solicitudes/NuevaSolicitud'));
const EditarSolicitud = lazy(()=> import('./components/solicitudes/EditarSolicitud'));
const Login = lazy(()=> import('./components/auth/login'));

function App() {

  //Usar context
  const [auth, guardarAuth] = useContext(CRMContext);
  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
          <Header />

          <div className="grid contenedor contenido-principal">
            <Navegacion />

            <main className="caja-contenido col-9">
              <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                  <Route exact path="/" element={<Empleados />} />
                  <Route exact path="/empleados/nuevo" element={<NuevoEmpleado />} />
                  <Route exact path="/empleados/editar/:ID" element={<EditarEmpleado />} />
                  <Route exact path="/solicitudes" element={<Solicitudes />} />
                  <Route exact path="/solicitudes/nuevo" element={<NuevaSolicitud />} />
                  <Route exact path="/solicitudes/editar/:ID" element={<EditarSolicitud />} />
                  <Route exact path="/iniciar-sesion" element={<Login />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </CRMProvider>        
      </Fragment>
    </Router>
  );
}

export default App;