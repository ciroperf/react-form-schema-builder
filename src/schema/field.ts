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
