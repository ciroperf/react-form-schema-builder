export type SelectOption = {
  value: string;
  label: string;
};

type FieldBase = {
  id: string;
  label: string;
  required: boolean;
};

export type TextField = FieldBase & {
  type: "text";
};

export type SelectField = FieldBase & {
  type: "select";
  options: SelectOption[];
};

export type CheckboxField = FieldBase & {
  type: "checkbox";
};

export type DateField = FieldBase & {
  type: "date";
};

export type FormField = TextField | SelectField | CheckboxField | DateField;
