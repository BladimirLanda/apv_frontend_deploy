import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    //useContext(): Conexión Recursos Context
    return useContext(AuthContext);
}

export default useAuth;