export type ScreenState =
  | 'ENTRY'
  | 'STORY'
  | 'PLAYING'
  | 'PAUSED'
  | 'RESTART'
  | 'RESULT'
  | 'RECORDS';

export type EggMood =
  | 'happy'
  | 'chill'
  | 'scared'
  | 'sad'
  | 'desperate'
  | 'relieved'
  | 'broken'
  | 'legendary';

export type ChallengeMechanic =
  | 'mash'
  | 'hold'
  | 'targets'
  | 'dodge'
  | 'choice';

export type ThreatVisualType =
  | 'cat'
  | 'dog'
  | 'rain'
  | 'hen'
  | 'pigeon'
  | 'fall'
  | 'thief'
  | 'sun'
  | 'rock'
  | 'fox'
  | 'bee'
  | 'wind'
  | 'banana'
  | 'raccoon'
  | 'ufo'
  | 'gossip'
  | 'care';

export interface ChoiceOption {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export interface ChallengeDefinition {
  id: string;
  visual: ThreatVisualType;
  emoji: string;
  title: string;
  description: string;
  actionHint: string;
  mechanic: ChallengeMechanic;
  baseDurationSec: number;
  baseRequiredTaps?: number; // for mash
  baseHoldSec?: number; // for hold
  targetCount?: number; // for targets
  targetEmoji?: string;
  targetLabel?: string;
  actionButtonLabel?: string;
  choices?: ChoiceOption[];
  dangerFrom?: 'left' | 'right'; // for dodge
  successMessage: string;
  failMessage: string;
  damageOnFail: number;
  healOnSuccess?: number;
  ownerEventMessages: string[];
  eggMoodDuring: EggMood;
  accentColor: string;
}

export interface ActiveChallenge {
  definition: ChallengeDefinition;
  challengeNumber: number;
  totalTimeSec: number;
  timeLeftSec: number;
  progress: number; // 0 to 100
  tapsDone: number;
  tapsRequired: number;
  holdElapsedSec: number;
  holdRequiredSec: number;
  targets: Array<{
    id: number;
    x: number; // percentage 12..88
    y: number; // percentage 15..80
    hit: boolean;
  }>;
  dangerSide: 'left' | 'right';
  resolved: boolean;
  outcome?: 'success' | 'fail';
  outcomeText?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'owner' | 'rebeca' | 'system';
  text: string;
  time: string;
}

export type EndingType = 'legendary' | 'perfect' | 'chaotic' | 'tragic';

export interface RunSummary {
  id: string;
  dateIso: string;
  ending: EndingType;
  score: number;
  hpRemaining: number;
  challengesCompleted: number;
  totalChallenges: number;
  maxStreak: number;
  elapsedSec: number;
  levelReached: number;
  levelTitle: string;
  storyChoice: 'claro' | 'duvida';
}

export interface StoredRecords {
  bestScore: number;
  bestStreak: number;
  totalGames: number;
  unlockedEndings: EndingType[];
  recentRuns: RunSummary[];
}

export interface FloatingFeedback {
  id: number;
  text: string;
  tone: 'good' | 'bad' | 'bonus';
  x: number;
  y: number;
}
