import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import type { FormField } from "../schema/field";
import { fieldsToComponentCode } from "../schema/toComponentCode";
import { fieldsToJsonSchema } from "../schema/toJsonSchema";

interface CodeExportProps {
  fields: FormField[];
}

type Tab = "component" | "schema";

const TABS: { id: Tab; label: string; language: string }[] = [
  { id: "component", label: "Componente", language: "tsx" },
  { id: "schema", label: "JSON Schema", language: "json" },
];

function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <Highlight theme={themes.github} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, lineIndex) => (
            <div key={lineIndex} {...getLineProps({ line })}>
              {line.map((token, tokenIndex) => (
                <span key={tokenIndex} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export function CodeExport({ fields }: CodeExportProps) {
  const [activeTab, setActiveTab] = useState<Tab>("component");
  const [copied, setCopied] = useState(false);

  const componentCode = fieldsToComponentCode(fields);
  const schemaCode = JSON.stringify(fieldsToJsonSchema(fields), null, 2);
  const activeCode = activeTab === "component" ? componentCode : schemaCode;
  const activeLanguage = TABS.find((tab) => tab.id === activeTab)!.language;

  async function handleCopy() {
    await navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section aria-label="Esporta codice">
      <h2>Esporta</h2>
      <div role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button type="button" onClick={handleCopy}>
        {copied ? "Copiato!" : "Copia"}
      </button>
      <CodeBlock code={activeCode} language={activeLanguage} />
    </section>
  );
}
