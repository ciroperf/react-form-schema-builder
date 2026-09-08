import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FormField } from "../schema/field";

// Id del droppable del canvas, usato in App.tsx per riconoscere un drop
// proveniente dalla palette (vedi onDragEnd del DndContext).
export const CANVAS_DROPPABLE_ID = "form-canvas";

interface FormCanvasProps {
  fields: FormField[];
}

interface SortableFieldItemProps {
  field: FormField;
}

function SortableFieldItem({ field }: SortableFieldItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <strong>{field.type}</strong> {field.label}
    </li>
  );
}

export function FormCanvas({ fields }: FormCanvasProps) {
  const { setNodeRef } = useDroppable({ id: CANVAS_DROPPABLE_ID });

  return (
    <section ref={setNodeRef} aria-label="Form in costruzione">
      <h2>Form</h2>
      {fields.length === 0 ? (
        <p>Trascina qui un campo dalla palette.</p>
      ) : (
        <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
          <ul>
            {fields.map((field) => (
              <SortableFieldItem key={field.id} field={field} />
            ))}
          </ul>
        </SortableContext>
      )}
    </section>
  );
}
