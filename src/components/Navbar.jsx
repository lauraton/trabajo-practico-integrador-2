import { Link } from "react-router";

export const Navbar = () => {
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
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
