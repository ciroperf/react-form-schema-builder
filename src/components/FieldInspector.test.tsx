import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { FormField } from "../schema/field";
import { useFormBuilder } from "../state/useFormBuilder";
import { FieldInspector } from "./FieldInspector";

const textField: FormField = {
  id: "f1",
  type: "text",
  label: "Nome",
  required: false,
};

function TestHarness() {
  const { fields, updateField, selectedFieldId, selectField } = useFormBuilder([textField]);
  const selectedField = fields.find((field) => field.id === selectedFieldId);

  return (
    <div>
      <button type="button" onClick={() => selectField(textField.id)}>
        Seleziona
      </button>
      <FieldInspector field={selectedField} updateField={updateField} />
      <ul>
        {fields.map((field) => (
          <li key={field.id}>{field.label}</li>
        ))}
      </ul>
    </div>
  );
}

describe("FieldInspector", () => {
  it("mostra un messaggio quando nessun campo e' selezionato", () => {
    render(<FieldInspector field={undefined} updateField={() => {}} />);
    expect(screen.getByText(/seleziona un campo/i)).toBeDefined();
  });

  it("aggiorna lo store quando si modifica la label del campo selezionato", () => {
    render(<TestHarness />);

    act(() => {
      screen.getByText("Seleziona").click();
    });

    const input = screen.getByLabelText(/etichetta/i) as HTMLInputElement;
    expect(input.value).toBe("Nome");

    fireEvent.change(input, { target: { value: "Nome completo" } });

    expect(screen.getByText("Nome completo")).toBeDefined();
  });
});
