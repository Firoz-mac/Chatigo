import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const token = localStorage.getItem("chatigo");
    if (!token) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoutes;