import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const CambiarPassword = () => {
  //Hooks
  const [ alerta, setAlerta ] = useState({});
  const [ password, setPassword ] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });
  const { guardarPassword } = useAuth();

  //Eventos
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
      setAlerta({});
    }, 3000);
  }

  //Validación alerta
  const { msg } = alerta; 

  //-------------------//
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
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 ">

                {msg && <Alerta alerta= { alerta }/>}

                <form
                    onSubmit={ handleSumbit }
                >
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Actual</label>
                        <input 
                        type="password"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="pwd_actual"
                        placeholder="Escribe tu Password Actual"
                        onChange={e => setPassword({...password, [e.target.name]: e.target.value})}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Nuevo</label>
                        <input 
                        type="password"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="pwd_nuevo"
                        placeholder="Escribe tu Password Nuevo"
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