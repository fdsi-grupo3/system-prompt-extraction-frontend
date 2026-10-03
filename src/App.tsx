import { useState } from "react";
import AttackLogsPanel from "./components/AttackLogsPanel";
import ChatWindow from "./components/ChatWindow";
import { useChat } from "./hooks/useChat";
import type { ChatMode } from "./types/chat";

type View = ChatMode | "logs";

function ChatSession({ mode }: { mode: ChatMode }) {
  const { messages, isSending, send } = useChat(mode);
  return <ChatWindow messages={messages} isSending={isSending} onSend={send} />;
}

function App() {
  const [view, setView] = useState<View>("secure");

  return (
    <div className="flex min-h-dvh flex-col bg-neutral-50 dark:bg-neutral-900">
      <header className="border-b border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              FDSI-GP-03 · Asistente institucional
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Extracción de instrucciones del sistema
            </p>
          </div>

          <div
            className="flex rounded-lg border border-neutral-200 p-1 dark:border-neutral-700"
            role="radiogroup"
            aria-label="Vista activa"
          >
            <button
              type="button"
              role="radio"
              aria-checked={view === "secure"}
              onClick={() => setView("secure")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                view === "secure"
                  ? "bg-emerald-600 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
            >
              Secure
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={view === "unsecure"}
              onClick={() => setView("unsecure")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                view === "unsecure"
                  ? "bg-red-600 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
            >
              Unsecure
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={view === "logs"}
              onClick={() => setView("logs")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                view === "logs"
                  ? "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
            >
              Logs
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-4">
        {view === "logs" ? <AttackLogsPanel /> : <ChatSession key={view} mode={view} />}
      </main>
    </div>
  );
}

export default App;
