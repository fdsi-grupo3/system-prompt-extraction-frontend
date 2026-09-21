import type { ChatApiRequest, ChatApiResponse, ChatMode } from "../types/chat";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const ENDPOINT_BY_MODE: Record<ChatMode, string> = {
  secure: "/api/chat",
  unsecure: "/api/chat/unsecure",
};

export class ChatServiceError extends Error {}

export async function sendChatMessage(
  payload: ChatApiRequest,
  mode: ChatMode,
  signal?: AbortSignal,
): Promise<ChatApiResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${ENDPOINT_BY_MODE[mode]}`, {
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
