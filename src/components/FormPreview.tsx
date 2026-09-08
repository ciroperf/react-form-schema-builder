import { useForm, type UseFormRegister } from "react-hook-form";
import type { FormField } from "../schema/field";

interface FormPreviewProps {
  fields: FormField[];
}

type PreviewValues = Record<string, string | boolean>;

// Rende il controllo giusto per il tipo di campo, registrandolo su
// react-hook-form con la regola "required" derivata dallo schema.
function renderControl(field: FormField, register: UseFormRegister<PreviewValues>) {
  const rules = { required: field.required ? "Campo obbligatorio" : false };

  switch (field.type) {
    case "select":
      return (
        <select defaultValue="" {...register(field.id, rules)}>
          <option value="" disabled>
            Seleziona...
          </option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "checkbox":
      return <input type="checkbox" {...register(field.id, rules)} />;
    case "date":
      return <input type="date" {...register(field.id, rules)} />;
    case "text":
      return <input type="text" {...register(field.id, rules)} />;
  }
}

export function FormPreview({ fields }: FormPreviewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreviewValues>();

  if (fields.length === 0) {
    return (
      <section aria-label="Anteprima del form">
        <h2>Anteprima</h2>
        <p>Aggiungi almeno un campo per vedere l'anteprima.</p>
      </section>
    );
  }

  return (
    <section aria-label="Anteprima del form">
      <h2>Anteprima</h2>
      <form onSubmit={handleSubmit(() => {})} noValidate>
        {fields.map((field) => {
          const errorMessage = errors[field.id]?.message;
          return (
            <div key={field.id}>
              <label>
                {field.label}
                {renderControl(field, register)}
              </label>
              {typeof errorMessage === "string" && <span role="alert">{errorMessage}</span>}
            </div>
          );
        })}
        <button type="submit">Invia</button>
      </form>
    </section>
  );
}
