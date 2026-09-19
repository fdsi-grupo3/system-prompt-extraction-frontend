import type { BlockedBy } from "../types/chat";

const LABELS: Record<string, string> = {
  INPUT_GUARD: "Bloqueado por Input Guard",
  OUTPUT_FILTER: "Bloqueado por Output Filter",
};

interface SecurityBadgeProps {
  blockedBy: BlockedBy;
}

/** Insignia roja que indica qué control de la arquitectura Secure bloqueó la interacción. */
export default function SecurityBadge({ blockedBy }: SecurityBadgeProps) {
  if (!blockedBy) return null;

  return (
    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
      <span aria-hidden>⚠️</span>
      {LABELS[blockedBy] ?? "Solicitud bloqueada"}
    </div>
  );
}
