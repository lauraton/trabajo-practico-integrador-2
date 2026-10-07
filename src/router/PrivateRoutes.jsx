import { Navigate, Outlet } from "react-router";

// Solo deja pasar si isLogged es true, si no redirige a LoginPage
export const PrivateRoutes = () => {
  const isLogged = localStorage.getItem("isLogged") === "true";

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
