import React, { useEffect, useRef } from 'react';
import { MessageCircle, CheckCheck, X } from 'lucide-react';
import { ChatMessage } from '../types/game';

interface WhatsAppChatProps {
  messages: ChatMessage[];
  isOwnerTyping?: boolean;
  onQuickReply: (text: string) => void;
  className?: string;
  onCloseMobile?: () => void;
}

const QUICK_REPLIES = [
  'Tá tudo sob controle! 😎',
  'SOCORRO 😂',
  'Ele tá ótimo! ❤️',
];

export const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  messages,
  isOwnerTyping = false,
  onQuickReply,
  className = '',
  onCloseMobile,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOwnerTyping]);

  return (
    <div
      className={`flex flex-col rounded-3xl border-3 border-[#6D4C41] overflow-hidden shadow-[0_8px_24px_rgba(109,76,65,0.12)] bg-[#EFEAE2] ${className}`}
    >
      {/* WhatsApp-style Header */}
      <div className="bg-[#2D6A4F] text-white px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#FFF3B0] border-2 border-white flex items-center justify-center text-xl shrink-0">
            🥚
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-sm sm:text-base leading-tight truncate">
              Dono do Ovo
            </p>
            <p className="text-xs text-[#D8F3DC] truncate">
              {isOwnerTyping ? 'digitando...' : 'online · preocupado'}
            </p>
          </div>
        </div>

        {onCloseMobile ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Fechar conversa"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <MessageCircle className="w-5 h-5 text-[#D8F3DC] shrink-0" aria-hidden="true" />
        )}
      </div>

      {/* Messages Feed */}
      <div
        ref={scrollRef}
        className="bg-whatsapp-cream flex-1 p-3 sm:p-4 space-y-2.5 overflow-y-auto max-h-[340px] lg:max-h-[400px] min-h-[200px]"
      >
        <div className="text-center my-1">
          <span className="text-[11px] font-semibold text-[#6D4C41]/75 bg-white/75 px-3 py-1 rounded-lg">
            Hoje · Missão da Rebeca
          </span>
        </div>

        {messages.map((msg) => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="text-center my-1 animate-pop-in">
                <span className="inline-block text-[11px] font-bold text-[#6D4C41] bg-[#FFF3B0]/90 px-3 py-1 rounded-lg border border-[#FFD166]">
                  {msg.text}
                </span>
              </div>
            );
          }

          const isRebeca = msg.sender === 'rebeca';
          return (
            <div
              key={msg.id}
              className={`flex ${isRebeca ? 'justify-end' : 'justify-start'} animate-pop-in`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 shadow-xs border ${
                  isRebeca
                    ? 'bg-[#DCF8C6] border-[#B7E49C] rounded-tr-xs text-[#2D3A24]'
                    : 'bg-white border-[#E4DDD3] rounded-tl-xs text-[#4A342E]'
                }`}
              >
                {!isRebeca && (
                  <p className="text-[11px] font-extrabold text-[#2D6A4F] mb-0.5">
                    Dono do Ovo
                  </p>
                )}
                <p className="text-sm leading-snug font-semibold break-words">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#6D4C41]/70 font-mono-nums">
                  <span>{msg.time}</span>
                  {isRebeca && <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />}
                </div>
              </div>
            </div>
          );
        })}

        {isOwnerTyping && (
          <div className="flex justify-start animate-pop-in">
            <div className="bg-white border border-[#E4DDD3] rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6D4C41]/60 animate-bounce" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#6D4C41]/60 animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#6D4C41]/60 animate-bounce"
                  style={{ animationDelay: '0.3s' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Reply Bar */}
      <div className="bg-[#F6F2EB] border-t border-[#E4DDD3] p-2.5 flex flex-wrap gap-1.5 shrink-0">
        {QUICK_REPLIES.map((reply) => (
          <button
            key={reply}
            type="button"
            onClick={() => onQuickReply(reply)}
            className="text-xs font-bold bg-white hover:bg-[#FFF3B0] active:scale-95 text-[#4A342E] border-2 border-[#D8C7BA] rounded-xl px-2.5 py-1.5 min-h-[36px] transition-all cursor-pointer whitespace-nowrap"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
};
