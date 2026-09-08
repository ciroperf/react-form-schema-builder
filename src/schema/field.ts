// Modello dati condiviso per un campo del form.
export interface FieldOption {
  value: string;
  label: string;
}

interface BaseField {
  id: string;
  label: string;
  required: boolean;
}

export interface TextField extends BaseField {
  type: "text";
}

export interface SelectField extends BaseField {
  type: "select";
  options: FieldOption[];
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
}

export interface DateField extends BaseField {
  type: "date";
}

export type FormField = TextField | SelectField | CheckboxField | DateField;

export const FIELD_TYPES = ["text", "select", "checkbox", "date"] as const;

// Crea un campo con valori di default, usato quando si trascina un tipo
// dalla palette al canvas.
export function createField(type: FormField["type"], id: string): FormField {
  const base = { id, label: `Nuovo campo ${type}`, required: false };
  if (type === "select") {
    return { ...base, type, options: [] };
  }
  return { ...base, type };
}
