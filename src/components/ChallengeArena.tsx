import React from 'react';
import { ActiveChallenge, ChoiceOption, EggMood, FloatingFeedback } from '../types/game';
import { EggCharacter } from './EggCharacter';
import { ThreatIllustration } from './ThreatIllustration';

interface ChallengeArenaProps {
  hp: number;
  eggMood: EggMood;
  activeChallenge: ActiveChallenge | null;
  calmMessage: string;
  isHolding: boolean;
  dodgeOffset: 'left' | 'right' | null;
  floatingFeedbacks: FloatingFeedback[];
  onMashTap: () => void;
  onHoldStart: () => void;
  onHoldEnd: () => void;
  onTargetHit: (targetId: number) => void;
  onDodge: (direction: 'left' | 'right') => void;
  onChoiceSelect: (option: ChoiceOption) => void;
}

export const ChallengeArena: React.FC<ChallengeArenaProps> = ({
  hp,
  eggMood,
  activeChallenge,
  calmMessage,
  isHolding,
  dodgeOffset,
  floatingFeedbacks,
  onMashTap,
  onHoldStart,
  onHoldEnd,
  onTargetHit,
  onDodge,
  onChoiceSelect,
}) => {
  const def = activeChallenge?.definition;

  // Determine shield overlay on egg when holding
  let shieldActive: 'rain' | 'sun' | 'wind' | 'care' | null = null;
  if (activeChallenge && isHolding && !activeChallenge.resolved) {
    if (def?.visual === 'rain') shieldActive = 'rain';
    if (def?.visual === 'sun') shieldActive = 'sun';
    if (def?.visual === 'wind') shieldActive = 'wind';
    if (def?.visual === 'care') shieldActive = 'care';
  }

  const timePct = activeChallenge
    ? Math.max(0, Math.min(100, (activeChallenge.timeLeftSec / activeChallenge.totalTimeSec) * 100))
    : 100;

  const isUrgent = activeChallenge ? activeChallenge.timeLeftSec <= 2.2 && !activeChallenge.resolved : false;

  return (
    <div className="relative bg-white rounded-[28px] border-3 border-[#6D4C41] shadow-[0_10px_28px_rgba(109,76,65,0.12)] p-4 sm:p-6 flex flex-col justify-between min-h-[470px] sm:min-h-[520px] overflow-hidden select-none">
      {/* Rain visual effect when raining */}
      {def?.visual === 'rain' && !activeChallenge?.resolved && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-60">
          {[12, 24, 38, 52, 66, 80, 90].map((leftPct, i) => (
            <div
              key={leftPct}
              className="absolute top-0 w-1 h-5 rounded-full bg-[#7EC8E3] animate-rain-drop"
              style={{
                left: `${leftPct}%`,
                animationDelay: `${i * 0.14}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun heat tint */}
      {def?.visual === 'sun' && !activeChallenge?.resolved && (
        <div className="absolute inset-0 bg-[#FFF3B0]/35 pointer-events-none z-0" />
      )}

      {/* Floating Score / Feedback Popups */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {floatingFeedbacks.map((fb) => (
          <div
            key={fb.id}
            className={`absolute font-display font-bold text-base sm:text-lg px-2.5 py-0.5 rounded-xl animate-float-up shadow-xs ${
              fb.tone === 'bad'
                ? 'bg-[#FF6B6B] text-white'
                : fb.tone === 'bonus'
                  ? 'bg-[#FFD166] text-[#4A342E]'
                  : 'bg-[#52B788] text-white'
            }`}
            style={{ left: `${fb.x}%`, top: `${fb.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            {fb.text}
          </div>
        ))}
      </div>

      {/* TOP AREA: Challenge Header & Timer Bar */}
      <div className="relative z-10">
        {activeChallenge ? (
          <div className="space-y-2.5 animate-pop-in">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wide px-3 py-1 rounded-xl bg-[#FFD6E0] text-[#9B2242] border-2 border-[#FF8FA3]">
                {def?.emoji} Desafio {activeChallenge.challengeNumber}
              </span>
              <span
                className={`font-mono-nums font-bold text-sm sm:text-base px-3 py-1 rounded-xl border-2 ${
                  isUrgent
                    ? 'bg-[#FF6B6B] text-white border-[#C92A2A] animate-pulse'
                    : 'bg-[#FFF3B0] text-[#4A342E] border-[#FFD166]'
                }`}
              >
                ⏱️ {activeChallenge.timeLeftSec.toFixed(1)}s
              </span>
            </div>

            {/* Challenge Countdown Bar */}
            <div className="w-full h-3 bg-[#F3E5D8] rounded-full overflow-hidden border border-[#D8C7BA]">
              <div
                className={`h-full transition-all duration-75 rounded-full ${
                  isUrgent ? 'bg-[#FF6B6B]' : 'bg-[#FFB703]'
                }`}
                style={{ width: `${timePct}%` }}
              />
            </div>

            <div className="text-center pt-1">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#4A342E] leading-tight">
                {def?.title}
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#6D4C41] mt-1 max-w-lg mx-auto">
                {def?.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-3 animate-pop-in">
            <span className="inline-block text-xs font-extrabold uppercase tracking-wide px-3 py-1 rounded-xl bg-[#D8F3DC] text-[#2D6A4F] border-2 border-[#95D5B2]">
              Respirando fundo...
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#4A342E] mt-2">
              {calmMessage}
            </h2>
            <p className="text-sm font-semibold text-[#6D4C41] mt-1">
              Fique atenta, Rebeca! O próximo imprevisto pode surgir a qualquer segundo...
            </p>
          </div>
        )}
      </div>

      {/* CENTER STAGE: Egg + Threat + Multi-Targets */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-3 min-h-[210px]">
        <div className="flex items-center justify-center gap-3 sm:gap-8">
          <EggCharacter
            mood={eggMood}
            hp={hp}
            shieldActive={shieldActive}
            dodgeOffset={dodgeOffset}
            size="md"
          />

          {activeChallenge && !activeChallenge.resolved && def && def.mechanic !== 'targets' && (
            <div className="animate-pop-in">
              <ThreatIllustration visual={def.visual} dangerSide={activeChallenge.dangerSide} />
            </div>
          )}
        </div>

        {/* Multi-Target Floating Critters Overlay */}
        {activeChallenge &&
          !activeChallenge.resolved &&
          def?.mechanic === 'targets' &&
          activeChallenge.targets.map((target) =>
            target.hit ? null : (
              <button
                key={target.id}
                type="button"
                onClick={() => onTargetHit(target.id)}
                style={{ left: `${target.x}%`, top: `${target.y}%`, transform: 'translate(-50%, -50%)' }}
                className="absolute z-20 min-w-[58px] min-h-[58px] sm:min-w-[64px] sm:min-h-[64px] rounded-full bg-white/95 border-3 border-[#6D4C41] shadow-md hover:scale-110 active:scale-90 transition-transform flex flex-col items-center justify-center cursor-pointer animate-egg-wobble"
                aria-label={def.targetLabel || 'Espantar'}
              >
                <span className="text-2xl sm:text-3xl leading-none">{def.targetEmoji}</span>
                <span className="text-[10px] font-extrabold text-[#9B2242] leading-none mt-0.5">
                  TOCA!
                </span>
              </button>
            )
          )}

        {/* Outcome Banner Overlay */}
        {activeChallenge?.resolved && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-3">
            <div
              className={`px-5 py-4 rounded-3xl border-3 shadow-lg text-center max-w-md animate-pop-in ${
                activeChallenge.outcome === 'success'
                  ? 'bg-[#D8F3DC] border-[#2D6A4F] text-[#1B4332]'
                  : 'bg-[#FFE5EC] border-[#C92A2A] text-[#7A1C24]'
              }`}
            >
              <p className="font-display font-bold text-lg sm:text-xl">
                {activeChallenge.outcome === 'success' ? 'MANDOU BEM, REBECA! ✨' : 'AI AI AI, REBECA! 💥'}
              </p>
              <p className="text-sm font-bold mt-1">{activeChallenge.outcomeText}</p>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM THUMB-ZONE: Interactive Controls */}
      <div className="relative z-20 pt-2">
        {activeChallenge && !activeChallenge.resolved && def && (
          <div className="space-y-2.5">
            <p className="text-center text-xs font-extrabold uppercase tracking-wider text-[#6D4C41]">
              {def.actionHint}
            </p>

            {/* MASH MECHANIC */}
            {def.mechanic === 'mash' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#6D4C41] px-1">
                  <span>Progresso</span>
                  <span className="font-mono-nums">
                    {activeChallenge.tapsDone} / {activeChallenge.tapsRequired} toques
                  </span>
                </div>
                <div className="w-full h-3.5 bg-[#F3E5D8] rounded-full overflow-hidden border border-[#D8C7BA]">
                  <div
                    className="h-full bg-[#52B788] transition-all duration-75 rounded-full"
                    style={{ width: `${activeChallenge.progress}%` }}
                  />
                </div>
                <button
                  type="button"
                  onClick={onMashTap}
                  className="w-full min-h-[60px] py-3.5 px-6 rounded-2xl bg-[#FF8FA3] hover:bg-[#FF758F] active:scale-[0.96] text-white font-display font-bold text-lg sm:text-xl border-3 border-[#6D4C41] shadow-[0_5px_0_#6D4C41] active:shadow-[0_2px_0_#6D4C41] active:translate-y-[3px] transition-all cursor-pointer"
                >
                  {def.actionButtonLabel}
                </button>
              </div>
            )}

            {/* HOLD MECHANIC */}
            {def.mechanic === 'hold' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#6D4C41] px-1">
                  <span>{isHolding ? 'Segurando firme! Não solta!' : 'Pressione e segure!'}</span>
                  <span className="font-mono-nums">
                    {activeChallenge.holdElapsedSec.toFixed(1)}s / {activeChallenge.holdRequiredSec.toFixed(1)}s
                  </span>
                </div>
                <div className="w-full h-3.5 bg-[#F3E5D8] rounded-full overflow-hidden border border-[#D8C7BA]">
                  <div
                    className="h-full bg-[#7EC8E3] transition-all duration-75 rounded-full"
                    style={{ width: `${activeChallenge.progress}%` }}
                  />
                </div>
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    onHoldStart();
                  }}
                  onPointerUp={onHoldEnd}
                  onPointerLeave={onHoldEnd}
                  onPointerCancel={onHoldEnd}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') onHoldStart();
                  }}
                  onKeyUp={onHoldEnd}
                  className={`w-full min-h-[60px] py-3.5 px-6 rounded-2xl font-display font-bold text-lg sm:text-xl border-3 border-[#6D4C41] transition-all cursor-pointer touch-none ${
                    isHolding
                      ? 'bg-[#52B788] text-white translate-y-[3px] shadow-[0_2px_0_#6D4C41]'
                      : 'bg-[#FFD166] hover:bg-[#FFC233] text-[#4A342E] shadow-[0_5px_0_#6D4C41]'
                  }`}
                >
                  {isHolding ? 'SEGURANDO... 💪' : def.actionButtonLabel}
                </button>
              </div>
            )}

            {/* TARGETS MECHANIC STATUS */}
            {def.mechanic === 'targets' && (
              <div className="space-y-2 text-center">
                <div className="inline-flex items-center gap-2 bg-[#FFF3B0] border-2 border-[#FFD166] rounded-2xl px-4 py-2 font-bold text-sm text-[#4A342E]">
                  <span>Restantes na tela:</span>
                  <span className="font-mono-nums text-base">
                    {activeChallenge.targets.filter((t) => !t.hit).length} / {activeChallenge.targets.length}
                  </span>
                </div>
              </div>
            )}

            {/* DODGE MECHANIC */}
            {def.mechanic === 'dodge' && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onDodge('left')}
                  className="min-h-[60px] py-3.5 px-4 rounded-2xl bg-[#D6EEFF] hover:bg-[#BAE0FF] active:scale-[0.96] text-[#1D4E73] font-display font-bold text-base sm:text-lg border-3 border-[#6D4C41] shadow-[0_4px_0_#6D4C41] active:translate-y-[2px] transition-all cursor-pointer"
                >
                  ⬅️ ESQUERDA
                </button>
                <button
                  type="button"
                  onClick={() => onDodge('right')}
                  className="min-h-[60px] py-3.5 px-4 rounded-2xl bg-[#FFD6E0] hover:bg-[#FFC2D1] active:scale-[0.96] text-[#9B2242] font-display font-bold text-base sm:text-lg border-3 border-[#6D4C41] shadow-[0_4px_0_#6D4C41] active:translate-y-[2px] transition-all cursor-pointer"
                >
                  DIREITA ➡️
                </button>
              </div>
            )}

            {/* CHOICE MECHANIC */}
            {def.mechanic === 'choice' && def.choices && (
              <div className="grid grid-cols-1 gap-2">
                {def.choices.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChoiceSelect(opt)}
                    className="w-full min-h-[48px] py-2.5 px-4 rounded-2xl bg-[#FFFDF7] hover:bg-[#FFF3B0] active:scale-[0.98] text-[#4A342E] font-bold text-sm sm:text-base border-2 border-[#6D4C41] shadow-[0_3px_0_#6D4C41] active:translate-y-[2px] transition-all text-left cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!activeChallenge && (
          <div className="text-center text-xs font-bold text-[#6D4C41]/75 py-2">
            Dica: você também pode responder o Dono no chat! 💬
          </div>
        )}
      </div>
    </div>
  );
};
