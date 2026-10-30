import { ADVANTAGE_LABEL, DEUCE_FROM_POINTS, GAME_POINT_LABELS } from "./rules";
import type { MatchScore } from "./types";

/** Einstand: im Game stehen beide Spieler bei mindestens 40 und gleichauf. */
export function isDeuce(score: MatchScore): boolean {
  const game = score.currentGame;
  return (
    game.kind === "game" && game.points[0] >= DEUCE_FROM_POINTS && game.points[0] === game.points[1]
  );
}

function pointLabel(points: number): string {
  return GAME_POINT_LABELS[points] ?? GAME_POINT_LABELS[GAME_POINT_LABELS.length - 1] ?? "";
}

/**
 * Anzeige des Punktestands im laufenden Game bzw. Tiebreak je Spieler.
 * Im Game: 0 / 15 / 30 / 40, bei Einstand „40“ für beide, beim Vorteil „Vorteil“ und „40“.
 * Im Tiebreak: die gewonnenen Punkte als Zahl.
 */
export function gamePointLabels(score: MatchScore): readonly [string, string] {
  const game = score.currentGame;
  if (game.kind === "tiebreak") {
    return [String(game.points[0]), String(game.points[1])];
  }

  const [first, second] = game.points;
  if (first >= DEUCE_FROM_POINTS && second >= DEUCE_FROM_POINTS) {
    const deuce = pointLabel(DEUCE_FROM_POINTS);
    if (first === second) return [deuce, deuce];
    return first > second ? [ADVANTAGE_LABEL, deuce] : [deuce, ADVANTAGE_LABEL];
  }
  return [pointLabel(first), pointLabel(second)];
}
