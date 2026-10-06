// FDSI-GP-03 · Tipos compartidos del chat institucional (arquitectura Secure).

export type ChatRole = "user" | "assistant";

export type ChatMode = "secure" | "unsecure";

export type BlockedBy = "INPUT_GUARD" | "OUTPUT_FILTER" | null;

/** Mensaje ya renderizado en la UI (incluye metadatos de seguridad para mostrarlos). */
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  blocked: boolean;
  blockedBy: BlockedBy;
  error: boolean;
  latencyMs?: number;
  timestamp: number;
}

/** Payload enviado a POST /api/chat. */
export interface ChatApiRequest {
  message: string;
  sessionId: string;
}

/** Payload devuelto por POST /api/chat (debe reflejar ChatResponse.java del backend). */
export interface ChatApiResponse {
  reply: string;
  blocked: boolean;
  blockedBy: BlockedBy;
  latencyMs: number;
  sessionId: string;
  error: boolean;
}

/** Etapa que detectó/bloqueó un intento, tal como la registra AttackLogService. */
export type AttackLogStage =
  | "INPUT_GUARD_REGEX"
  | "INPUT_GUARD_LLM"
  | "INPUT_GUARD_FALLBACK"
  | "INPUT_GUARD_KEYWORD_COMBO"
  | "OUTPUT_FILTER"
  | "OUTPUT_FILTER_ACCUMULATED"
  | "OUTPUT_FILTER_ML"
  | "OUTPUT_FILTER_ML_ACCUMULATED";

/** Entrada devuelta por GET /api/logs (debe reflejar AttackLogEntry.java del backend). */
export interface AttackLogEntry {
  timestamp: string;
  sessionId: string;
  stage: AttackLogStage;
  contentSnippet: string;
  reason: string;
}
