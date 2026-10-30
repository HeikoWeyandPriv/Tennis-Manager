import type { ScoringFormat } from "./format";

/** Einer der beiden Spieler. */
export type Player = 0 | 1;

/** Ein Wert je Spieler, Index = Spieler. */
export type Pair = readonly [number, number];

/** Ein abgeschlossener Satz mit den Games beider Spieler (ein Tiebreak zählt als ein Game). */
export interface SetResult {
  readonly games: Pair;
}

/** Ein laufendes Game: Punkte als Anzahl gewonnener Punkte je Spieler. */
export interface GameInProgress {
  readonly kind: "game";
  readonly points: Pair;
}

/** Ein laufender Tiebreak: Punkte je Spieler und der Spieler, der den ersten Punkt aufschlägt. */
export interface TiebreakInProgress {
  readonly kind: "tiebreak";
  readonly points: Pair;
  readonly firstServer: Player;
}

export type CurrentGame = GameInProgress | TiebreakInProgress;

/**
 * Spielstand eines Matches. Reine Daten, vollständig als JSON serialisierbar (ADR 0003).
 */
export interface MatchScore {
  readonly format: ScoringFormat;
  /** Abgeschlossene Sätze in der Reihenfolge, in der sie gespielt wurden. */
  readonly completedSets: readonly SetResult[];
  /** Games im laufenden Satz. */
  readonly currentSetGames: Pair;
  /** Laufendes Game bzw. laufender Tiebreak. */
  readonly currentGame: CurrentGame;
  /** Spieler, der den nächsten Punkt aufschlägt. */
  readonly server: Player;
  /** Matchsieger, solange das Match läuft `null`. */
  readonly winner: Player | null;
}

/** Ereignisse, die beim Zählen eines Punkts entstehen. */
export type ScoreEvent =
  /** Ein reguläres Game ist entschieden. Für einen Tiebreak entsteht kein `gameWon`. */
  | { readonly type: "gameWon"; readonly winner: Player }
  /** Ein Satz ist entschieden (auch durch einen Tiebreak). */
  | { readonly type: "setWon"; readonly winner: Player; readonly games: Pair }
  /** Seitenwechsel innerhalb eines Satzes. */
  | { readonly type: "changeover" }
  /** Pause nach einem Satz, in dem das Match noch nicht entschieden ist. */
  | { readonly type: "setBreak" }
  /** Das Match ist entschieden. */
  | { readonly type: "matchWon"; readonly winner: Player };

/** Ergebnis des Zählens eines Punkts. */
export interface ScoreUpdate {
  readonly score: MatchScore;
  readonly events: readonly ScoreEvent[];
}
