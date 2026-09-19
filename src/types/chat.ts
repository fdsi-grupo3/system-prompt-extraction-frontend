// FDSI-GP-03 · Tipos compartidos del chat institucional (arquitectura Secure).

export type ChatRole = "user" | "assistant";

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
