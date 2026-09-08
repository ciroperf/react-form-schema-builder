import { useCallback, useState } from "react";
import type { FormField } from "../schema/field";

export function useFormBuilder(initialFields: FormField[] = []) {
  const [fields, setFields] = useState<FormField[]>(initialFields);

  const addField = useCallback((field: FormField) => {
    setFields((prev) => [...prev, field]);
  }, []);

  const removeField = useCallback((id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  }, []);

  const reorderField = useCallback((fromIndex: number, toIndex: number) => {
    setFields((prev) => {
      if (
        fromIndex < 0 ||
        fromIndex >= prev.length ||
        toIndex < 0 ||
        toIndex >= prev.length
      ) {
        return prev;
      }
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const updateField = useCallback(
    (id: string, updates: Partial<FormField>) => {
      setFields((prev) =>
        prev.map((field) =>
          field.id === id ? ({ ...field, ...updates } as FormField) : field,
        ),
      );
    },
    [],
  );

  return { fields, addField, removeField, reorderField, updateField };
}
