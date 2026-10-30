/**
 * Zählformat eines Matches.
 *
 * Das Format ist ein echter Parameter: Es kann von Match zu Match verschieden sein. Die Logik des
 * Aufschlagspiels (siehe `rules.ts`) bleibt dabei immer gleich.
 */
export interface ScoringFormat {
  /** Gewinnsätze: Sätze, die für den Matchgewinn nötig sind (2 = „Best of 3“, 3 = „Best of 5“). */
  readonly setsToWin: number;
  /**
   * Games, die für einen Satzgewinn nötig sind (bei mindestens 2 Games Vorsprung).
   * Steht es in diesem Satz bei diesem Wert unentschieden, folgt der Tiebreak.
   */
  readonly gamesPerSet: number;
  /** Punkte, die für den Tiebreak-Gewinn nötig sind (bei mindestens 2 Punkten Vorsprung). */
  readonly tiebreakPoints: number;
}

/** Variante „Standard“: 2 Gewinnsätze, 6 Games pro Satz, Tiebreak bis 7 in jedem Satz. */
export const STANDARD_SCORING_FORMAT: ScoringFormat = {
  setsToWin: 2,
  gamesPerSet: 6,
  tiebreakPoints: 7,
};

function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value >= 1;
}

/** Prüft ein Zählformat und wirft einen `RangeError`, wenn ein Wert ungültig ist. */
export function validateScoringFormat(format: ScoringFormat): void {
  const fields = ["setsToWin", "gamesPerSet", "tiebreakPoints"] as const;
  for (const field of fields) {
    if (!isPositiveInteger(format[field])) {
      throw new RangeError(
        `Ungültiges Zählformat: ${field} muss eine ganze Zahl von mindestens 1 sein (war ${String(format[field])}).`,
      );
    }
  }
}
