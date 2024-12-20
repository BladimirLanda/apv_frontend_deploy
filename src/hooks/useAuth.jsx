/*
Un custom hook es una función que permite reutilizar lógica de estado o efectos entre componentes de una aplicación. Son una extensión de los hooks estándar de React, como useState, useEffect o useRef, pero pueden ser diseñados para adaptarse a las necesidades específicas de un proyecto.
*/

import { useContext } from "react"; //useContext: Hook que establece la extracción del Conext
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;