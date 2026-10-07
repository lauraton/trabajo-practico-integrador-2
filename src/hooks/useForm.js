import { useState } from "react";

// Recibe los valores iniciales del formulario
export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  // Actualiza solo el campo que cambió, conservando el resto (forma funcional del setter)
  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Vuelve el formulario a sus valores iniciales
  const handleReset = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    handleInputChange,
    handleReset,
  };
};
