import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
    const [admin, setAdmin] = useState(localStorage.getItem("role") === "Admin"? true : null);

    return admin ? <Outlet /> : <Navigate to="/" />;
}

  export default ProtectedAdminRoute


