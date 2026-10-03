import type { ChatMode } from "../types/chat";

const CONTROLS = ["Prompt Hardening", "Input Guard", "Output Filter"];

interface SecurityStatusStripProps {
  mode: ChatMode;
}

/**
 * Franja informativa que muestra qué controles están activos para el modo actual.
 * En "unsecure" los tres controles se muestran apagados (gris), porque ese endpoint
 * llama al LLM directamente sin Input Guard ni Output Filter, con el system prompt
 * sin las reglas de SystemPromptService.
 */
export default function SecurityStatusStrip({ mode }: SecurityStatusStripProps) {
  const active = mode === "secure";

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-xs dark:border-neutral-800 dark:bg-neutral-900">
      <span className="font-medium text-neutral-500 dark:text-neutral-400">
        {active ? "Arquitectura Secure ·" : "Arquitectura Unsecure (sin controles) ·"}
      </span>
      {CONTROLS.map((label) => (
        <span
          key={label}
          className={
            active
              ? "inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
              : "inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-neutral-100 px-2 py-0.5 font-medium text-neutral-400 line-through dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500"
          }
        >
          <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-neutral-400"}`} />
          {label}
        </span>
      ))}
    </div>
  );
}
