/*
Context: Es una herramienta que permite pasar datos entre componentes de manera directa, sin tener que pasar props manualmente en cada nivel.
-Permite compartir datos entre componentes que no están directamente relacionados. 
-Es útil cuando algunos datos necesitan ser accesibles por muchos componentes en diferentes niveles. 
-Se puede usar para compartir datos que pueden considerarse "globales" para un árbol de componentes.
*/

//children: prop reservado de context para establecer componentes hijos

import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
    //Hooks
    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('JWToken');

            if(!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config);

                setAuth(data.veterinario);
            } catch (error) {
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
        const token = localStorage.getItem('JWToken');

        if(!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            await clienteAxios.put(url, datos, config);

            return {msg: 'Almacenado Correctamente', error: false}
        } catch (error) {
            return {msg: error.response.data.msg, error: true}
        }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('JWToken');

        if(!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put('/veterinarios/actualizar-password', datos, config);
            return {msg: data.msg, error: false}
        } catch (error) {
            return {msg: error.response.data.msg, error: true}
        }
    }

    //-------------/
    return (
        <AuthContext.Provider value={ {auth, setAuth, cargando, setCargando, cerrarSesión, actualizarPerfil, 
        guardarPassword} }>
            { children }
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext;