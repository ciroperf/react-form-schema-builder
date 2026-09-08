import { describe, expect, it } from "vitest";
import type { FormField } from "./field";
import { fieldsToComponentCode } from "./toComponentCode";

describe("fieldsToComponentCode", () => {
  it("genera un componente con gli input attesi per ogni tipo di campo", () => {
    const fields: FormField[] = [
      { id: "nome", type: "text", label: "Nome", required: true },
      { id: "accetta", type: "checkbox", label: "Accetta", required: false },
      { id: "nascita", type: "date", label: "Nascita", required: false },
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

    const code = fieldsToComponentCode(fields);

    expect(code).toContain("useForm<FormValues>()");
    expect(code).toContain("handleSubmit(onSubmit)");
    expect(code).toContain('<input type="text" {...register("nome", { required: "Campo obbligatorio" })} />');
    expect(code).toContain('<input type="checkbox" {...register("accetta", {})} />');
    expect(code).toContain('<input type="date" {...register("nascita", {})} />');
    expect(code).toContain('<select defaultValue="" {...register("paese", {})}>');
    expect(code).toContain('<option value="it">Italia</option>');
    expect(code).toContain('<option value="fr">Francia</option>');
    expect(code).toContain("<button type=\"submit\">Invia</button>");
  });

  it("gestisce una lista vuota", () => {
    const code = fieldsToComponentCode([]);
    expect(code).toContain("interface FormValues {\n\n}");
    expect(code).toContain("useForm<FormValues>()");
  });
});
