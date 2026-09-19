import { useCallback, useRef, useState } from "react";
import { ChatServiceError, sendChatMessage } from "../api/chatService";
import type { ChatMessage } from "../types/chat";

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Maneja el historial de mensajes y la comunicación con el backend.
 * La sesión se identifica con un UUID generado una vez por carga de la app,
 * para que el backend pueda agrupar los logs de intentos de extracción.
 */
export function useChat() {
  const sessionIdRef = useRef<string>(createId());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      const userMessage: ChatMessage = {
        id: createId(),
        role: "user",
        content: trimmed,
        blocked: false,
        blockedBy: null,
        error: false,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsSending(true);

      try {
        const response = await sendChatMessage({
          message: trimmed,
          sessionId: sessionIdRef.current,
        });

        const assistantMessage: ChatMessage = {
          id: createId(),
          role: "assistant",
          content: response.reply,
          blocked: response.blocked,
          blockedBy: response.blockedBy,
          error: response.error,
          latencyMs: response.latencyMs,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const message =
          err instanceof ChatServiceError
            ? err.message
            : "Error inesperado al contactar el backend.";

        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: "assistant",
            content: message,
            blocked: false,
            blockedBy: null,
            error: true,
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [isSending],
  );

  return { messages, isSending, send };
}
