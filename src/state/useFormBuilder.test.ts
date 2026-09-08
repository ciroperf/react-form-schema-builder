import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { FormField } from "../schema/field";
import { useFormBuilder } from "./useFormBuilder";

const textField: FormField = {
  id: "f1",
  type: "text",
  label: "Nome",
  required: true,
};

const selectField: FormField = {
  id: "f2",
  type: "select",
  label: "Paese",
  required: false,
  options: [{ value: "it", label: "Italia" }],
};

describe("useFormBuilder", () => {
  it("parte con una lista vuota", () => {
    const { result } = renderHook(() => useFormBuilder());
    expect(result.current.fields).toEqual([]);
  });

  it("aggiunge un campo con addField", () => {
    const { result } = renderHook(() => useFormBuilder());
    act(() => {
      result.current.addField(textField);
    });
    expect(result.current.fields).toEqual([textField]);
  });

  it("rimuove un campo con removeField", () => {
    const { result } = renderHook(() => useFormBuilder([textField, selectField]));
    act(() => {
      result.current.removeField(textField.id);
    });
    expect(result.current.fields).toEqual([selectField]);
  });

  it("riordina i campi con reorderField", () => {
    const thirdField: FormField = {
      id: "f3",
      type: "checkbox",
      label: "Accetto",
      required: true,
    };
    const { result } = renderHook(() => useFormBuilder([textField, selectField, thirdField]));
    act(() => {
      result.current.reorderField(0, 2);
    });
    expect(result.current.fields.map((field) => field.id)).toEqual(["f2", "f3", "f1"]);
  });

  it("aggiorna un campo con updateField", () => {
    const { result } = renderHook(() => useFormBuilder([textField]));
    act(() => {
      result.current.updateField(textField.id, { label: "Nome completo", required: false });
    });
    expect(result.current.fields[0]).toEqual({
      ...textField,
      label: "Nome completo",
      required: false,
    });
  });

  it("seleziona un campo con selectField", () => {
    const { result } = renderHook(() => useFormBuilder([textField, selectField]));
    expect(result.current.selectedFieldId).toBeNull();
    act(() => {
      result.current.selectField(textField.id);
    });
    expect(result.current.selectedFieldId).toBe(textField.id);
  });
});
