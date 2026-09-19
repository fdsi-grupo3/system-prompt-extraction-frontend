import ChatWindow from "./components/ChatWindow";
import { useChat } from "./hooks/useChat";

// FDSI-GP-03 · Extracción de instrucciones del sistema
// Interfaz de chat contra la arquitectura Secure del backend (/api/chat):
// Prompt Hardening + Input Guard + Output Filter.

function App() {
  const { messages, isSending, send } = useChat();

  return (
    <div className="flex min-h-dvh flex-col bg-neutral-50 dark:bg-neutral-900">
      <header className="border-b border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          FDSI-GP-03 · Asistente institucional
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Extracción de instrucciones del sistema — arquitectura Secure
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-4">
        <ChatWindow messages={messages} isSending={isSending} onSend={send} />
      </main>
    </div>
  );
}

export default App;
