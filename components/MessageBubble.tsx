"use client";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  message: Message;
}

const ACTION_TRIGGERS = ["Prepare Proposal", "Show Sample Projects", "Talk To Consultant"];

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  const hasActions = !isUser && ACTION_TRIGGERS.some((t) => message.content.includes(t));

  return (
    <div
      className={`flex items-start gap-3 animate-slide-up ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-navy-700 border border-gold-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-gold-400 text-xs font-bold">SEA</span>
        </div>
      )}

      <div className={`max-w-[78%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "chat-bubble-user rounded-tr-sm"
              : "chat-bubble-assistant rounded-tl-sm"
          }`}
        >
          {isUser
            ? message.content
            : message.content
                .replace(/(Prepare Proposal|Show Sample Projects|Talk To Consultant)/g, "")
                .replace(/🟢\s*/g, "")
                .trim()}
        </div>

        {hasActions && (
          <div className="flex flex-wrap gap-2 ml-1">
            {ACTION_TRIGGERS.filter((t) => message.content.includes(t)).map((label) => (
              <button key={label} className="action-btn">
                {label === "Prepare Proposal" && "📋 "}
                {label === "Show Sample Projects" && "🖥️ "}
                {label === "Talk To Consultant" && "💬 "}
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
