import type { ChatMessage } from "../types/chat";
import SecurityBadge from "./SecurityBadge";

/** Burbuja de un mensaje individual, con estilo distinto para usuario/asistente/bloqueado/error. */
export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  const bubbleClasses = isUser
    ? "bg-violet-600 text-white"
    : message.error
      ? "border border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200"
      : message.blocked
        ? "border border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
        : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${bubbleClasses}`}
      >
        <p>{message.content}</p>

        {!isUser && message.blocked && <SecurityBadge blockedBy={message.blockedBy} />}

        {!isUser && !message.error && typeof message.latencyMs === "number" && (
          <p className="mt-1 text-[11px] opacity-60">{message.latencyMs} ms</p>
        )}
      </div>
    </div>
  );
}
