/**
 * Zählung eines Matches: Punkte, Games, Sätze, Tiebreak, Aufschlag, Changeover und Matchende.
 * Das Zählformat ist ein Parameter des Matches (siehe `format.ts`).
 */
export { gamePointLabels, isDeuce } from "./display";
export { STANDARD_SCORING_FORMAT, validateScoringFormat } from "./format";
export type { ScoringFormat } from "./format";
export { MatchFinishedError, createMatchScore, getSetsWon, otherPlayer, scorePoint } from "./score";
export type {
  CurrentGame,
  GameInProgress,
  MatchScore,
  Pair,
  Player,
  ScoreEvent,
  ScoreUpdate,
  SetResult,
  TiebreakInProgress,
} from "./types";
