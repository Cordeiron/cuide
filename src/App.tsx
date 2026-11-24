import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, Pause, RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react';
import { ChallengeArena } from './components/ChallengeArena';
import { EntryScreen } from './components/EntryScreen';
import {
  PauseScreen,
  RecordsScreen,
  RestartScreen,
  ResultScreen,
} from './components/Overlays';
import { StoryScreen } from './components/StoryScreen';
import { WhatsAppChat } from './components/WhatsAppChat';
import {
  TOTAL_CHALLENGES_PER_RUN,
  buildChallengePlaylist,
  createActiveChallenge,
  determineEnding,
  getLevelForChallenge,
  OWNER_BAD_REACTIONS,
  OWNER_GENERIC_QUESTIONS,
  OWNER_GOOD_REACTIONS,
  OWNER_NEAR_END_MESSAGE,
} from './data/challenges';
import {
  ActiveChallenge,
  ChallengeDefinition,
  ChatMessage,
  ChoiceOption,
  EggMood,
  FloatingFeedback,
  RunSummary,
  ScreenState,
  StoredRecords,
} from './types/game';
import { sound } from './utils/sound';
import { clearRecords, loadRecords, saveRunRecord } from './utils/storage';

function formatChatTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

const CALM_MESSAGES = [
  'O ovo deu uma piscadinha feliz para você, Rebeca! 🥚',
  'Silêncio suspeito na vizinhança... fica esperta, Rebeca!',
  'O ovo está quentinho e confortável por enquanto.',
  'Rebeca, seus reflexos estão em dia? LÁ VEM COISA!',
  'Olha a postura de guardiã oficial do ovo! 💪',
];

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('ENTRY');
  const [recordsReturnTo, setRecordsReturnTo] = useState<ScreenState>('ENTRY');
  const [records, setRecords] = useState<StoredRecords>(() => loadRecords());
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.isMuted());

  // Gameplay State
  const [storyChoice, setStoryChoice] = useState<'claro' | 'duvida'>('claro');
  const [hp, setHp] = useState<number>(100);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [challengeCursor, setChallengeCursor] = useState<number>(0); // 0..11 completed/current
  const [playlist, setPlaylist] = useState<ChallengeDefinition[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<ActiveChallenge | null>(null);
  const [calmMessage, setCalmMessage] = useState<string>(CALM_MESSAGES[0]);
  const [eggMood, setEggMood] = useState<EggMood>('happy');
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [dodgeOffset, setDodgeOffset] = useState<'left' | 'right' | null>(null);
  const [floatingFeedbacks, setFloatingFeedbacks] = useState<FloatingFeedback[]>([]);
  const [levelBanner, setLevelBanner] = useState<string | null>(null);

  // WhatsApp Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isOwnerTyping, setIsOwnerTyping] = useState<boolean>(false);
  const [mobileChatOpen, setMobileChatOpen] = useState<boolean>(false);
  const [unreadMobileCount, setUnreadMobileCount] = useState<number>(0);

  // Result State
  const [lastRun, setLastRun] = useState<RunSummary | null>(null);
  const [isNewBestScore, setIsNewBestScore] = useState<boolean>(false);

  // Mutable refs for accurate timer loop without stale closures
  const screenRef = useRef(screen);
  screenRef.current = screen;
  const hpRef = useRef(hp);
  hpRef.current = hp;
  const scoreRef = useRef(score);
  scoreRef.current = score;
  const streakRef = useRef(streak);
  streakRef.current = streak;
  const maxStreakRef = useRef(maxStreak);
  maxStreakRef.current = maxStreak;
  const mistakesRef = useRef(mistakes);
  mistakesRef.current = mistakes;
  const elapsedRef = useRef(elapsedSec);
  elapsedRef.current = elapsedSec;
  const cursorRef = useRef(challengeCursor);
  cursorRef.current = challengeCursor;
  const playlistRef = useRef(playlist);
  playlistRef.current = playlist;
  const activeChallengeRef = useRef(activeChallenge);
  activeChallengeRef.current = activeChallenge;
  const isHoldingRef = useRef(isHolding);
  isHoldingRef.current = isHolding;
  const storyChoiceRef = useRef(storyChoice);
  storyChoiceRef.current = storyChoice;
  const lastLevelNotifiedRef = useRef<number>(1);
  const nextTimeoutRef = useRef<number | null>(null);
  const feedbackIdRef = useRef<number>(1);

  const clearScheduledNext = useCallback(() => {
    if (nextTimeoutRef.current !== null) {
      window.clearTimeout(nextTimeoutRef.current);
      nextTimeoutRef.current = null;
    }
  }, []);

  const addFloatingFeedback = useCallback(
    (text: string, tone: 'good' | 'bad' | 'bonus', x = 50, y = 45) => {
      const id = feedbackIdRef.current++;
      setFloatingFeedbacks((prev) => [...prev, { id, text, tone, x, y }]);
      window.setTimeout(() => {
        setFloatingFeedbacks((prev) => prev.filter((item) => item.id !== id));
      }, 950);
    },
    []
  );

  const pushChatMessage = useCallback(
    (sender: 'owner' | 'rebeca' | 'system', text: string) => {
      const msg: ChatMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        sender,
        text,
        time: formatChatTime(),
      };
      setChatMessages((prev) => [...prev.slice(-24), msg]);
      if (sender === 'owner') {
        sound.playMessagePop();
        setUnreadMobileCount((c) => c + 1);
      }
    },
    []
  );

  const triggerOwnerMessageWithTyping = useCallback(
    (text: string, delayMs = 450) => {
      setIsOwnerTyping(true);
      window.setTimeout(() => {
        setIsOwnerTyping(false);
        pushChatMessage('owner', text);
      }, delayMs);
    },
    [pushChatMessage]
  );

  const finishGame = useCallback(
    (finalHp: number, finalScore: number, completedCount: number) => {
      clearScheduledNext();
      setIsHolding(false);
      isHoldingRef.current = false;
      setActiveChallenge(null);
      activeChallengeRef.current = null;

      const ending = determineEnding(finalHp, finalScore);
      const levelInfo = getLevelForChallenge(Math.max(1, completedCount));

      const summary: RunSummary = {
        id: `${Date.now()}`,
        dateIso: new Date().toISOString(),
        ending,
        score: finalScore,
        hpRemaining: Math.max(0, finalHp),
        challengesCompleted: completedCount,
        totalChallenges: TOTAL_CHALLENGES_PER_RUN,
        maxStreak: maxStreakRef.current,
        elapsedSec: Math.round(elapsedRef.current),
        levelReached: levelInfo.level,
        levelTitle: levelInfo.title,
        storyChoice: storyChoiceRef.current,
      };

      const saved = saveRunRecord(summary);
      setRecords(saved.records);
      setIsNewBestScore(saved.isNewBestScore);
      setLastRun(summary);

      if (ending === 'tragic') {
        sound.playCrack();
      } else {
        sound.playVictory(ending === 'legendary');
      }

      setScreen('RESULT');
    },
    [clearScheduledNext]
  );

  const scheduleNextChallenge = useCallback(
    (nextIdx: number) => {
      clearScheduledNext();
      if (nextIdx >= playlistRef.current.length) {
        finishGame(hpRef.current, scoreRef.current, TOTAL_CHALLENGES_PER_RUN);
        return;
      }

      const nextDef = playlistRef.current[nextIdx];
      const nextNumber = nextIdx + 1;
      const lvl = getLevelForChallenge(nextNumber);

      if (lvl.level > lastLevelNotifiedRef.current) {
        lastLevelNotifiedRef.current = lvl.level;
        sound.playLevelUp();
        setLevelBanner(`SUBIU DE NÍVEL! Nível ${lvl.level}: ${lvl.title} 🌟`);
        pushChatMessage('system', `Nível ${lvl.level} desbloqueado: ${lvl.title}!`);
        window.setTimeout(() => setLevelBanner(null), 2600);
      }

      setCalmMessage(CALM_MESSAGES[Math.floor(Math.random() * CALM_MESSAGES.length)]);

      nextTimeoutRef.current = window.setTimeout(() => {
        if (screenRef.current !== 'PLAYING') return;
        const created = createActiveChallenge(nextDef, nextNumber);
        setActiveChallenge(created);
        activeChallengeRef.current = created;
        setChallengeCursor(nextNumber);
        cursorRef.current = nextNumber;
        setEggMood(nextDef.eggMoodDuring);
        setDodgeOffset(null);
        setIsHolding(false);
        isHoldingRef.current = false;
        sound.playEventAlert();

        // Owner reacts dynamically to event or near-end
        if (nextNumber === TOTAL_CHALLENGES_PER_RUN - 1) {
          triggerOwnerMessageWithTyping(OWNER_NEAR_END_MESSAGE, 500);
        } else {
          const eventLine =
            nextDef.ownerEventMessages[
              Math.floor(Math.random() * nextDef.ownerEventMessages.length)
            ];
          triggerOwnerMessageWithTyping(eventLine, 420);
        }
      }, 1700);
    },
    [clearScheduledNext, finishGame, pushChatMessage, triggerOwnerMessageWithTyping]
  );

  const resolveActiveChallenge = useCallback(
    (success: boolean, customFeedback?: string) => {
      const current = activeChallengeRef.current;
      if (!current || current.resolved) return;

      setIsHolding(false);
      isHoldingRef.current = false;

      const def = current.definition;
      let nextHp = hpRef.current;
      let nextScore = scoreRef.current;
      let nextStreak = streakRef.current;
      let nextMistakes = mistakesRef.current;

      if (success) {
        sound.playSuccess();
        nextStreak += 1;
        const speedBonus = Math.round((current.timeLeftSec / current.totalTimeSec) * 120);
        const streakBonus = nextStreak * 35;
        const earned = 150 + speedBonus + streakBonus;
        nextScore += earned;

        // Healing on care/special events or 3-streak milestone!
        let healed = def.healOnSuccess ?? 0;
        if (nextStreak > 0 && nextStreak % 3 === 0) {
          healed += 6;
        }
        if (healed > 0) {
          nextHp = Math.min(100, nextHp + healed);
          addFloatingFeedback(`+${healed}% Vida ❤️`, 'bonus', 35, 34);
        }

        addFloatingFeedback(`+${earned} pts!`, 'good', 62, 34);
        if (nextStreak >= 2) {
          addFloatingFeedback(`COMBO ${nextStreak}x 🔥`, 'bonus', 50, 24);
        }
        setEggMood('relieved');
      } else {
        sound.playFail();
        sound.playScared();
        nextStreak = 0;
        nextMistakes += 1;
        nextHp = Math.max(0, nextHp - def.damageOnFail);
        nextScore = Math.max(0, nextScore - 50);

        addFloatingFeedback(`-${def.damageOnFail}% Vida 💔`, 'bad', 50, 35);
        setEggMood(nextHp <= 35 ? 'desperate' : 'sad');
      }

      const nextMaxStreak = Math.max(maxStreakRef.current, nextStreak);
      setHp(nextHp);
      hpRef.current = nextHp;
      setScore(nextScore);
      scoreRef.current = nextScore;
      setStreak(nextStreak);
      streakRef.current = nextStreak;
      setMaxStreak(nextMaxStreak);
      maxStreakRef.current = nextMaxStreak;
      setMistakes(nextMistakes);
      mistakesRef.current = nextMistakes;

      const outcomeText = customFeedback || (success ? def.successMessage : def.failMessage);
      const updatedChallenge: ActiveChallenge = {
        ...current,
        resolved: true,
        outcome: success ? 'success' : 'fail',
        outcomeText,
        progress: success ? 100 : current.progress,
      };
      setActiveChallenge(updatedChallenge);
      activeChallengeRef.current = updatedChallenge;

      // Dynamic performance owner messages
      if (nextHp <= 0) {
        pushChatMessage('owner', 'NÃO... O MEU OVO... REBECA?! 😱💔');
      } else if (success && nextStreak >= 3) {
        const line =
          OWNER_GOOD_REACTIONS[Math.floor(Math.random() * OWNER_GOOD_REACTIONS.length)];
        triggerOwnerMessageWithTyping(line, 550);
      } else if (!success) {
        const line =
          nextMistakes >= 2 || nextHp < 50
            ? OWNER_BAD_REACTIONS[Math.floor(Math.random() * OWNER_BAD_REACTIONS.length)]
            : OWNER_GENERIC_QUESTIONS[
                Math.floor(Math.random() * OWNER_GENERIC_QUESTIONS.length)
              ];
        triggerOwnerMessageWithTyping(line, 450);
      }

      const completedIdx = current.challengeNumber; // 1-indexed count completed/attempted

      window.setTimeout(() => {
        if (screenRef.current !== 'PLAYING') return;
        if (nextHp <= 0) {
          finishGame(0, nextScore, completedIdx - 1);
          return;
        }
        setActiveChallenge(null);
        activeChallengeRef.current = null;
        setEggMood(nextHp >= 65 ? 'happy' : 'chill');
        setDodgeOffset(null);
        scheduleNextChallenge(completedIdx);
      }, 1450);
    },
    [
      addFloatingFeedback,
      finishGame,
      pushChatMessage,
      scheduleNextChallenge,
      triggerOwnerMessageWithTyping,
    ]
  );

  // Start a fresh match
  const startNewGame = useCallback(
    (choice: 'claro' | 'duvida') => {
      clearScheduledNext();
      const newPlaylist = buildChallengePlaylist(TOTAL_CHALLENGES_PER_RUN);

      setStoryChoice(choice);
      storyChoiceRef.current = choice;
      setPlaylist(newPlaylist);
      playlistRef.current = newPlaylist;

      setHp(100);
      hpRef.current = 100;
      setScore(0);
      scoreRef.current = 0;
      setStreak(0);
      streakRef.current = 0;
      setMaxStreak(0);
      maxStreakRef.current = 0;
      setMistakes(0);
      mistakesRef.current = 0;
      setElapsedSec(0);
      elapsedRef.current = 0;
      setChallengeCursor(0);
      cursorRef.current = 0;
      lastLevelNotifiedRef.current = 1;
      setLevelBanner(null);
      setActiveChallenge(null);
      activeChallengeRef.current = null;
      setEggMood('happy');
      setIsHolding(false);
      isHoldingRef.current = false;
      setDodgeOffset(null);
      setMobileChatOpen(false);
      setUnreadMobileCount(0);

      const introOwnerMsg =
        choice === 'claro'
          ? 'Rebeca, acabei de sair! Cuida bem dele que já já volto ❤️'
          : 'Rebeca, não faz essa cara! Prometo que é só uns minutinhos!';

      setChatMessages([
        {
          id: 'init-1',
          sender: 'owner',
          text: introOwnerMsg,
          time: formatChatTime(),
        },
        {
          id: 'init-2',
          sender: 'owner',
          text: 'Rebeca, tá tudo bem com meu ovo?',
          time: formatChatTime(),
        },
      ]);

      setScreen('PLAYING');
      screenRef.current = 'PLAYING';
      scheduleNextChallenge(0);
    },
    [clearScheduledNext, scheduleNextChallenge]
  );

  // Main 50ms game tick loop (runs only during PLAYING)
  useEffect(() => {
    if (screen !== 'PLAYING') return;

    const interval = window.setInterval(() => {
      if (screenRef.current !== 'PLAYING') return;

      // Advance overall clock
      setElapsedSec((prev) => {
        const next = Number((prev + 0.05).toFixed(2));
        elapsedRef.current = next;
        return next;
      });

      const current = activeChallengeRef.current;
      if (!current || current.resolved) return;

      const nextTimeLeft = Math.max(0, Number((current.timeLeftSec - 0.05).toFixed(2)));
      let nextHold = current.holdElapsedSec;
      let nextProgress = current.progress;

      if (current.definition.mechanic === 'hold' && isHoldingRef.current) {
        nextHold = Math.min(
          current.holdRequiredSec,
          Number((current.holdElapsedSec + 0.05).toFixed(2))
        );
        nextProgress = Math.round((nextHold / current.holdRequiredSec) * 100);
        if (nextHold >= current.holdRequiredSec) {
          const completed: ActiveChallenge = {
            ...current,
            timeLeftSec: nextTimeLeft,
            holdElapsedSec: nextHold,
            progress: 100,
          };
          activeChallengeRef.current = completed;
          setActiveChallenge(completed);
          resolveActiveChallenge(true);
          return;
        }
      }

      if (nextTimeLeft <= 0) {
        const timedOut: ActiveChallenge = {
          ...current,
          timeLeftSec: 0,
          holdElapsedSec: nextHold,
          progress: nextProgress,
        };
        activeChallengeRef.current = timedOut;
        setActiveChallenge(timedOut);
        resolveActiveChallenge(false);
        return;
      }

      const updated: ActiveChallenge = {
        ...current,
        timeLeftSec: nextTimeLeft,
        holdElapsedSec: nextHold,
        progress: nextProgress,
      };
      activeChallengeRef.current = updated;
      setActiveChallenge(updated);
    }, 50);

    return () => window.clearInterval(interval);
  }, [screen, resolveActiveChallenge]);

  // Cleanup scheduled timeouts on unmount
  useEffect(() => {
    return () => clearScheduledNext();
  }, [clearScheduledNext]);

  // Player Action Handlers
  const handleMashTap = () => {
    const current = activeChallengeRef.current;
    if (!current || current.resolved || current.definition.mechanic !== 'mash') return;
    sound.playTap();
    const nextTaps = current.tapsDone + 1;
    const nextProgress = Math.min(100, Math.round((nextTaps / current.tapsRequired) * 100));
    const updated: ActiveChallenge = {
      ...current,
      tapsDone: nextTaps,
      progress: nextProgress,
    };
    activeChallengeRef.current = updated;
    setActiveChallenge(updated);

    if (nextTaps >= current.tapsRequired) {
      resolveActiveChallenge(true);
    }
  };

  const handleHoldStart = () => {
    const current = activeChallengeRef.current;
    if (!current || current.resolved || current.definition.mechanic !== 'hold') return;
    sound.playClick();
    setIsHolding(true);
    isHoldingRef.current = true;
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
    isHoldingRef.current = false;
  };

  const handleTargetHit = (targetId: number) => {
    const current = activeChallengeRef.current;
    if (!current || current.resolved || current.definition.mechanic !== 'targets') return;
    sound.playTap();
    const updatedTargets = current.targets.map((t) =>
      t.id === targetId ? { ...t, hit: true } : t
    );
    const hitCount = updatedTargets.filter((t) => t.hit).length;
    const nextProgress = Math.round((hitCount / updatedTargets.length) * 100);
    const updated: ActiveChallenge = {
      ...current,
      targets: updatedTargets,
      progress: nextProgress,
    };
    activeChallengeRef.current = updated;
    setActiveChallenge(updated);

    if (hitCount >= updatedTargets.length) {
      resolveActiveChallenge(true);
    }
  };

  const handleDodge = (direction: 'left' | 'right') => {
    const current = activeChallengeRef.current;
    if (!current || current.resolved || current.definition.mechanic !== 'dodge') return;
    sound.playClick();
    setDodgeOffset(direction);
    // Rock comes from dangerSide; safe side is the opposite
    const isSafe = direction !== current.dangerSide;
    resolveActiveChallenge(
      isSafe,
      isSafe
        ? 'Desvio cinematográfico, Rebeca! A pedra passou direto!'
        : 'Ops! Você desviou bem na direção da pedra!'
    );
  };

  const handleChoiceSelect = (option: ChoiceOption) => {
    const current = activeChallengeRef.current;
    if (!current || current.resolved || current.definition.mechanic !== 'choice') return;
    sound.playClick();
    resolveActiveChallenge(option.isCorrect, option.feedback);
  };

  const handleQuickReply = (text: string) => {
    sound.playClick();
    pushChatMessage('rebeca', text);

    const repliesMap: Record<string, string> = {
      'Tá tudo sob controle! 😎': 'Assim eu fico mais tranquilo... ou será que não? 👀',
      'SOCORRO 😂': 'COMO ASSIM SOCORRO, REBECA?! OLHA O MEU OVO!',
      'Ele tá ótimo! ❤️': 'Manda um beijo na casca por mim! 🥚❤️',
    };
    const ownerResponse = repliesMap[text] || 'Tô de olho em você, Rebeca!';
    triggerOwnerMessageWithTyping(ownerResponse, 650);
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handlePause = () => {
    if (screen !== 'PLAYING') return;
    sound.playClick();
    clearScheduledNext();
    setIsHolding(false);
    isHoldingRef.current = false;
    setScreen('PAUSED');
  };

  const handleResume = () => {
    sound.playClick();
    setScreen('PLAYING');
    screenRef.current = 'PLAYING';
    // If paused between challenges, schedule the next one cleanly
    if (!activeChallengeRef.current) {
      scheduleNextChallenge(cursorRef.current);
    }
  };

  const currentLevelInfo = getLevelForChallenge(Math.max(1, challengeCursor));
  const latestOwnerMsg = [...chatMessages].reverse().find((m) => m.sender === 'owner');
  const hpColor =
    hp >= 65 ? 'bg-[#52B788]' : hp >= 35 ? 'bg-[#FFB703]' : 'bg-[#FF6B6B]';
  const hpStatusLabel =
    hp >= 75 ? 'Inteiro' : hp >= 40 ? 'Atenção' : 'Crítico';

  return (
    <div className="min-h-dvh bg-pastel-dots flex flex-col">
      {/* Compact Sticky Top Navigation Bar (single-row, <= 56px) */}
      <header className="sticky top-0 z-40 h-14 bg-[#FFFDF7]/95 backdrop-blur-md border-b-2 border-[#E4DDD3] px-3 sm:px-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            if (screen === 'PLAYING') {
              handlePause();
            } else {
              clearScheduledNext();
              setScreen('ENTRY');
            }
          }}
          className="font-display font-bold text-base sm:text-lg text-[#4A342E] whitespace-nowrap truncate cursor-pointer flex items-center gap-1.5"
        >
          <span>🥚</span>
          <span>Rebeca, Cuida do Meu Ovo!</span>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleToggleMute}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white hover:bg-[#FFF3B0] border-2 border-[#D8C7BA] text-[#4A342E] transition-colors cursor-pointer"
            aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
            title={isMuted ? 'Ativar som' : 'Desativar som'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {screen === 'PLAYING' && (
            <>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  clearScheduledNext();
                  setIsHolding(false);
                  isHoldingRef.current = false;
                  setScreen('RESTART');
                }}
                className="min-w-[44px] min-h-[44px] px-2.5 flex items-center justify-center rounded-xl bg-white hover:bg-[#FFD6E0] border-2 border-[#D8C7BA] text-[#4A342E] transition-colors cursor-pointer"
                aria-label="Reiniciar partida"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handlePause}
                className="min-h-[44px] px-3.5 py-2 flex items-center gap-1.5 rounded-xl bg-[#FFF3B0] hover:bg-[#FFE885] border-2 border-[#6D4C41] font-bold text-sm text-[#4A342E] cursor-pointer whitespace-nowrap"
              >
                <Pause className="w-4 h-4" />
                <span className="hidden sm:inline">Pausar</span>
              </button>
            </>
          )}

          {screen !== 'PLAYING' && screen !== 'RECORDS' && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setRecordsReturnTo(screen === 'PAUSED' ? 'PAUSED' : 'ENTRY');
                setScreen('RECORDS');
              }}
              className="min-h-[44px] px-3.5 py-2 flex items-center gap-1.5 rounded-xl bg-[#FFF3B0] hover:bg-[#FFE885] border-2 border-[#6D4C41] font-bold text-sm text-[#4A342E] cursor-pointer whitespace-nowrap"
            >
              <Trophy className="w-4 h-4 text-[#B67A00]" />
              <span className="hidden sm:inline">Recordes</span>
            </button>
          )}
        </div>
      </header>

      {/* SCREEN ROUTER */}
      <main className="flex-1">
        {screen === 'ENTRY' && (
          <EntryScreen
            records={records}
            onEnter={() => {
              sound.playClick();
              setScreen('STORY');
            }}
            onOpenRecords={() => {
              sound.playClick();
              setRecordsReturnTo('ENTRY');
              setScreen('RECORDS');
            }}
          />
        )}

        {screen === 'STORY' && (
          <StoryScreen
            onStartMission={startNewGame}
            onBack={() => {
              sound.playClick();
              setScreen('ENTRY');
            }}
            onSoundClick={() => sound.playClick()}
          />
        )}

        {screen === 'PLAYING' && (
          <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4">
            {/* Level-Up Toast */}
            {levelBanner && (
              <div className="bg-[#FFD166] border-3 border-[#6D4C41] text-[#4A342E] rounded-2xl px-4 py-2.5 text-center font-display font-bold text-sm sm:text-base shadow-md animate-pop-in">
                {levelBanner}
              </div>
            )}

            {/* Game HUD Bar */}
            <div className="bg-white rounded-2xl border-3 border-[#6D4C41] px-4 py-3 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-3 items-center">
              {/* Egg HP Meter */}
              <div className="col-span-2 sm:col-span-2 space-y-1">
                <div className="flex items-center justify-between text-xs font-extrabold text-[#4A342E]">
                  <span>🥚 Vida do Ovo · {hpStatusLabel}</span>
                  <span className="font-mono-nums">{hp}%</span>
                </div>
                <div className="w-full h-3.5 bg-[#F3E5D8] rounded-full overflow-hidden border border-[#6D4C41]">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${hpColor}`}
                    style={{ width: `${hp}%` }}
                  />
                </div>
              </div>

              {/* Score + Streak */}
              <div className="flex items-center justify-between sm:justify-center gap-3 bg-[#FFFDF7] rounded-xl px-3 py-1.5 border border-[#E4DDD3]">
                <div>
                  <p className="text-[10px] font-bold uppercase text-[#6D4C41]">Pontos</p>
                  <p className="font-mono-nums font-bold text-base sm:text-lg text-[#4A342E] leading-tight">
                    {score}
                  </p>
                </div>
                {streak >= 2 && (
                  <span className="text-xs font-extrabold text-[#9B2242] bg-[#FFD6E0] px-2 py-0.5 rounded-lg">
                    {streak}x 🔥
                  </span>
                )}
              </div>

              {/* Level & Progress */}
              <div className="flex items-center justify-between sm:justify-end gap-3 bg-[#FFFDF7] rounded-xl px-3 py-1.5 border border-[#E4DDD3]">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase text-[#6D4C41] truncate">
                    Nv.{currentLevelInfo.level} · {currentLevelInfo.title}
                  </p>
                  <p className="font-mono-nums font-bold text-sm text-[#4A342E] leading-tight">
                    Desafio {Math.min(TOTAL_CHALLENGES_PER_RUN, Math.max(1, challengeCursor))}/
                    {TOTAL_CHALLENGES_PER_RUN} · {Math.floor(elapsedSec)}s
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Live WhatsApp Preview Strip */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setUnreadMobileCount(0);
                  setMobileChatOpen(true);
                }}
                className="w-full bg-[#EFEAE2] border-2 border-[#6D4C41] rounded-2xl px-3.5 py-2.5 flex items-center justify-between gap-2.5 text-left shadow-xs active:scale-[0.99] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-sm shrink-0">
                    💬
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-extrabold text-[#2D6A4F]">
                      Dono do Ovo {isOwnerTyping ? '(digitando...)' : ''}
                    </p>
                    <p className="text-xs font-bold text-[#4A342E] truncate">
                      {latestOwnerMsg?.text || 'Rebeca, cuida bem do meu ovo!'}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 text-xs font-extrabold text-[#2D6A4F] bg-white px-2.5 py-1 rounded-xl border border-[#D8C7BA]">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{unreadMobileCount > 0 ? unreadMobileCount : 'Chat'}</span>
                </span>
              </button>
            </div>

            {/* Main 2-Column Desktop Arena + WhatsApp Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <div className="lg:col-span-7">
                <ChallengeArena
                  hp={hp}
                  eggMood={eggMood}
                  activeChallenge={activeChallenge}
                  calmMessage={calmMessage}
                  isHolding={isHolding}
                  dodgeOffset={dodgeOffset}
                  floatingFeedbacks={floatingFeedbacks}
                  onMashTap={handleMashTap}
                  onHoldStart={handleHoldStart}
                  onHoldEnd={handleHoldEnd}
                  onTargetHit={handleTargetHit}
                  onDodge={handleDodge}
                  onChoiceSelect={handleChoiceSelect}
                />
              </div>

              <div className="hidden lg:block lg:col-span-5">
                <WhatsAppChat
                  messages={chatMessages}
                  isOwnerTyping={isOwnerTyping}
                  onQuickReply={handleQuickReply}
                  className="h-full"
                />
              </div>
            </div>

            {/* Mobile WhatsApp Drawer Overlay */}
            {mobileChatOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 lg:hidden">
                <div className="w-full max-w-md animate-pop-in">
                  <WhatsAppChat
                    messages={chatMessages}
                    isOwnerTyping={isOwnerTyping}
                    onQuickReply={handleQuickReply}
                    onCloseMobile={() => {
                      sound.playClick();
                      setMobileChatOpen(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {screen === 'PAUSED' && (
          <PauseScreen
            hp={hp}
            score={score}
            level={currentLevelInfo.level}
            levelTitle={currentLevelInfo.title}
            challengeIndex={challengeCursor}
            totalChallenges={TOTAL_CHALLENGES_PER_RUN}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onResume={handleResume}
            onRequestRestart={() => {
              sound.playClick();
              setScreen('RESTART');
            }}
            onGoHome={() => {
              sound.playClick();
              clearScheduledNext();
              setScreen('ENTRY');
            }}
          />
        )}

        {screen === 'RESTART' && (
          <RestartScreen
            onConfirmRestart={() => {
              sound.playClick();
              startNewGame(storyChoice);
            }}
            onCancelRestart={() => {
              sound.playClick();
              handleResume();
            }}
          />
        )}

        {screen === 'RESULT' && lastRun && (
          <ResultScreen
            run={lastRun}
            isNewBestScore={isNewBestScore}
            onPlayAgain={() => {
              sound.playClick();
              startNewGame(storyChoice);
            }}
            onOpenRecords={() => {
              sound.playClick();
              setRecordsReturnTo('RESULT');
              setScreen('RECORDS');
            }}
            onGoHome={() => {
              sound.playClick();
              setScreen('ENTRY');
            }}
          />
        )}

        {screen === 'RECORDS' && (
          <RecordsScreen
            records={records}
            onClearRecords={() => {
              sound.playClick();
              setRecords(clearRecords());
            }}
            onBack={() => {
              sound.playClick();
              setScreen(recordsReturnTo);
            }}
            onPlayNow={() => {
              sound.playClick();
              setScreen('STORY');
            }}
          />
        )}
      </main>
    </div>
  );
}
