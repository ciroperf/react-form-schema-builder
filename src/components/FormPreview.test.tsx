import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { FormField } from "../schema/field";
import { FormPreview } from "./FormPreview";

const requiredTextField: FormField = {
  id: "email",
  type: "text",
  label: "Email",
  required: true,
};

describe("FormPreview", () => {
  it("mostra un errore di validazione se si invia un campo obbligatorio senza valore", async () => {
    render(<FormPreview fields={[requiredTextField]} />);

    fireEvent.click(screen.getByRole("button", { name: /invia/i }));

    expect(await screen.findByText(/campo obbligatorio/i)).toBeDefined();
  });

  it("non mostra errori se un campo non obbligatorio viene inviato vuoto", async () => {
    const optionalField: FormField = { ...requiredTextField, id: "note", required: false };
    render(<FormPreview fields={[optionalField]} />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /invia/i }));
    });

    expect(screen.queryByText(/campo obbligatorio/i)).toBeNull();
  });
});
