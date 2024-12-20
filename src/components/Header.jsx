import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Header() {
    //Context
    const { cerrarSesión } = useAuth();

  return (
    <header className="py-5 bg-indigo-600 lg:py-10">
        <div className="container mx-auto flex flex-col justify-between items-center lg:flex-row">
            <h1 className="font-bold text-2xl text-center text-indigo-200">
                Administrador de Pacientes de <span className="text-white font-black">Veterinaria</span>
            </h1>

            <nav className="mt-5 flex flex-col items-center gap-4 lg:mt-0 lg:flex-row">
                <Link to="/admin" className="headerLink">Pacientes</Link>
                <Link to="/admin/perfil" className="headerLink">Perfil</Link>
                <button type="button" className="headerLink" onClick={ cerrarSesión }>
                    Cerrar Sesión
                </button>
            </nav>
        </div>
    </header>
  )
}

export default Header