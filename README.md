# React Form Schema Builder

Drag-drop builder per form React: componi campi (text, select, checkbox,
date), vedi l'anteprima live e valida, ed esporta il risultato come
componente TypeScript pronto da incollare oppure come JSON Schema
(con validazione OpenAPI).

Per chi costruisce spesso form simili e non vuole riscrivere ogni volta
state, validation e binding a mano.

## Stack

- React + TypeScript, build con Vite
- [dnd-kit](https://dndkit.com/) per il drag-drop
- [React Hook Form](https://react-hook-form.com/) per l'anteprima con validazione
- Generazione JSON Schema e codegen TypeScript
- Test: Vitest + React Testing Library

## Avvio in locale

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

## Palette e canvas

`FieldPalette` mostra un elemento trascinabile per ogni tipo di campo
(text, select, checkbox, date). Trascinandolo su `FormCanvas` viene
aggiunto un nuovo campo allo stato del form; i campi gia' presenti nel
canvas si possono riordinare trascinandoli tra loro. Il collegamento tra
palette e canvas avviene in `App.tsx` tramite un `DndContext` di dnd-kit.

Esempio di stato di `useFormBuilder` dopo aver trascinato un campo
"Testo" dalla palette al canvas:

```json
[
  { "id": "3f9b...", "type": "text", "label": "Nuovo campo text", "required": false }
]
```

## Esporta codice

`CodeExport` mostra due tab con syntax highlight (via
[prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer)):
il componente React/TypeScript generato da `fieldsToComponentCode`
(gia' cablato con `react-hook-form`) e il JSON Schema equivalente
generato da `fieldsToJsonSchema`. Un pulsante "Copia" copia negli
appunti il codice del tab attivo.

## Screenshot

_(da aggiungere)_ Lo screenshot dovrebbe mostrare il layout a due colonne
dell'app con almeno un paio di campi gia' aggiunti al form: a sinistra la
palette dei campi disponibili sopra il canvas con i campi trascinati (uno
selezionato, per mostrare l'evidenziazione); a destra, dall'alto in basso,
il pannello delle proprieta' del campo selezionato, l'anteprima live del
form compilabile e la sezione di esportazione con le tab "Componente" /
"JSON Schema" e il relativo codice con syntax highlight.
