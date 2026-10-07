import { useEffect, useState } from "react";

// Recibe la URL y hace la petición GET al backend enviando la cookie
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función de petición declarada fuera del useEffect
  const getData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        setData(null);

        if (response.status === 401) {
          setError("Tu sesión expiró o no iniciaste sesión.");
        } else if (response.status === 403) {
          setError("No tenés permisos para ver esta información.");
        } else {
          setError("Ocurrió un error en el servidor. Intentá más tarde.");
        }
        return;
      }

      setData(result);
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // El efecto solo invoca la función y se vuelve a ejecutar si cambia la URL
  useEffect(() => {
    getData();
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};
