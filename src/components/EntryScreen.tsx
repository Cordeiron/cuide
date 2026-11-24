import React from 'react';
import { Trophy } from 'lucide-react';
import { StoredRecords } from '../types/game';
import { EggCharacter, PadlockIllustration } from './EggCharacter';

interface EntryScreenProps {
  records: StoredRecords;
  onEnter: () => void;
  onOpenRecords: () => void;
}

export const EntryScreen: React.FC<EntryScreenProps> = ({
  records,
  onEnter,
  onOpenRecords,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center justify-center min-h-[calc(100dvh-76px)]">
      <div className="w-full bg-white rounded-[32px] border-3 border-[#6D4C41] shadow-[0_14px_34px_rgba(109,76,65,0.12)] p-6 sm:p-10 text-center space-y-6 animate-pop-in relative overflow-hidden">
        {/* Soft pastel corner accents */}
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#FFD6E0]/55 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#FFF3B0]/70 pointer-events-none" />

        {/* Decorative Padlock + Egg Hero */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#FFF3B0] border-2 border-[#6D4C41] rounded-2xl px-3.5 py-1.5 mb-4 shadow-xs">
            <PadlockIllustration className="w-6 h-6" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6D4C41]">
              Acesso exclusivo · Sem senha!
            </span>
          </div>

          <EggCharacter mood="happy" hp={100} size="lg" />
        </div>

        {/* Texts */}
        <div className="relative z-10 space-y-2.5">
          <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#4A342E] leading-tight text-balance">
            OPA! ESSE OVO TEM DONA! 🥚
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#6D4C41] max-w-md mx-auto">
            Este desafio foi preparado especialmente para a Rebeca.
          </p>
        </div>

        {/* Main CTA */}
        <div className="relative z-10 space-y-3 pt-2">
          <button
            type="button"
            onClick={onEnter}
            className="w-full min-h-[60px] py-4 px-6 rounded-2xl bg-[#FF8FA3] hover:bg-[#FF758F] active:scale-[0.98] text-white font-display font-bold text-xl sm:text-2xl border-3 border-[#6D4C41] shadow-[0_6px_0_#6D4C41] active:shadow-[0_2px_0_#6D4C41] active:translate-y-[4px] transition-all cursor-pointer"
          >
            SOU A REBECA ❤️
          </button>

          <button
            type="button"
            onClick={onOpenRecords}
            className="w-full min-h-[48px] py-3 px-5 rounded-2xl bg-[#FFFDF7] hover:bg-[#FFF3B0] text-[#4A342E] font-bold text-sm sm:text-base border-2 border-[#D8C7BA] flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-[#E09F3E]" />
            <span>
              Recordes da Rebeca
              {records.bestScore > 0 ? ` · Melhor: ${records.bestScore} pts` : ''}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
