import type { ScoringFormat } from "./format";
import { validateScoringFormat } from "./format";
import {
  CHANGEOVER_AFTER_FIRST_GAME,
  CHANGEOVER_GAME_INTERVAL,
  MIN_LEAD,
  POINTS_TO_WIN_GAME,
  TIEBREAK_CHANGEOVER_INTERVAL,
  TIEBREAK_SERVE_INTERVAL,
} from "./rules";
import type {
  GameInProgress,
  MatchScore,
  Pair,
  Player,
  ScoreEvent,
  ScoreUpdate,
  SetResult,
  TiebreakInProgress,
} from "./types";

/** Wird geworfen, wenn nach dem Matchende noch ein Punkt gezählt werden soll. */
export class MatchFinishedError extends Error {
  constructor() {
    super("Das Match ist bereits beendet, es können keine weiteren Punkte gezählt werden.");
    this.name = "MatchFinishedError";
  }
}

export function otherPlayer(player: Player): Player {
  return player === 0 ? 1 : 0;
}

function addPoint(pair: Pair, player: Player): Pair {
  return player === 0 ? [pair[0] + 1, pair[1]] : [pair[0], pair[1] + 1];
}

/** Hat `player` mit dem Stand `values` das Ziel erreicht und den Mindestvorsprung? */
function hasWon(values: Pair, player: Player, target: number): boolean {
  const own = values[player];
  const opponent = values[otherPlayer(player)];
  return own >= target && own - opponent >= MIN_LEAD;
}

/** Soll nach so vielen Games im Satz ein Changeover stattfinden? */
function isChangeoverAfterGames(gamesInSet: number): boolean {
  return (
    gamesInSet >= CHANGEOVER_AFTER_FIRST_GAME &&
    (gamesInSet - CHANGEOVER_AFTER_FIRST_GAME) % CHANGEOVER_GAME_INTERVAL === 0
  );
}

/** Aufschläger im Tiebreak nach `pointsPlayed` gespielten Punkten. */
function tiebreakServer(firstServer: Player, pointsPlayed: number): Player {
  const switches = Math.floor(
    (pointsPlayed + TIEBREAK_SERVE_INTERVAL - 1) / TIEBREAK_SERVE_INTERVAL,
  );
  return switches % 2 === 0 ? firstServer : otherPlayer(firstServer);
}

const NO_POINTS: Pair = [0, 0];

function newGame(): GameInProgress {
  return { kind: "game", points: NO_POINTS };
}

/** Sätze, die jeder Spieler gewonnen hat. */
export function getSetsWon(score: MatchScore): Pair {
  let sets: Pair = NO_POINTS;
  for (const set of score.completedSets) {
    sets = addPoint(sets, set.games[0] > set.games[1] ? 0 : 1);
  }
  return sets;
}

/**
 * Legt den Spielstand eines neuen Matches an.
 *
 * @throws RangeError wenn das Zählformat ungültig ist
 */
export function createMatchScore(format: ScoringFormat, firstServer: Player): MatchScore {
  validateScoringFormat(format);
  return {
    format: { ...format },
    completedSets: [],
    currentSetGames: NO_POINTS,
    currentGame: newGame(),
    server: firstServer,
    winner: null,
  };
}

function finishSet(
  score: MatchScore,
  finalGames: Pair,
  setWinner: Player,
  nextServer: Player,
  events: readonly ScoreEvent[],
): ScoreUpdate {
  const result: SetResult = { games: finalGames };
  const completedSets = [...score.completedSets, result];
  const setsWon = getSetsWon({ ...score, completedSets });
  const matchWon = setsWon[setWinner] >= score.format.setsToWin;

  const next: MatchScore = {
    ...score,
    completedSets,
    currentSetGames: NO_POINTS,
    currentGame: newGame(),
    server: nextServer,
    winner: matchWon ? setWinner : null,
  };
  const closing: ScoreEvent = matchWon
    ? { type: "matchWon", winner: setWinner }
    : { type: "setBreak" };
  return {
    score: next,
    events: [...events, { type: "setWon", winner: setWinner, games: finalGames }, closing],
  };
}

function scoreGamePoint(score: MatchScore, game: GameInProgress, pointWinner: Player): ScoreUpdate {
  const points = addPoint(game.points, pointWinner);
  if (!hasWon(points, pointWinner, POINTS_TO_WIN_GAME)) {
    return { score: { ...score, currentGame: { kind: "game", points } }, events: [] };
  }

  const { gamesPerSet } = score.format;
  const games = addPoint(score.currentSetGames, pointWinner);
  const server = otherPlayer(score.server);
  const events: ScoreEvent[] = [{ type: "gameWon", winner: pointWinner }];

  if (hasWon(games, pointWinner, gamesPerSet)) {
    return finishSet(score, games, pointWinner, server, events);
  }
  if (games[0] === gamesPerSet && games[1] === gamesPerSet) {
    const tiebreak: TiebreakInProgress = {
      kind: "tiebreak",
      points: NO_POINTS,
      firstServer: server,
    };
    return { score: { ...score, currentSetGames: games, currentGame: tiebreak, server }, events };
  }
  if (isChangeoverAfterGames(games[0] + games[1])) {
    events.push({ type: "changeover" });
  }
  return {
    score: { ...score, currentSetGames: games, currentGame: newGame(), server },
    events,
  };
}

function scoreTiebreakPoint(
  score: MatchScore,
  tiebreak: TiebreakInProgress,
  pointWinner: Player,
): ScoreUpdate {
  const points = addPoint(tiebreak.points, pointWinner);
  if (hasWon(points, pointWinner, score.format.tiebreakPoints)) {
    // Der Tiebreak zählt als ein Game und entscheidet den Satz. Im nächsten Satz schlägt der
    // Spieler auf, der im Tiebreak den ersten Punkt als Rückschläger gespielt hat.
    const games = addPoint(score.currentSetGames, pointWinner);
    return finishSet(score, games, pointWinner, otherPlayer(tiebreak.firstServer), []);
  }

  const pointsPlayed = points[0] + points[1];
  const events: ScoreEvent[] =
    pointsPlayed % TIEBREAK_CHANGEOVER_INTERVAL === 0 ? [{ type: "changeover" }] : [];
  return {
    score: {
      ...score,
      currentGame: { kind: "tiebreak", points, firstServer: tiebreak.firstServer },
      server: tiebreakServer(tiebreak.firstServer, pointsPlayed),
    },
    events,
  };
}

/**
 * Zählt einen Punkt. Der übergebene Spielstand wird nicht verändert.
 *
 * @throws MatchFinishedError wenn das Match bereits beendet ist
 */
export function scorePoint(score: MatchScore, pointWinner: Player): ScoreUpdate {
  if (score.winner !== null) {
    throw new MatchFinishedError();
  }
  return score.currentGame.kind === "tiebreak"
    ? scoreTiebreakPoint(score, score.currentGame, pointWinner)
    : scoreGamePoint(score, score.currentGame, pointWinner);
}
