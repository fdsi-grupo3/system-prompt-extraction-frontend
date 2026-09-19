import type { ChatApiRequest, ChatApiResponse } from "../types/chat";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

/** Error de comunicación con el backend (red o respuesta HTTP no-2xx). */
export class ChatServiceError extends Error {}

/** Llama a POST /api/chat del backend Spring Boot (arquitectura Secure). */
export async function sendChatMessage(
  payload: ChatApiRequest,
  signal?: AbortSignal,
): Promise<ChatApiResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal,
    });
  } catch {
    throw new ChatServiceError(
      `No se pudo conectar con el backend. Verifica que esté corriendo en ${API_URL}.`,
    );
  }

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const body = (await response.json()) as { message?: string };
      detail = body?.message ?? JSON.stringify(body);
    } catch {
      // el cuerpo no era JSON, se mantiene el statusText
    }
    throw new ChatServiceError(`Error del servidor (${response.status}): ${detail}`);
  }

  return (await response.json()) as ChatApiResponse;
}
