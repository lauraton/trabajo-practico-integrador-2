import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      // limpia la cookie con el token en el backend
      await fetch("http://localhost:6767/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // aunque falle la conexion, igual se cierra la sesion en el navegador
    } finally {
      localStorage.removeItem("isLogged");
      setIsLoading(false);
      navigate("/login");
    }
  };

  return (
    <nav className="bg-slate-900 text-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="text-lg sm:text-xl font-bold tracking-tight">
          Blog Personal
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-sm font-medium text-slate-200 hover:text-white"
          >
            Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {isLoading ? "Saliendo..." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
};
