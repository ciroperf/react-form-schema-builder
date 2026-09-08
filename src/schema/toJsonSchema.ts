import type { FormField } from "./field";

// Converte l'elenco di FormField del builder in un JSON Schema equivalente.
export function fieldsToJsonSchema(fields: FormField[]): object {
  const properties: Record<string, object> = {};
  const required: string[] = [];

  for (const field of fields) {
    properties[field.id] = fieldPropertySchema(field);
    if (field.required) {
      required.push(field.id);
    }
  }

  return {
    type: "object",
    properties,
    ...(required.length > 0 ? { required } : {}),
  };
}

function fieldPropertySchema(field: FormField): object {
  switch (field.type) {
    case "text":
      return { type: "string", title: field.label };
    case "checkbox":
      return { type: "boolean", title: field.label };
    case "date":
      return { type: "string", format: "date", title: field.label };
    case "select":
      return {
        type: "string",
        title: field.label,
        enum: field.options.map((option) => option.value),
      };
  }
}
