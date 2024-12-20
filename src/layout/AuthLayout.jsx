import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    //Declaración de un 'Fragment': Agrupo código HTML sin generar un nuevo elemento
    //Outlet: Es un componente que funciona como un marcador de posición dentro de un componente de ruta principal para indicar a React-Router dónde representar las rutas secundarias.
    <>
        <main className="mainAuth">
            <Outlet />
        </main>
    </>
  )
}

export default AuthLayout;