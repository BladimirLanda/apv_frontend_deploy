import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const RestPassword = () => {
    //Hooks
    const [ email, setEmail ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    //Eventos (handleEvent)
    const handleSumbit = async (e) => {
        e.preventDefault();

        if(!email) {
            setAlerta({msg: 'El email es obligatorio', error: true});
            return;
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/rest-password', { email })

            setAlerta({ msg: data.msg, error: false });
        } catch (error) {
            console.log(error.response);
            setAlerta({msg: error.response.data.msg, error:true})
        }
    }

    const { msg } = alerta;

    //--------VIEW--------//
    return (
        <>
            <div>
                <h1 className="titlePage">
                    Recupera tu Acceso y no Pierdas tus <span className="text-black">Pacientes</span>
                </h1>
            </div>

            <div className='divForm'>
                {msg && <Alerta alerta = { alerta }/>}

                <form onSubmit={ handleSumbit }>
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

                    <input 
                    type="submit" 
                    value="Enviar Instrucciones"
                    className="labelSubmit"
                    />
                </form>

                <nav className='navMain'>
                    <Link to="/" className='navLink'>¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link to="/registrar" className='navLink'>¿No tienes una cuenta? Regístrate</Link>
                </nav>
            </div>
        </>
    )
}

export default RestPassword