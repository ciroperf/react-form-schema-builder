import { useDraggable } from "@dnd-kit/core";
import { FIELD_TYPES, type FormField } from "../schema/field";

// Prefisso usato per distinguere gli id draggable della palette da quelli
// dei campi gia' presenti nel canvas (che usano l'id del FormField).
export const PALETTE_DRAG_PREFIX = "palette";

const FIELD_TYPE_LABELS: Record<FormField["type"], string> = {
  text: "Testo",
  select: "Select",
  checkbox: "Checkbox",
  date: "Data",
};

interface PaletteItemProps {
  type: FormField["type"];
}

function PaletteItem({ type }: PaletteItemProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `${PALETTE_DRAG_PREFIX}-${type}`,
    data: { source: PALETTE_DRAG_PREFIX, fieldType: type },
  });

  return (
    <li>
      <button type="button" ref={setNodeRef} {...listeners} {...attributes}>
        {FIELD_TYPE_LABELS[type]}
      </button>
    </li>
  );
}

export function FieldPalette() {
  return (
    <aside aria-label="Palette dei campi">
      <h2>Campi disponibili</h2>
      <ul>
        {FIELD_TYPES.map((type) => (
          <PaletteItem key={type} type={type} />
        ))}
      </ul>
    </aside>
  );
}
