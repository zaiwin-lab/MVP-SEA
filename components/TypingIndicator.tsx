"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-navy-700 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
        <span className="text-gold-400 text-xs font-bold">SEA</span>
      </div>
      <div className="chat-bubble-assistant rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-dot"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
