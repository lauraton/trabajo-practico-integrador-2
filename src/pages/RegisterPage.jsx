import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const {
    first_name,
    last_name,
    username,
    email,
    password,
    formState,
    handleInputChange,
    handleReset,
  } = useForm({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch("http://localhost:6767/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        handleReset();
        navigate("/login", {
          state: {
            message: "Cuenta creada con éxito. Ya podés iniciar sesión.",
          },
        });
        return;
      }

      if (response.status === 400) {
        // errores de validacion de express-validator
        setErrors(data);
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
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">
          Crear cuenta
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Nombre
              <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={handleInputChange}
                className="border border-slate-300 rounded-lg px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Apellido
              <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={handleInputChange}
                className="border border-slate-300 rounded-lg px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </label>
          </div>

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
            Email
            <input
              type="email"
              name="email"
              value={email}
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
            <span className="text-xs font-normal text-slate-500">
              Mínimo 8 caracteres, con una mayúscula, una minúscula y un número.
            </span>
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
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {isLoading ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Iniciá sesión
          </Link>
        </p>
      </section>
    </main>
  );
};
