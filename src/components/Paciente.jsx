import usePacientes from "../hooks/usePacientes";

const Paciente = ( {paciente} ) => {
    //Variables
    const { nombre, propietario, email, fechaAlta, sintomas, _id } = paciente;

    //Context
    const { setEdicion, setEliminar } = usePacientes();

    //Funciones
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);

        const formatter = new Intl.DateTimeFormat('es-MX', {
            dateStyle: 'long'
        });

        return formatter.format(nuevaFecha);
    }

    ///--------VIEW--------//
    return (
        <div className="pacienteDiv">
            <p className="pacienteInfo">
                Nombre: <span>{nombre}</span>
            </p>

            <p className="pacienteInfo">
                Propietario: <span>{propietario}</span>
            </p>

            <p className="pacienteInfo">
                Email: <span>{email}</span>
            </p>

            <p className="pacienteInfo">
                Fecha Alta: <span>{ formatearFecha(fechaAlta) }</span>
            </p>

            <p className="pacienteInfo">
                Sintomas: <span>{sintomas}</span>
            </p>

            <div className="my-5 flex justify-between">
                <button 
                type="button" 
                className="pacienteButton"
                onClick={() => setEdicion(paciente)}
                >
                    Editar
                </button>

                <button 
                type="button" 
                className="pacienteButtonRed"
                onClick={() => setEliminar(_id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Paciente