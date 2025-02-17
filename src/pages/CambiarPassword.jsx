import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const CambiarPassword = () => {
  //Hooks
  const [ password, setPassword ] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });
  const [ alerta, setAlerta ] = useState({});

  //Context
  const { guardarPassword } = useAuth();

  //Eventos (handleEvent)
  const handleSumbit = async (e) => {
    e.preventDefault();

    if( Object.values(password).some(campo => campo === '') ) {
      setAlerta({msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    if(password.pwd_nuevo.length < 6) {
      setAlerta({msg: 'El password debe de ser minimo 6 caracteres', error: true});
      return;
    }

    const result = await guardarPassword(password);
    setAlerta(result);

    setTimeout(() => {
      if(!result.error) {
        setPassword({
          pwd_actual: '',
          pwd_nuevo: ''
        });
      }

      setAlerta({});
    }, 3000);
  }

  const { msg } = alerta; 

  //--------VIEW--------//
  return (
    <>
        <AdminNav />
        
        <h2 className="font-black text-3xl text-center mt-10">
            Cambiar Password
        </h2>
        <p className="text-xl mt-5 mb-10 text-center">
            Modifica tu <span className="text-indigo-600 font-bold">Password Actual</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 p-5 bg-white shadow rounded-lg">

                {msg && <Alerta alerta= { alerta }/>}

                <form
                    onSubmit={ handleSumbit }
                >
                    <div className="my-3">
                        <label className="labelPerfil">Password Actual</label>
                        <input 
                        type="password"
                        name="pwd_actual"
                        placeholder="Escribe tu Password Actual"
                        className="inputPerfil"
                        value={password.pwd_actual}
                        onChange={e => setPassword({...password, [e.target.name]: e.target.value})}
                        />
                    </div>

                    <div className="my-3">
                        <label className="labelPerfil">Password Nuevo</label>
                        <input 
                        type="password"
                        name="pwd_nuevo"
                        placeholder="Escribe tu Password Nuevo"
                        className="inputPerfil"
                        value={password.pwd_nuevo}
                        onChange={e => setPassword({...password, [e.target.name]: e.target.value})}
                        />
                    </div>

                    <input 
                    type="submit" 
                    value="Actualizar Password"
                    className="btnPerfil"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword