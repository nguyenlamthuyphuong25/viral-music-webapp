import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const  ProtectedUserRoute = () => {
   
    const [user, setUser] = useState(localStorage.getItem("role") === "User" ? true : null);

    return user ? <Outlet /> : <Navigate to="/" />;
}
export default ProtectedUserRoute