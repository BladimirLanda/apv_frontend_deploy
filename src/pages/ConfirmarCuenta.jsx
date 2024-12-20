import { useState ,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
  //Variables
  const params = useParams();
  const { token } = params;

  //Hooks
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
  const [ cargando, setCargando ] = useState(true);
  const [ alerta, setAlerta ] = useState({});

  useEffect(() => {
    const confirmarCuenta = async() => {
      try {
        const url = `/veterinarios/confirmar/${token}`;
        const { data } = await clienteAxios(url); //Solicitud .get() por defecto

        setCuentaConfirmada(true);
        setAlerta({msg: data.msg, error: false});
      } catch (error) {
        setAlerta({msg: error.response.data.msg, error: true});
      }

      setCargando(false);
    }
    confirmarCuenta();
  }, []);

  //(): Especifica un retorno HTML

  //-------------------//
  return (
    <>
        <div>
            <h1 className="titlePage">
                Confirma tu Cuenta y Comienza a Administrar tus <span className="text-black">Pacientes</span>
            </h1>
        </div>

        <div className='divForm'>
          {!cargando && <Alerta alerta = { alerta }/>}

          {cuentaConfirmada && (<Link to="/" className='navLink text-xl'>Iniciar Sesión</Link>)}
        </div>
    </>
  )
}

export default ConfirmarCuenta