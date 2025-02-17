import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; //useNavigate: Función Navegación React
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Login = () => {
    //Hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    //Context
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    //Eventos (handleEvent)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if([email, password].includes('')) {
            setAlerta({msg: 'Todos los campos son obligatorios', error: true});
            return;
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', {email, password});

            localStorage.setItem('JWToken', data.JWToken);
            setAuth(data);

            navigate('/admin');
        } catch (error) {
            console.log(error.response);
            setAlerta({msg: error.response.data.msg, error: true});
        }
    }

    const { msg } = alerta; 

    //--------VIEW--------//
    return (
        <>
            <div>
                <h1 className="titlePage">
                    Inicia Sesión y Administra tus <span className="text-black">Pacientes</span>
                </h1>
            </div>

            <div className='divForm'>
                {msg && <Alerta alerta = { alerta }/>}

                <form onSubmit={ handleSubmit }>
                    <div className="my-5">
                        <label htmlFor="" className="labelForm">
                            Email
                        </label>
                        <input 
                        type="email" 
                        placeholder="Email de Registro"
                        className="labelInput"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label htmlFor="" className="labelForm">
                            Password
                        </label>
                        <input 
                        type="password" 
                        placeholder="Ingresa tu password"
                        className="labelInput"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input 
                    type="submit" 
                    value="Iniciar Sesión"
                    className="labelSubmit"
                    />
                </form>

                <nav className='navMain'>
                    <Link to="/registrar" className='navLink'>¿No tienes una cuenta? Regístrate</Link>
                    <Link to="/rest-password" className='navLink'>Olvide mi Contraseña</Link>
                </nav>
            </div>
        </>
    )
}

export default Login;