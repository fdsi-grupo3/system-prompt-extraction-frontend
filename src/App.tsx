import { useState } from "react";
import AttackLogsPanel from "./components/AttackLogsPanel";
import ChatWindow from "./components/ChatWindow";
import { useChat } from "./hooks/useChat";
import type { ChatMode } from "./types/chat";

function ChatSession({ mode }: { mode: ChatMode }) {
  const { messages, isSending, send } = useChat(mode);
  return <ChatWindow mode={mode} messages={messages} isSending={isSending} onSend={send} />;
}

function App() {
  const [mode, setMode] = useState<ChatMode>("secure");
  const [showLogs, setShowLogs] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  return (
    <div className="flex min-h-dvh flex-col bg-neutral-50 dark:bg-neutral-900">
      <header className="border-b border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              FDSI-GP-03 · Asistente institucional
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Extracción de instrucciones del sistema
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="flex rounded-lg border border-neutral-200 p-1 dark:border-neutral-700"
              role="radiogroup"
              aria-label="Arquitectura activa"
            >
              <button
                type="button"
                role="radio"
                aria-checked={mode === "secure"}
                onClick={() => setMode("secure")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  mode === "secure"
                    ? "bg-emerald-600 text-white"
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                Secure
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={mode === "unsecure"}
                onClick={() => setMode("unsecure")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  mode === "unsecure"
                    ? "bg-red-600 text-white"
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                Unsecure
              </button>
            </div>

            {!showLogs && (
              <button
                type="button"
                onClick={() => setResetCount((n) => n + 1)}
                title="Empezar una conversación nueva en este modo"
                className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Nueva conversación
              </button>
            )}

            <button
              type="button"
              aria-pressed={showLogs}
              onClick={() => setShowLogs((v) => !v)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                showLogs
                  ? "bg-neutral-800 text-white dark:bg-neutral-200 dark:text-neutral-900"
                  : "border border-neutral-200 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
            >
              {showLogs ? "Volver al chat" : "Ver logs"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-4">
        {showLogs ? <AttackLogsPanel /> : <ChatSession key={`${mode}-${resetCount}`} mode={mode} />}
      </main>
    </div>
  );
}

export default App;
