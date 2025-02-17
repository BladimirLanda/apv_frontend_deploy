import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
    //Hooks
    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const JWToken =  localStorage.getItem('JWToken');

            if(!JWToken) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JWToken}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config);

                setAuth(data.veterinario);
            } catch (error) {
                console.log(error.response.data.msg || error.response);
                setAuth({});
            }

            setCargando(false);
        }
        autenticarUsuario();
    }, []);

    //Funciones
    const cerrarSesión = () => {
        localStorage.removeItem('JWToken');
        setAuth({});
    }

    const actualizarPerfil = async (datos) => {
        const JWToken = localStorage.getItem('JWToken');

        if(!JWToken) { return }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWToken}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            await clienteAxios.put(url, datos, config);

            const { data } = await clienteAxios('/veterinarios/perfil', config);
            setAuth(data.veterinario);

            return {msg: 'Almacenado Correctamente', error: false}
        } catch (error) {
            console.log(error.response);
            return {msg: error.response.data.msg, error: true}
        }
    }

    const guardarPassword = async (datos) => {
        const JWToken = localStorage.getItem('JWToken');

        if(!JWToken) { return }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWToken}`
            }
        }

        try {
            const { data } = await clienteAxios.put('/veterinarios/actualizar-password', datos, config);
            return {msg: data.msg, error: false}
        } catch (error) {
            console.log(error.response);
            return {msg: error.response.data.msg, error: true}
        }
    }

    //-------PROVIDER-------/
    return (
        <AuthContext.Provider value={ {auth, setAuth, cargando, setCargando, 
        setCargando, cerrarSesión, actualizarPerfil, guardarPassword} }>
            { children }
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;