import React, { useState } from 'react';
import { EggCharacter } from './EggCharacter';

interface StoryScreenProps {
  onStartMission: (choice: 'claro' | 'duvida') => void;
  onBack: () => void;
  onSoundClick: () => void;
}

export const StoryScreen: React.FC<StoryScreenProps> = ({
  onStartMission,
  onBack,
  onSoundClick,
}) => {
  const [choice, setChoice] = useState<'claro' | 'duvida' | null>(null);

  const handleSelect = (selected: 'claro' | 'duvida') => {
    onSoundClick();
    setChoice(selected);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center justify-center min-h-[calc(100dvh-76px)]">
      <div className="w-full bg-white rounded-[32px] border-3 border-[#6D4C41] shadow-[0_14px_34px_rgba(109,76,65,0.12)] p-6 sm:p-10 space-y-6 animate-pop-in">
        {!choice ? (
          <>
            <div className="flex flex-col items-center text-center space-y-4">
              <EggCharacter mood="chill" hp={100} size="md" />

              <div className="bg-[#EFEAE2] border-2 border-[#D8C7BA] rounded-3xl p-5 sm:p-6 w-full text-left space-y-2 shadow-xs">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F]">
                  Mensagem do Dono do Ovo
                </p>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#4A342E] leading-tight">
                  REBECA, PRECISO TE PEDIR UMA COISA...
                </h1>
                <p className="text-base sm:text-lg font-bold text-[#6D4C41] pt-1">
                  &ldquo;Você pode cuidar do meu ovo rapidinho? Prometo que não vou demorar!&rdquo;
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleSelect('claro')}
                className="min-h-[58px] py-3.5 px-5 rounded-2xl bg-[#FF8FA3] hover:bg-[#FF758F] active:scale-[0.98] text-white font-display font-bold text-lg border-3 border-[#6D4C41] shadow-[0_5px_0_#6D4C41] active:translate-y-[3px] transition-all cursor-pointer"
              >
                CLARO! ❤️
              </button>
              <button
                type="button"
                onClick={() => handleSelect('duvida')}
                className="min-h-[58px] py-3.5 px-5 rounded-2xl bg-[#FFF3B0] hover:bg-[#FFE885] active:scale-[0.98] text-[#4A342E] font-display font-bold text-base sm:text-lg border-3 border-[#6D4C41] shadow-[0_5px_0_#6D4C41] active:translate-y-[3px] transition-all cursor-pointer"
              >
                NÃO SEI SE É UMA BOA IDEIA...
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={onBack}
                className="text-sm font-bold text-[#6D4C41]/80 hover:text-[#4A342E] underline underline-offset-4 py-2 px-4 cursor-pointer"
              >
                Voltar
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-6 animate-pop-in text-center">
            <div className="flex justify-center">
              <EggCharacter
                mood={choice === 'claro' ? 'happy' : 'scared'}
                hp={100}
                size="md"
              />
            </div>

            <div className="bg-[#FFFDF7] border-2 border-[#FFD166] rounded-3xl p-5 sm:p-6 space-y-3 text-left">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#4A342E] leading-tight">
                {choice === 'claro'
                  ? 'EU SABIA QUE PODIA CONTAR COM VOCÊ, REBECA!'
                  : 'Rebeca, não temos tempo para dúvidas. Você foi a escolhida.'}
              </h2>
              <p className="text-base font-bold text-[#6D4C41]">
                {choice === 'claro'
                  ? 'Você tem o coração puro e reflexos de campeã! Já coloquei meu ovo nas suas mãos. Só preciso resolver um negócio rapidinho...'
                  : 'Tarde demais! Já saí correndo e deixei o ovo aí com você. Se acontecer qualquer coisa com ele, a responsabilidade agora é 100% sua!'}
              </p>

              <div className="pt-2 border-t border-[#F3E5D8] text-sm font-bold text-[#4A342E] space-y-1.5">
                <p>📋 Como funciona a missão:</p>
                <ul className="space-y-1 text-[#6D4C41] text-sm font-semibold">
                  <li>• Sobreviva a 12 imprevistos completamente absurdos.</li>
                  <li>• Aja rápido nos desafios (clicar, segurar, desviar e decidir).</li>
                  <li>• Fique de olho no WhatsApp do dono e não deixe a vida chegar a 0%!</li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onStartMission(choice)}
              className="w-full min-h-[60px] py-4 px-6 rounded-2xl bg-[#52B788] hover:bg-[#40916C] active:scale-[0.98] text-white font-display font-bold text-xl sm:text-2xl border-3 border-[#4A342E] shadow-[0_6px_0_#4A342E] active:translate-y-[3px] transition-all cursor-pointer"
            >
              {choice === 'claro' ? 'PROTEGER O OVO AGORA! 🥚' : 'OKAY, EU CUIDO DO OVO! 😅'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
