# React Form Schema Builder

Drag-drop builder per form React: componi campi, vedi l'anteprima live,
esporta componente TypeScript o JSON Schema.

Questo file viene letto a ogni run dell'agente. Tienilo sotto le 40 righe.

## Stack

- React 18 + TypeScript, build con Vite
- dnd-kit per il drag-drop, React Hook Form per l'anteprima
- Test: `npm test` (Vitest + React Testing Library)
- Avvio locale: `npm run dev`
- Build: `npm run build`

## Regole

1. Mai push su `main`. Branch, PR, stop.
2. Un compito, una PR. Niente refactor non richiesti.
3. Se il compito e' ambiguo: commenta la domanda sull'issue e fermati.
4. Leggi in modo mirato con Grep e Glob. Non aprire `node_modules`, `dist`,
   `build`, `coverage`, `*.lock`.
5. Nessun segreto nel codice, nemmeno negli esempi.
6. Nessuna dipendenza nuova senza scriverne il motivo nella PR.

## Convenzioni

- Codice e identificatori in inglese, commenti in italiano.
- Commit in forma imperativa, una riga.
- Componenti in `src/`, un file per componente. Logica di trasformazione
  schema/codegen separata dai componenti UI (es. `src/schema/`).
- Ogni campo del form e' un tipo discriminato (`type: "text" | "select" | ...`).

## Fatto quando

Una PR e' pronta se: `npm test` e `npm run build` passano, il README
riflette le novita', e un'immagine o un output di esempio mostra il
risultato.
