import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
    //Hooks
    const [ perfil, setPerfil ] = useState({});
    const [ alerta, setAlerta ] = useState({});

    //Context
    const { auth, actualizarPerfil } = useAuth();

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);

    //Eventos (handleEvent)
    const handleSumbit = async (e) => {
        e.preventDefault();

        const { nombre, email } = perfil;

        if([nombre, email].includes('')) {
            setAlerta({msg: 'Nombre y Email campos son obligatorios', error: true});
            return;
        }

        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado);

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const { msg } = alerta; 

    //--------VIEW--------//
    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">
                Editar Perfil
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu <span className="text-indigo-600 font-bold">Información aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 p-5 bg-white shadow rounded-lg">

                    {msg && <Alerta alerta= { alerta }/>}

                    <form
                        onSubmit={ handleSumbit }
                    >
                        <div className="my-3">
                            <label className="labelPerfil">Nombre</label>
                            <input 
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            className="inputPerfil" 
                            value={perfil.nombre || ''}
                            onChange={e => setPerfil( {...perfil, [e.target.name]: e.target.value} )}
                            />
                        </div>

                        <div className="my-3">
                            <label className="labelPerfil">Email</label>
                            <input 
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="inputPerfil" 
                            value={perfil.email || ''}
                            onChange={e => setPerfil( {...perfil, [e.target.name]: e.target.value} )}
                            />
                        </div>

                        <div className="my-3">
                            <label className="labelPerfil">Sitio Web</label>
                            <input 
                            type="text"
                            name="web"
                            placeholder="Web"
                            className="inputPerfil" 
                            value={perfil.web || ''}
                            onChange={e => setPerfil( {...perfil, [e.target.name]: e.target.value} )}
                            />
                        </div>

                        <div className="my-3">
                            <label className="labelPerfil">Teléfono</label>
                            <input 
                            type="text"
                            name="telefono"
                            placeholder="Teléfono"
                            className="inputPerfil" 
                            value={perfil.telefono || ''}
                            onChange={e => setPerfil( {...perfil, [e.target.name]: e.target.value} )}
                            />
                        </div>

                        <input 
                        type="submit" 
                        value="Guardar Cambios"
                        className="btnPerfil"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil