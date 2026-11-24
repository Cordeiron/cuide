import { EndingType, RunSummary, StoredRecords } from '../types/game';

const STORAGE_KEY = 'rebeca_ovo_records_v1';

const DEFAULT_RECORDS: StoredRecords = {
  bestScore: 0,
  bestStreak: 0,
  totalGames: 0,
  unlockedEndings: [],
  recentRuns: [],
};

export function loadRecords(): StoredRecords {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_RECORDS;
    const parsed = JSON.parse(raw) as Partial<StoredRecords>;
    return {
      bestScore: typeof parsed.bestScore === 'number' ? parsed.bestScore : 0,
      bestStreak: typeof parsed.bestStreak === 'number' ? parsed.bestStreak : 0,
      totalGames: typeof parsed.totalGames === 'number' ? parsed.totalGames : 0,
      unlockedEndings: Array.isArray(parsed.unlockedEndings)
        ? (parsed.unlockedEndings as EndingType[])
        : [],
      recentRuns: Array.isArray(parsed.recentRuns)
        ? (parsed.recentRuns as RunSummary[])
        : [],
    };
  } catch {
    return DEFAULT_RECORDS;
  }
}

export function saveRunRecord(run: RunSummary): {
  records: StoredRecords;
  isNewBestScore: boolean;
} {
  const current = loadRecords();
  const isNewBestScore = run.score > current.bestScore && run.score > 0;

  const unlockedSet = new Set<EndingType>(current.unlockedEndings);
  unlockedSet.add(run.ending);

  const updated: StoredRecords = {
    bestScore: Math.max(current.bestScore, run.score),
    bestStreak: Math.max(current.bestStreak, run.maxStreak),
    totalGames: current.totalGames + 1,
    unlockedEndings: Array.from(unlockedSet),
    recentRuns: [run, ...current.recentRuns].slice(0, 8),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore quota errors
  }

  return { records: updated, isNewBestScore };
}

export function clearRecords(): StoredRecords {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
  return DEFAULT_RECORDS;
}
