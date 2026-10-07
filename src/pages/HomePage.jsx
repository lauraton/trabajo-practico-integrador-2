import { Navbar } from "../components/Navbar";
import { useFetch } from "../hooks/useFetch";

export const HomePage = () => {
  const { data, isLoading, error } = useFetch(
    "http://localhost:6767/api/articles",
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
          Artículos publicados
        </h1>

        {isLoading && (
          <p className="text-center text-indigo-600 font-semibold py-10">
            Cargando artículos...
          </p>
        )}

        {!isLoading && error && (
          <p className="bg-red-100 text-red-700 font-medium rounded-lg p-4">
            {error}
          </p>
        )}

        {!isLoading && !error && data?.length === 0 && (
          <p className="text-center text-slate-500 py-10">
            Todavía no hay artículos publicados.
          </p>
        )}

        {!isLoading && !error && data?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col gap-3"
              >
                <h2 className="text-xl font-bold text-slate-900">
                  {article.title}
                </h2>

                <p className="text-slate-600">
                  {article.excerpt || "Este artículo no tiene resumen."}
                </p>

                <p className="text-sm text-slate-500">
                  Autor:{" "}
                  <span className="font-semibold text-slate-700">
                    {article.author?.username}
                  </span>
                </p>

                {article.tags?.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <li
                        key={tag.id}
                        className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full"
                      >
                        {tag.name}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
