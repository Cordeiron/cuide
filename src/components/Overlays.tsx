import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Home,
  Trophy,
  Volume2,
  VolumeX,
  Trash2,
  ArrowLeft,
} from 'lucide-react';
import { ENDINGS_INFO } from '../data/challenges';
import { EndingType, RunSummary, StoredRecords } from '../types/game';
import { EggCharacter } from './EggCharacter';

/* ---------------- PAUSE SCREEN ---------------- */
interface PauseScreenProps {
  hp: number;
  score: number;
  level: number;
  levelTitle: string;
  challengeIndex: number;
  totalChallenges: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onResume: () => void;
  onRequestRestart: () => void;
  onGoHome: () => void;
}

export const PauseScreen: React.FC<PauseScreenProps> = ({
  hp,
  score,
  level,
  levelTitle,
  challengeIndex,
  totalChallenges,
  isMuted,
  onToggleMute,
  onResume,
  onRequestRestart,
  onGoHome,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100dvh-76px)]">
      <div className="w-full bg-white rounded-[32px] border-3 border-[#6D4C41] shadow-[0_14px_34px_rgba(109,76,65,0.14)] p-6 sm:p-8 text-center space-y-6 animate-pop-in">
        <div className="flex justify-center">
          <EggCharacter mood="chill" hp={hp} size="sm" />
        </div>

        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#6D4C41] bg-[#FFF3B0] px-3 py-1 rounded-xl border border-[#FFD166]">
            Jogo Pausado
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#4A342E] mt-2">
            Respira fundo, Rebeca! ☕
          </h2>
          <p className="text-sm font-bold text-[#6D4C41] mt-1">
            O ovo está esperando você voltar pra protegê-lo.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-[#FFFDF7] border-2 border-[#F3E5D8] rounded-2xl p-3 text-center">
          <div>
            <p className="text-[11px] font-bold text-[#6D4C41]">Vida</p>
            <p className="font-mono-nums font-bold text-lg text-[#4A342E]">{hp}%</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#6D4C41]">Pontos</p>
            <p className="font-mono-nums font-bold text-lg text-[#4A342E]">{score}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#6D4C41]">Progresso</p>
            <p className="font-mono-nums font-bold text-lg text-[#4A342E]">
              {challengeIndex}/{totalChallenges}
            </p>
          </div>
        </div>

        <p className="text-xs font-bold text-[#6D4C41]">
          Nível {level} · {levelTitle}
        </p>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onResume}
            className="w-full min-h-[54px] py-3 px-5 rounded-2xl bg-[#52B788] hover:bg-[#40916C] text-white font-display font-bold text-lg border-3 border-[#4A342E] shadow-[0_4px_0_#4A342E] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5" />
            <span>Continuar Cuidando</span>
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            className="w-full min-h-[48px] py-2.5 px-5 rounded-2xl bg-[#FFFDF7] hover:bg-[#FFF3B0] text-[#4A342E] font-bold text-sm border-2 border-[#6D4C41] flex items-center justify-center gap-2 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isMuted ? 'Ativar Efeitos Sonoros' : 'Silenciar Efeitos Sonoros'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onRequestRestart}
              className="min-h-[48px] py-2.5 px-4 rounded-2xl bg-[#FFD6E0] hover:bg-[#FFC2D1] text-[#9B2242] font-bold text-sm border-2 border-[#6D4C41] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>
            <button
              type="button"
              onClick={onGoHome}
              className="min-h-[48px] py-2.5 px-4 rounded-2xl bg-[#F3E5D8] hover:bg-[#E6D2C0] text-[#4A342E] font-bold text-sm border-2 border-[#6D4C41] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Início</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- RESTART SCREEN ---------------- */
interface RestartScreenProps {
  onConfirmRestart: () => void;
  onCancelRestart: () => void;
}

export const RestartScreen: React.FC<RestartScreenProps> = ({
  onConfirmRestart,
  onCancelRestart,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100dvh-76px)]">
      <div className="w-full bg-white rounded-[32px] border-3 border-[#6D4C41] shadow-[0_14px_34px_rgba(109,76,65,0.14)] p-6 sm:p-8 text-center space-y-6 animate-pop-in">
        <div className="flex justify-center">
          <EggCharacter mood="scared" hp={65} size="sm" />
        </div>

        <div className="space-y-2">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#4A342E]">
            RECOMEÇAR A MISSÃO? 🔄
          </h2>
          <p className="text-sm sm:text-base font-bold text-[#6D4C41]">
            Rebeca, o ovo atual vai ficar olhando com cara de confuso se você trocar ele por um novo!
          </p>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onConfirmRestart}
            className="w-full min-h-[54px] py-3 px-5 rounded-2xl bg-[#FF8FA3] hover:bg-[#FF758F] text-white font-display font-bold text-lg border-3 border-[#6D4C41] shadow-[0_4px_0_#6D4C41] cursor-pointer"
          >
            Sim, começar nova partida! 🥚
          </button>
          <button
            type="button"
            onClick={onCancelRestart}
            className="w-full min-h-[48px] py-3 px-5 rounded-2xl bg-[#FFFDF7] hover:bg-[#FFF3B0] text-[#4A342E] font-bold text-sm sm:text-base border-2 border-[#6D4C41] cursor-pointer"
          >
            Não, voltar pro ovo atual
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- RESULT SCREEN ---------------- */
interface ResultScreenProps {
  run: RunSummary;
  isNewBestScore: boolean;
  onPlayAgain: () => void;
  onOpenRecords: () => void;
  onGoHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  run,
  isNewBestScore,
  onPlayAgain,
  onOpenRecords,
  onGoHome,
}) => {
  const info = ENDINGS_INFO[run.ending];

  const eggMood =
    run.ending === 'tragic'
      ? 'broken'
      : run.ending === 'legendary'
        ? 'legendary'
        : run.ending === 'perfect'
          ? 'happy'
          : 'relieved';

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-10 flex items-center justify-center min-h-[calc(100dvh-76px)]">
      <div className="w-full bg-white rounded-[32px] border-3 border-[#6D4C41] shadow-[0_14px_34px_rgba(109,76,65,0.14)] p-6 sm:p-9 text-center space-y-6 animate-pop-in relative overflow-hidden">
        {/* Confetti emojis for non-tragic */}
        {run.ending !== 'tragic' && (
          <div className="flex justify-center gap-4 text-2xl opacity-90 select-none">
            <span className="animate-bounce">🎉</span>
            <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>🥚</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>✨</span>
          </div>
        )}

        <div className="flex justify-center">
          <EggCharacter mood={eggMood} hp={run.hpRemaining} size="lg" />
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span
              className={`inline-block text-xs sm:text-sm font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-2xl border-2 ${info.accentBg} ${info.accentText} ${info.borderColor}`}
            >
              {info.badge}
            </span>
            {isNewBestScore && (
              <span className="inline-block text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-2xl bg-[#52B788] text-white border-2 border-[#2D6A4F]">
                NOVO RECORDE! 🏆
              </span>
            )}
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-4xl text-[#4A342E] leading-tight text-balance">
            {info.message}
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#6D4C41] max-w-lg mx-auto">
            {info.subtext}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#FFFDF7] border-2 border-[#F3E5D8] rounded-2xl p-4">
          <div>
            <p className="text-xs font-bold text-[#6D4C41]">Pontuação</p>
            <p className="font-mono-nums font-bold text-xl text-[#4A342E]">{run.score}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-[#6D4C41]">Vida Final</p>
            <p className="font-mono-nums font-bold text-xl text-[#4A342E]">{run.hpRemaining}%</p>
          </div>
          <div>
            <p className="text-xs font-bold text-[#6D4C41]">Desafios</p>
            <p className="font-mono-nums font-bold text-xl text-[#4A342E]">
              {run.challengesCompleted}/{run.totalChallenges}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-[#6D4C41]">Maior Combo</p>
            <p className="font-mono-nums font-bold text-xl text-[#4A342E]">{run.maxStreak}x</p>
          </div>
        </div>

        <p className="text-xs font-bold text-[#6D4C41]">
          Nível alcançado: Nível {run.levelReached} · {run.levelTitle} · Tempo: {run.elapsedSec}s
        </p>

        {/* Actions */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full min-h-[58px] py-3.5 px-6 rounded-2xl bg-[#FF8FA3] hover:bg-[#FF758F] active:scale-[0.98] text-white font-display font-bold text-xl border-3 border-[#6D4C41] shadow-[0_5px_0_#6D4C41] flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Jogar Novamente!</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onOpenRecords}
              className="min-h-[48px] py-2.5 px-4 rounded-2xl bg-[#FFF3B0] hover:bg-[#FFE885] text-[#4A342E] font-bold text-sm border-2 border-[#6D4C41] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>Recordes</span>
            </button>
            <button
              type="button"
              onClick={onGoHome}
              className="min-h-[48px] py-2.5 px-4 rounded-2xl bg-[#FFFDF7] hover:bg-[#F3E5D8] text-[#4A342E] font-bold text-sm border-2 border-[#6D4C41] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Tela Inicial</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- RECORDS SCREEN ---------------- */
interface RecordsScreenProps {
  records: StoredRecords;
  onClearRecords: () => void;
  onBack: () => void;
  onPlayNow: () => void;
}

const ALL_ENDINGS: EndingType[] = ['legendary', 'perfect', 'chaotic', 'tragic'];

export const RecordsScreen: React.FC<RecordsScreenProps> = ({
  records,
  onClearRecords,
  onBack,
  onPlayNow,
}) => {
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8">
      <div className="bg-white rounded-[32px] border-3 border-[#6D4C41] shadow-[0_14px_34px_rgba(109,76,65,0.12)] p-5 sm:p-8 space-y-6 animate-pop-in">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] px-3.5 py-2 rounded-2xl bg-[#FFFDF7] hover:bg-[#FFF3B0] border-2 border-[#6D4C41] font-bold text-sm text-[#4A342E] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-[#4A342E]">
            Recordes da Rebeca 🏆
          </h1>
          <div className="w-16" />
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-3 gap-2.5 bg-[#FFFDF7] border-2 border-[#F3E5D8] rounded-2xl p-4 text-center">
          <div>
            <p className="text-xs font-bold text-[#6D4C41]">Melhor Pontuação</p>
            <p className="font-mono-nums font-bold text-xl sm:text-2xl text-[#4A342E]">
              {records.bestScore}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-[#6D4C41]">Maior Combo</p>
            <p className="font-mono-nums font-bold text-xl sm:text-2xl text-[#4A342E]">
              {records.bestStreak}x
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-[#6D4C41]">Partidas</p>
            <p className="font-mono-nums font-bold text-xl sm:text-2xl text-[#4A342E]">
              {records.totalGames}
            </p>
          </div>
        </div>

        {/* Endings Gallery */}
        <div className="space-y-2.5">
          <h2 className="font-display font-bold text-base sm:text-lg text-[#4A342E]">
            Álbum de Finais ({records.unlockedEndings.length}/4)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ALL_ENDINGS.map((endingKey) => {
              const info = ENDINGS_INFO[endingKey];
              const unlocked = records.unlockedEndings.includes(endingKey);
              return (
                <div
                  key={endingKey}
                  className={`rounded-2xl border-2 p-3.5 transition-all ${
                    unlocked
                      ? `${info.accentBg} ${info.borderColor}`
                      : 'bg-[#FAF5EA] border-[#E4DDD3] opacity-70'
                  }`}
                >
                  <p className="font-display font-bold text-sm text-[#4A342E]">
                    {unlocked ? info.badge : '??? (Ainda bloqueado)'}
                  </p>
                  <p className="text-xs font-semibold text-[#6D4C41] mt-1">
                    {unlocked
                      ? info.title
                      : 'Jogue mais partidas para desbloquear este final!'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Runs */}
        <div className="space-y-2.5">
          <h2 className="font-display font-bold text-base sm:text-lg text-[#4A342E]">
            Histórico Recente
          </h2>
          {records.recentRuns.length === 0 ? (
            <div className="bg-[#FFFDF7] border-2 border-dashed border-[#D8C7BA] rounded-2xl p-6 text-center space-y-3">
              <p className="text-sm font-bold text-[#6D4C41]">
                Nenhuma partida registrada ainda, Rebeca! O ovo está te esperando.
              </p>
              <button
                type="button"
                onClick={onPlayNow}
                className="min-h-[46px] px-5 py-2.5 rounded-2xl bg-[#FF8FA3] hover:bg-[#FF758F] text-white font-display font-bold text-base border-2 border-[#6D4C41] cursor-pointer"
              >
                Jogar Primeira Partida 🥚
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {records.recentRuns.map((run) => {
                const ending = ENDINGS_INFO[run.ending];
                return (
                  <div
                    key={run.id}
                    className="flex items-center justify-between gap-3 bg-[#FFFDF7] border-2 border-[#F3E5D8] rounded-2xl px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-[#4A342E] truncate">{ending.badge}</p>
                      <p className="text-xs font-semibold text-[#6D4C41]">
                        Vida: {run.hpRemaining}% · Desafios: {run.challengesCompleted}/{run.totalChallenges}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono-nums font-bold text-base text-[#4A342E]">
                        {run.score} pts
                      </p>
                      <p className="text-[11px] font-semibold text-[#6D4C41]/80 font-mono-nums">
                        {run.elapsedSec}s
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {records.totalGames > 0 && (
          <div className="pt-2 border-t border-[#F3E5D8] flex flex-wrap items-center justify-between gap-3">
            {!confirmClear ? (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="min-h-[44px] px-3 py-2 text-xs font-bold text-[#9B2242] hover:bg-[#FFE5EC] rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Limpar recordes</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#9B2242]">Apagar tudo?</span>
                <button
                  type="button"
                  onClick={() => {
                    onClearRecords();
                    setConfirmClear(false);
                  }}
                  className="min-h-[40px] px-3 py-1.5 rounded-xl bg-[#FF6B6B] text-white text-xs font-bold cursor-pointer"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="min-h-[40px] px-3 py-1.5 rounded-xl bg-[#F3E5D8] text-[#4A342E] text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onPlayNow}
              className="min-h-[46px] px-5 py-2.5 rounded-2xl bg-[#52B788] hover:bg-[#40916C] text-white font-display font-bold text-sm sm:text-base border-2 border-[#4A342E] cursor-pointer"
            >
              Nova Partida 🥚
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
