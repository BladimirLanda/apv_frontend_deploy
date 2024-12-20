import usePacientes from "../hooks/usePacientes";

const Paciente = ( {paciente} ) => {
    //Variables
    const {nombre, propietario, email, fechaAlta, sintomas, _id} = paciente;

    const { setEdicion, setEliminar } = usePacientes();

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);

        //Intl: API de internacionalización de ECMAScript
        //.NumberFormat: Formatea fechas y horas
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha);
    }
    //-------------------//
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl hover:shadow-indigo-400">
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

        <div className="flex justify-between my-5">
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