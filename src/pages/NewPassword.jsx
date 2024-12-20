import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NewPassword = () => {
  //Variables
  const params = useParams();
  const { token } = params;

  //Hooks
  const [ password, setPassword ] = useState('');
  const [ alerta, setAlerta ] = useState({});
  const [ tokenValido, setTokenValido ] = useState(false);
  const [ passwordModificado, setPasswordModificado ] = useState(false);

  useEffect(() => {
    const comprobarToken  = async () => {
      try {
        const url = `/veterinarios/rest-password/${token}`;
        await clienteAxios(url);
        
        setAlerta({msg: 'Coloca tu Nueva Contraseña', error: false});
        setTokenValido(true);
      } catch (error) {
        setAlerta({msg: 'Hubo un Error en el Enlace', error: true});
      }
    }

    comprobarToken();
  }, []);

  //Eventos
  const handleSumbit = async (e) => {
    e.preventDefault();

    if(password.length < 6) {
      setAlerta({msg: 'El Password debe ser minimo de 6 caracteres', error: true});
      return;
    }

    try {
      const url = `/veterinarios/rest-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });

      setAlerta({msg: data.msg, error: false});
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }
  }

  //Validación alerta
   const { msg } = alerta;

   //-------------------//
  return (
    <>
        <div>
            <h1 className="titlePage">
                Restablece tu contraseña y ten acceso a tus <span className="text-black">Pacientes</span>
            </h1>
        </div>

        <div className='divForm'>

            {msg && <Alerta alerta = { alerta }/>}

            {tokenValido && (
              <>
                <form onSubmit={ handleSumbit }>
                    <div className="my-5">
                      <label htmlFor="" className="labelForm">
                          Nuevo Password
                      </label>
                      <input 
                      type="password" 
                      placeholder="Tu nuevo Password"
                      className="labelInput"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      />
                    </div>

                    <input 
                    type="submit" 
                    value="Guardar Nuevo Password"
                    className="labelSubmit"
                    />
                </form>

                {passwordModificado && (<Link to="/" className='navLink text-xl'>Inicia Sesión</Link>)}
              </>
            ) || (
              <> 
                <p>Valida el enlace o Solicita uno nuevo</p> 
              </>
            )}
        </div>
    </>
  )
}

export default NewPassword