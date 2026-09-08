import type { FormField } from "./field";

// Converte l'elenco di FormField del builder nel codice sorgente di un
// componente React/TypeScript equivalente, gia' cablato con react-hook-form.
export function fieldsToComponentCode(fields: FormField[]): string {
  const valuesType = fields.map((field) => `  ${field.id}: ${tsType(field)};`).join("\n");
  const controls = fields.map(renderControl).join("\n\n");

  return `import { useForm } from "react-hook-form";

interface FormValues {
${valuesType}
}

export function GeneratedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
${controls}
      <button type="submit">Invia</button>
    </form>
  );
}
`;
}

function tsType(field: FormField): string {
  return field.type === "checkbox" ? "boolean" : "string";
}

function renderControl(field: FormField): string {
  const rule = field.required ? `{ required: "Campo obbligatorio" }` : "{}";
  const errorBlock = `        {errors.${field.id} && <span role="alert">{errors.${field.id}?.message}</span>}`;

  let input: string;
  switch (field.type) {
    case "select": {
      const options = field.options
        .map((option) => `            <option value="${option.value}">${option.label}</option>`)
        .join("\n");
      input = `          <select defaultValue="" {...register("${field.id}", ${rule})}>
            <option value="" disabled>
              Seleziona...
            </option>
${options}
          </select>`;
      break;
    }
    case "checkbox":
      input = `          <input type="checkbox" {...register("${field.id}", ${rule})} />`;
      break;
    case "date":
      input = `          <input type="date" {...register("${field.id}", ${rule})} />`;
      break;
    case "text":
      input = `          <input type="text" {...register("${field.id}", ${rule})} />`;
      break;
  }

  return `      <div>
        <label>
          ${field.label}
${input}
        </label>
${errorBlock}
      </div>`;
}
