import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacienteContext = createContext();

const PacienteProvider = ( {children} ) => {
    //Hooks
    const [ pacientes, setPacientes ] = useState([]);
    const [ paciente, setPaciente ] = useState({});

    //Context
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const JWToken = localStorage.getItem('JWToken');

                if(!JWToken) { return }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JWToken}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config);

                setPacientes(data);
            } catch (error) {
                console.log(error.response.data.msg || error.response);
                setPacientes([]);
            }
        }
        obtenerPacientes();
    }, [auth]);

    //Funciones
    const guardarPaciente = async (paciente) => {

        const JWToken = localStorage.getItem('JWToken');

        if(!JWToken) { return }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWToken}`
            }
        }

        if(paciente.id) {
            try {
                const url = `/pacientes/${paciente.id}`
                const { data } = await clienteAxios.put(url, paciente, config);

                const pacientesActualizado = pacientes.map( p => p._id === data._id ? data : p);
                
                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error.response.data.msg || error.response);
            }

            return;
        } 

        try {
            const { data } = await clienteAxios.post('/pacientes', paciente, config);

            setPacientes([data, ...pacientes]);
        } catch (error) {
            console.log(error.response.data.msg || error.response);
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const setEliminar = async (id) => {
        const confirmar = confirm('¿Confirmar eliminación');

        if(confirmar) {
            try {
                const JWToken = localStorage.getItem('JWToken');

                if(!JWToken) { return }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JWToken}`
                    }
                }

                const url = `/pacientes/${id}`
                await clienteAxios.delete(url, config);

                const pacientesActualizado = pacientes.filter( p => p._id !== id);

                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error.response.data.msg || error.response);
            }
        }
    }

    //-------PROVIDER-------/
    return (
        <PacienteContext.Provider value={ { pacientes, setPacientes, paciente, setPaciente, 
        guardarPaciente, setEdicion, setEliminar } }>
            { children }
        </PacienteContext.Provider>
    )
}

export {
    PacienteProvider
}

export default PacienteContext;