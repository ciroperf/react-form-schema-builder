import { DndContext } from "@dnd-kit/core";
import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { FormField } from "../schema/field";
import { useFormBuilder } from "../state/useFormBuilder";
import { FormCanvas } from "./FormCanvas";

const textField: FormField = {
  id: "f1",
  type: "text",
  label: "Nome",
  required: true,
};

function TestHarness() {
  const { fields, addField } = useFormBuilder();
  return (
    <DndContext>
      <FormCanvas fields={fields} />
      <button type="button" onClick={() => addField(textField)}>
        Aggiungi campo
      </button>
    </DndContext>
  );
}

describe("FormCanvas", () => {
  it("mostra il messaggio vuoto quando non ci sono campi", () => {
    render(<FormCanvas fields={[]} />, { wrapper: DndContext });
    expect(screen.getByText(/trascina qui/i)).toBeDefined();
  });

  it("mostra i campi passati come prop", () => {
    render(<FormCanvas fields={[textField]} />, { wrapper: DndContext });
    expect(screen.getByText("Nome")).toBeDefined();
  });

  it("aggiorna la lista renderizzata quando lo store aggiunge un campo", () => {
    render(<TestHarness />);
    expect(screen.queryByText("Nome")).toBeNull();

    act(() => {
      screen.getByText("Aggiungi campo").click();
    });

    expect(screen.getByText("Nome")).toBeDefined();
  });
});
