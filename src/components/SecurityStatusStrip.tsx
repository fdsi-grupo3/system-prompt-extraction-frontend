const CONTROLS = ["Prompt Hardening", "Input Guard", "Output Filter"];

/** Franja informativa que muestra qué controles de la arquitectura Secure están activos. */
export default function SecurityStatusStrip() {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-xs dark:border-neutral-800 dark:bg-neutral-900">
      <span className="font-medium text-neutral-500 dark:text-neutral-400">Arquitectura Secure ·</span>
      {CONTROLS.map((label) => (
        <span
          key={label}
          className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {label}
        </span>
      ))}
    </div>
  );
}
