import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  //Context
  const { pacientes } = usePacientes();

  //--------VIEW--------//
  return (
    <>
        { pacientes.length ? (
          <>
            <h2 className="font-black text-xl text-center">Listado de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Administra tus <span className="font-bold text-indigo-600">Pacientes y Citas</span>
            </p>
            
            {pacientes.map(paciente => ( <Paciente key={ paciente._id } paciente={ paciente }/> ))}           
          </>
        ) : (
          <>
            <h2 className="font-black text-xl text-center">No hay Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando pacientes y <span className="font-bold text-indigo-600">aparecerán en este lugar</span>
            </p>
          </>
        )}
    </>
  )
}

export default ListadoPacientes;