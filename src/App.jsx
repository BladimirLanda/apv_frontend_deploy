import {BrowserRouter, Routes, Route} from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import { PacienteProvider } from "./context/PacienteProvider";

import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import RestPassword from "./pages/RestPassword";
import NewPassword from "./pages/NewPassword";

import AdminitrarPacientes from "./pages/AdminitrarPacientes";
import EditarPerfil from "./pages/EditarPerfil";
import CambiarPassword from "./pages/CambiarPassword";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacienteProvider>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />}/>
                    <Route path="registrar" element={<Signup />}/>
                    <Route path="rest-password" element={<RestPassword />}/>
                    <Route path="rest-password/:token" element={<NewPassword />}/>
                    <Route path="confirmar/:token" element={<ConfirmarCuenta />}/>
                </Route>
                
                <Route path="/admin" element={<RutaProtegida />}>
                    <Route index element={<AdminitrarPacientes />}/>
                    <Route path="perfil" element={<EditarPerfil />}/>
                    <Route path="cambiar-password" element={<CambiarPassword />}/>
                </Route>
            </Routes>
        </PacienteProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
