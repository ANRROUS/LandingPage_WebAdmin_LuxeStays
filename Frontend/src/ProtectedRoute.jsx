import { useAuth } from "./Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Pages/Loading";
import { useState, useEffect } from "react";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
