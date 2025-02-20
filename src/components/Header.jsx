import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {
    //Context
    const { cerrarSesión } = useAuth();


    //--------VIEW--------//
    return (
        <header>
            <div>
                <h1>
                    Administrador de Pacientes de <span className="text-white font-black">Veterinaria</span>
                </h1>

                <nav>
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