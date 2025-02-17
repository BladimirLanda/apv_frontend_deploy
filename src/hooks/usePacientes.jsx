import { useContext } from "react";
import PacienteContext from "../context/PacienteProvider";

const usePacientes = () => {
    return useContext(PacienteContext);
}

export default usePacientes;