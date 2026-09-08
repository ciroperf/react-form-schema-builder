import type { ChangeEvent } from "react";
import type { FieldOption, FormField } from "../schema/field";

interface FieldInspectorProps {
  field: FormField | undefined;
  updateField: (id: string, updates: Partial<FormField>) => void;
}

// Una riga per opzione, formato "valore|etichetta". Se manca "|" usa lo
// stesso testo sia come valore che come etichetta.
function parseOptionsText(text: string): FieldOption[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [value, label] = line.split("|");
      return { value: value.trim(), label: (label ?? value).trim() };
    });
}

function optionsToText(options: FieldOption[]): string {
  return options.map((option) => `${option.value}|${option.label}`).join("\n");
}

export function FieldInspector({ field, updateField }: FieldInspectorProps) {
  if (!field) {
    return (
      <aside aria-label="Proprieta' del campo">
        <h2>Proprieta'</h2>
        <p>Seleziona un campo dal canvas per modificarlo.</p>
      </aside>
    );
  }

  const fieldId = field.id;

  function handleLabelChange(event: ChangeEvent<HTMLInputElement>) {
    updateField(fieldId, { label: event.target.value });
  }

  function handleRequiredChange(event: ChangeEvent<HTMLInputElement>) {
    updateField(fieldId, { required: event.target.checked });
  }

  function handleOptionsChange(event: ChangeEvent<HTMLTextAreaElement>) {
    updateField(fieldId, { options: parseOptionsText(event.target.value) } as Partial<FormField>);
  }

  return (
    <aside aria-label="Proprieta' del campo">
      <h2>Proprieta'</h2>
      <label>
        Etichetta
        <input type="text" value={field.label} onChange={handleLabelChange} />
      </label>
      <label>
        <input type="checkbox" checked={field.required} onChange={handleRequiredChange} />
        Obbligatorio
      </label>
      {field.type === "select" && (
        <label>
          Opzioni (una per riga, formato valore|etichetta)
          <textarea value={optionsToText(field.options)} onChange={handleOptionsChange} />
        </label>
      )}
    </aside>
  );
}
