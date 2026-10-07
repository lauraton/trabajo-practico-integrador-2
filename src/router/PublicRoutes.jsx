import { Navigate, Outlet } from "react-router";

// Solo deja pasar si isLogged es distinto de true, si no redirige a HomePage
export const PublicRoutes = () => {
  const isLogged = localStorage.getItem("isLogged") === "true";

  if (isLogged) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
