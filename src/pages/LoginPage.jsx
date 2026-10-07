import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const { username, password, handleInputChange } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">
          Iniciar sesión
        </h1>

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

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Ingresar
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
