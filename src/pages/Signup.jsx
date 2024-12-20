import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios'; //Ya cuenta con la importanción de axios
import Alerta from '../components/Alerta';

const Signup = () => {
  //Hooks
  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ rePassword, setRePassword ] = useState('');

  const [ alerta, setAlerta ] = useState({});


  //Eventos
  const handleSumbit = async (e) => {
    e.preventDefault();

    if([nombre, email, password, rePassword].includes('')) {
      setAlerta({ msg: 'Existen campos vacios', error: true })
      return;
    }

    if(password !== rePassword) {
      setAlerta({ msg: 'El password no coincide', error: true })
      return;
    }

    if(password.length < 6) {
      setAlerta({ msg: 'Contraseña vulnerable. Agrega minimo 6 caracteres', error: true })
      return;
    }

    setAlerta({});

    //Usuario API
    try {
      await clienteAxios.post('/veterinarios', { nombre, email, password });

      setAlerta({ msg: 'Registro correcto, Se ha enviadó un email de confirmación', error: false })
    } catch (error) {
      console.log(error.response);
      setAlerta({msg: error.response.data.msg, error: true})
    }
  }

  //Validación alerta
  const { msg } = alerta; //Si &&(entonces) - Si no ||(entonces)

  //-------------------//
  return (
    <>
        <div>
            <h1 className="titlePage">
                Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span>
            </h1>
        </div>

        <div className='divForm'>
          
            {msg && <Alerta alerta = { alerta }/>}

            <form onSubmit={ handleSumbit }>
                <div className="my-5">
                    <label htmlFor="" className="labelForm">
                        Nombre
                    </label>
                    <input 
                    type="text" 
                    placeholder="Tu Nombre"
                    className="labelInput"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
                </div>

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
                    placeholder="Tu Password"
                    className="labelInput"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label htmlFor="" className="labelForm">
                        Repetir Password
                    </label>
                    <input 
                    type="password" 
                    placeholder="Repite tu Password"
                    className="labelInput"
                    value={rePassword}
                    onChange={e => setRePassword(e.target.value)}
                    />
                </div>

                <input 
                type="submit" 
                value="Crear Cuenta"
                className="labelSubmit"
                />
            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link to="/" className='navLink'>¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link to="/rest-password" className='navLink'>Olvide mi Contraseña</Link>
            </nav>
        </div>
    </>
  )
}

export default Signup