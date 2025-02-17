import { useState, useEffect } from "react"
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
    //Hooks
    const [ nombre, setNombre ] = useState('');
    const [ propietario, setPropietario]  = useState('');
    const [ email, setEmail ] = useState('');
    const [ fechaAlta, setFechaAlta ] = useState('');
    const [ sintomas, setSintomas ] = useState('');
    const [ id, setId ] = useState(null);
    const [alerta, setAlerta] = useState('');

    //Context
    const { paciente, guardarPaciente } = usePacientes();

    useEffect(() => {
        if(paciente?._id) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFechaAlta(paciente.fechaAlta);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);

    //Eventos (handleEvent)
    const handleSubmit = (e) => {
        e.preventDefault();

        if([nombre, propietario, email, fechaAlta, sintomas].includes('')) {
            setAlerta({msg: 'Todos los campos son obligatorios', error: true});
            return;
        }
        
        guardarPaciente({ nombre, propietario, email, fechaAlta, sintomas, id });
        setAlerta({msg: 'Guardado Correctamente', error:false});

        setTimeout(() => {
            setNombre('');
            setPropietario('');
            setEmail('');
            setFechaAlta('');
            setSintomas('');
            setId(null);
        }, 500);

        setTimeout(() => {
            setAlerta({});
        }, 3000);
    }

    const { msg } = alerta; 

    //--------VIEW--------//
    return (
        <>
            <h2 className="font-black text-xl text-center">Administrador de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus <span className="font-bold text-indigo-600">Pacientes y Administralos</span>
            </p>

            {msg && <Alerta alerta = { alerta }/>}

            <form 
            className="pacienteForm"
            onSubmit={ handleSubmit }
            >
                <div className="mb-5">
                    <label htmlFor="nombre" className="pacienteLabel">Nombre Mascota</label>
                    <input 
                    id="nombre"
                    type="text"
                    placeholder="Nombre Mascota"
                    className="pacienteInput"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="pacienteLabel">Nombre Propietario</label>
                    <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre Propietario"
                    className="pacienteInput"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="pacienteLabel">Email</label>
                    <input 
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="pacienteInput"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="fechaAlta" className="pacienteLabel">Fecha Alta</label>
                    <input 
                    id="fechaAlta"
                    type="date"
                    className="pacienteInput"
                    value={fechaAlta}
                    onChange={e => setFechaAlta(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="pacienteLabel">Sintomas</label>
                    <textarea 
                    id="sintomas"
                    placeholder="Describe los sintomas"
                    className="pacienteInput"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input 
                type="submit" 
                className="pacienteSubmit"
                value={ id ? 'Guardar Cambios' : 'Agregar Paciente'}
                />
            </form>
        </>
    )
}

export default Formulario