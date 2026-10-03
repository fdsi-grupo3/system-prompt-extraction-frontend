import { useCallback, useEffect, useState } from "react";
import { ChatServiceError, fetchAttackLogs } from "../api/chatService";
import type { AttackLogEntry, AttackLogStage } from "../types/chat";

const STAGE_LABELS: Record<AttackLogStage, string> = {
  INPUT_GUARD_REGEX: "Input Guard · regex",
  INPUT_GUARD_LLM: "Input Guard · clasificador LLM",
  INPUT_GUARD_FALLBACK: "Input Guard · respaldo heurístico",
  OUTPUT_FILTER: "Output Filter",
  OUTPUT_FILTER_ACCUMULATED: "Output Filter · acumulado de sesión",
};

const STAGE_COLORS: Record<AttackLogStage, string> = {
  INPUT_GUARD_REGEX: "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
  INPUT_GUARD_LLM: "border-orange-300 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",
  INPUT_GUARD_FALLBACK: "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-800 dark:border-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300",
  OUTPUT_FILTER: "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
  OUTPUT_FILTER_ACCUMULATED: "border-purple-300 bg-purple-50 text-purple-800 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
};

function formatTimestamp(timestamp: string): string {
  try {
    return new Date(timestamp).toLocaleString();
  } catch {
    return timestamp;
  }
}

/**
 * Panel de auditoría: muestra los últimos intentos de extracción bloqueados por
 * cualquiera de las capas de la arquitectura Secure (GET /api/logs), para apoyar
 * la evaluación del experimento (T01-T06) sin tener que consultar el backend a mano.
 */
export default function AttackLogsPanel() {
  const [logs, setLogs] = useState<AttackLogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAttackLogs(50);
      setLogs(data);
    } catch (err) {
      setError(err instanceof ChatServiceError ? err.message : "Error inesperado al cargar los logs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
          Intentos de extracción bloqueados ({logs.length})
        </h2>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="rounded-md border border-neutral-300 px-3 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          {loading ? "Actualizando…" : "Actualizar"}
        </button>
      </div>

      {error && (
        <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      {!error && !loading && logs.length === 0 && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Todavía no se ha bloqueado ningún intento en esta sesión del backend.
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {logs.map((entry, index) => (
          <li
            key={`${entry.timestamp}-${index}`}
            className="rounded-lg border border-neutral-200 bg-white p-3 text-sm dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
              <span
                className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${STAGE_COLORS[entry.stage]}`}
              >
                {STAGE_LABELS[entry.stage] ?? entry.stage}
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">
                {formatTimestamp(entry.timestamp)} · sesión {entry.sessionId.slice(0, 8)}
              </span>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300">{entry.reason}</p>
            <p className="mt-1 truncate text-xs text-neutral-400 dark:text-neutral-500" title={entry.contentSnippet}>
              "{entry.contentSnippet}"
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
