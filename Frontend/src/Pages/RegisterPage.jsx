import { Navigate } from "react-router-dom";

// RegisterPage now redirects to LoginPage which handles both login and register
function RegisterPage() {
    return <Navigate to="/login" replace />;
}

export default RegisterPage;