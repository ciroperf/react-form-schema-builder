import { describe, expect, it } from "vitest";
import type { FormField } from "./field";
import { fieldsToJsonSchema } from "./toJsonSchema";

describe("fieldsToJsonSchema", () => {
  it("converte un campo text in stringa", () => {
    const fields: FormField[] = [
      { id: "nome", type: "text", label: "Nome", required: false },
    ];
    expect(fieldsToJsonSchema(fields)).toEqual({
      type: "object",
      properties: {
        nome: { type: "string", title: "Nome" },
      },
    });
  });

  it("converte un campo checkbox in booleano", () => {
    const fields: FormField[] = [
      { id: "accetta", type: "checkbox", label: "Accetta", required: false },
    ];
    expect(fieldsToJsonSchema(fields)).toEqual({
      type: "object",
      properties: {
        accetta: { type: "boolean", title: "Accetta" },
      },
    });
  });

  it("converte un campo date in stringa con format date", () => {
    const fields: FormField[] = [
      { id: "nascita", type: "date", label: "Nascita", required: false },
    ];
    expect(fieldsToJsonSchema(fields)).toEqual({
      type: "object",
      properties: {
        nascita: { type: "string", format: "date", title: "Nascita" },
      },
    });
  });

  it("converte un campo select in stringa con enum dalle opzioni", () => {
    const fields: FormField[] = [
      {
        id: "paese",
        type: "select",
        label: "Paese",
        required: false,
        options: [
          { value: "it", label: "Italia" },
          { value: "fr", label: "Francia" },
        ],
      },
    ];
    expect(fieldsToJsonSchema(fields)).toEqual({
      type: "object",
      properties: {
        paese: { type: "string", title: "Paese", enum: ["it", "fr"] },
      },
    });
  });

  it("popola required solo con i campi obbligatori", () => {
    const fields: FormField[] = [
      { id: "nome", type: "text", label: "Nome", required: true },
      { id: "note", type: "text", label: "Note", required: false },
    ];
    expect(fieldsToJsonSchema(fields)).toEqual({
      type: "object",
      properties: {
        nome: { type: "string", title: "Nome" },
        note: { type: "string", title: "Note" },
      },
      required: ["nome"],
    });
  });

  it("omette required quando nessun campo e' obbligatorio", () => {
    const fields: FormField[] = [
      { id: "note", type: "text", label: "Note", required: false },
    ];
    const schema = fieldsToJsonSchema(fields) as { required?: string[] };
    expect(schema.required).toBeUndefined();
  });

  it("gestisce una lista vuota", () => {
    expect(fieldsToJsonSchema([])).toEqual({
      type: "object",
      properties: {},
    });
  });
});
