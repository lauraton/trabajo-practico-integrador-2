import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // mensaje de exito que llega desde RegisterPage
  const successMessage = location.state?.message;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const { username, password, formState, handleInputChange } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch("http://localhost:6767/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        // solo ante un login exitoso se guarda isLogged
        localStorage.setItem("isLogged", "true");
        navigate("/");
        return;
      }

      if (response.status === 400) {
        // errores de validacion de express-validator
        setErrors(data);
      } else if (response.status === 401) {
        setErrors([data.message || "Usuario o contraseña incorrectos."]);
      } else {
        setErrors(["Ocurrió un error en el servidor. Intentá más tarde."]);
      }
    } catch {
      setErrors(["No se pudo conectar con el servidor."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">
          Iniciar sesión
        </h1>

        {successMessage && (
          <p className="bg-emerald-100 text-emerald-700 text-sm rounded-lg p-3 mb-4">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Usuario
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              className="border border-slate-300 rounded-lg px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Contraseña
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="border border-slate-300 rounded-lg px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </label>

          {errors.length > 0 && (
            <ul className="bg-red-100 text-red-700 text-sm rounded-lg p-3 list-disc pl-6">
              {errors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Registrate
          </Link>
        </p>
      </section>
    </main>
  );
};
