import { scorePoint } from "./score";
import type { MatchScore, Player, ScoreEvent, ScoreUpdate } from "./types";

/** Zählt die Punkte der Reihe nach; liefert den Endstand und alle Ereignisse. */
export function play(score: MatchScore, winners: readonly Player[]): ScoreUpdate {
  let current = score;
  const events: ScoreEvent[] = [];
  for (const winner of winners) {
    const update = scorePoint(current, winner);
    current = update.score;
    events.push(...update.events);
  }
  return { score: current, events };
}

/** Der Spieler gewinnt ein Game mit vier Punkten in Folge (Start bei 0:0). */
export function winGame(score: MatchScore, winner: Player): ScoreUpdate {
  return play(score, [winner, winner, winner, winner]);
}

/** Spielt mehrere Games; jeder Eintrag ist der Gewinner eines Games. */
export function playGames(score: MatchScore, winners: readonly Player[]): ScoreUpdate {
  let current = score;
  const events: ScoreEvent[] = [];
  for (const winner of winners) {
    const update = winGame(current, winner);
    current = update.score;
    events.push(...update.events);
  }
  return { score: current, events };
}

/** Der Spieler gewinnt einen ganzen Satz 6:0 (bzw. `games`:0). */
export function winSet(score: MatchScore, winner: Player, games = score.format.gamesPerSet) {
  return playGames(
    score,
    Array.from({ length: games }, () => winner),
  );
}

/** Abwechselnde Gewinner, beginnend mit `first`: 0, 1, 0, 1 ... */
export function alternating(count: number, first: Player = 0): Player[] {
  return Array.from(
    { length: count },
    (_, index): Player => (index % 2 === 0 ? first : first === 0 ? 1 : 0),
  );
}

/** Friert ein Objekt samt aller verschachtelten Objekte ein, um unbeabsichtigte Änderungen zu finden. */
export function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) {
      deepFreeze(child);
    }
  }
  return value;
}
