import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/chat";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import SecurityStatusStrip from "./SecurityStatusStrip";

interface ChatWindowProps {
  messages: ChatMessage[];
  isSending: boolean;
  onSend: (text: string) => void;
}

/** Contenedor del chat: franja de estado de seguridad, historial y caja de entrada. */
export default function ChatWindow({ messages, isSending, onSend }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <SecurityStatusStrip />

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className="mt-8 text-center text-sm text-neutral-400">
            Escribe un mensaje para comenzar. Prueba una consulta legítima (ej. "¿cuál es el horario
            de atención?") o un intento de extracción del system prompt para ver los controles en
            acción.
          </p>
        )}

        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-neutral-100 px-4 py-2.5 text-sm text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              Escribiendo…
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={onSend} disabled={isSending} />
    </div>
  );
}
