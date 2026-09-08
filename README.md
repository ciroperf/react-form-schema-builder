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

## Screenshot

_(da aggiungere)_
