import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdminitrarPacientes = () => {
  //Hooks
  const [ mostrarFormulario, setMostrarFormulario ] = useState(false);

  //--------VIEW--------//
  return (
    <div className="flex flex-col md:flex-row">
      <button 
      type="button" 
      onClick={ () => setMostrarFormulario(!mostrarFormulario) }
      className="bg-indigo-600 text-white font-bold uppercase mx-10 mb-5 p-3 rounded-md md:hidden">
        {mostrarFormulario? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>

      <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdminitrarPacientes