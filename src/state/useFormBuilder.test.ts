import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { FormField } from "../schema/field";
import { useFormBuilder } from "./useFormBuilder";

const textField: FormField = {
  id: "1",
  type: "text",
  label: "Nome",
  required: true,
};

const selectField: FormField = {
  id: "2",
  type: "select",
  label: "Paese",
  required: false,
  options: [{ value: "it", label: "Italia" }],
};

describe("useFormBuilder", () => {
  it("starts empty by default", () => {
    const { result } = renderHook(() => useFormBuilder());
    expect(result.current.fields).toEqual([]);
  });

  it("adds a field", () => {
    const { result } = renderHook(() => useFormBuilder());

    act(() => result.current.addField(textField));

    expect(result.current.fields).toEqual([textField]);
  });

  it("removes a field by id", () => {
    const { result } = renderHook(() =>
      useFormBuilder([textField, selectField]),
    );

    act(() => result.current.removeField(textField.id));

    expect(result.current.fields).toEqual([selectField]);
  });

  it("reorders fields", () => {
    const { result } = renderHook(() =>
      useFormBuilder([textField, selectField]),
    );

    act(() => result.current.reorderField(0, 1));

    expect(result.current.fields).toEqual([selectField, textField]);
  });

  it("ignores reorder with out-of-range indexes", () => {
    const { result } = renderHook(() =>
      useFormBuilder([textField, selectField]),
    );

    act(() => result.current.reorderField(0, 5));

    expect(result.current.fields).toEqual([textField, selectField]);
  });

  it("updates a field", () => {
    const { result } = renderHook(() => useFormBuilder([textField]));

    act(() =>
      result.current.updateField(textField.id, { label: "Nome completo" }),
    );

    expect(result.current.fields[0]).toEqual({
      ...textField,
      label: "Nome completo",
    });
  });
});
