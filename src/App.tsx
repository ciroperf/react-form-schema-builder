import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { CANVAS_DROPPABLE_ID, FormCanvas } from "./components/FormCanvas";
import { FieldInspector } from "./components/FieldInspector";
import { PALETTE_DRAG_PREFIX, FieldPalette } from "./components/FieldPalette";
import { createField, type FormField } from "./schema/field";
import { useFormBuilder } from "./state/useFormBuilder";

export function App() {
  const { fields, addField, reorderField, updateField, selectedFieldId, selectField } =
    useFormBuilder();
  const selectedField = fields.find((field) => field.id === selectedFieldId);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (active.data.current?.source === PALETTE_DRAG_PREFIX) {
      const fieldType = active.data.current.fieldType as FormField["type"];
      addField(createField(fieldType, crypto.randomUUID()));
      return;
    }

    if (over.id === CANVAS_DROPPABLE_ID || active.id === over.id) {
      return;
    }

    const fromIndex = fields.findIndex((field) => field.id === active.id);
    const toIndex = fields.findIndex((field) => field.id === over.id);
    if (fromIndex === -1 || toIndex === -1) {
      return;
    }
    reorderField(fromIndex, toIndex);
  }

  return (
    <main>
      <h1>React Form Schema Builder</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <FieldPalette />
        <FormCanvas fields={fields} selectedFieldId={selectedFieldId} onSelectField={selectField} />
      </DndContext>
      <FieldInspector field={selectedField} updateField={updateField} />
    </main>
  );
}
