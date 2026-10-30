import { describe, expect, it } from "vitest";
import type { ScoringFormat } from "./format";
import { MatchFinishedError, createMatchScore, getSetsWon, otherPlayer, scorePoint } from "./score";
import { MIN_LEAD, POINTS_TO_WIN_GAME } from "./rules";
import type { MatchScore, Pair, Player, ScoreEvent } from "./types";

/**
 * Invarianten über viele zufällige Matches (ADR 0008).
 *
 * Der Zufall kommt aus einem eigenen Generator mit festem Seed: Die Tests sind damit
 * reproduzierbar. Es werden zufällige Zählformate und zufällige Punktfolgen gespielt; nach jedem
 * Punkt werden die Regeln der Zählung geprüft.
 */

/** Einfacher Zufallsgenerator mit Seed (LCG), nur für diese Tests. */
function createRandom(seed: number) {
  let state = seed >>> 0;
  const next = (): number => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
  return {
    next,
    int: (min: number, max: number): number => min + Math.floor(next() * (max - min + 1)),
  };
}

function hasWon(values: Pair, player: Player, target: number): boolean {
  return values[player] >= target && values[player] - values[otherPlayer(player)] >= MIN_LEAD;
}

const PLAYERS: readonly Player[] = [0, 1];
const MAX_POINTS_PER_MATCH = 5000;

/** Prüft den Spielstand nach einem Punkt, solange das Match läuft. */
function checkRunningMatch(score: MatchScore, firstServer: Player): void {
  const { gamesPerSet, tiebreakPoints } = score.format;
  const games = score.currentSetGames;
  const game = score.currentGame;

  // Das laufende Game bzw. der laufende Tiebreak ist nicht schon entschieden.
  for (const player of PLAYERS) {
    const target = game.kind === "game" ? POINTS_TO_WIN_GAME : tiebreakPoints;
    expect(hasWon(game.points, player, target), "Game bzw. Tiebreak schon entschieden").toBe(false);
    expect(hasWon(games, player, gamesPerSet), "Satz schon entschieden").toBe(false);
  }

  // Ein Tiebreak läuft genau dann, wenn es im Satz bei den Games unentschieden steht.
  const gamesAll = games[0] === gamesPerSet && games[1] === gamesPerSet;
  expect(game.kind === "tiebreak", "Tiebreak-Status").toBe(gamesAll);
  expect(Math.max(games[0], games[1]), "Games im Satz").toBeLessThanOrEqual(gamesPerSet);

  // Aufschlag: wechselt nach jedem Game (ein Tiebreak zählt als ein Game).
  const gamesPlayed =
    score.completedSets.reduce((sum, set) => sum + set.games[0] + set.games[1], 0) +
    games[0] +
    games[1];
  const expectedGameServer = gamesPlayed % 2 === 0 ? firstServer : otherPlayer(firstServer);
  if (game.kind === "game") {
    expect(score.server, "Aufschläger im Game").toBe(expectedGameServer);
  } else {
    expect(game.firstServer, "Erster Aufschläger im Tiebreak").toBe(expectedGameServer);
    const pointsPlayed = game.points[0] + game.points[1];
    const switches = Math.floor((pointsPlayed + 1) / 2);
    const expected = switches % 2 === 0 ? game.firstServer : otherPlayer(game.firstServer);
    expect(score.server, "Aufschläger im Tiebreak").toBe(expected);
  }
}

/** Prüft die Ereignisse eines einzelnen Punkts. */
function checkEvents(events: readonly ScoreEvent[]): void {
  const kinds = events.map((event) => event.type);
  expect(kinds.filter((kind) => kind === "changeover").length).toBeLessThanOrEqual(1);
  if (kinds.includes("changeover")) {
    expect(kinds, "Changeover zusammen mit Satzende").not.toContain("setWon");
  }
  expect(kinds.includes("setWon"), "Satzende hat Satzpause oder Matchende").toBe(
    kinds.includes("setBreak") || kinds.includes("matchWon"),
  );
  expect(kinds.includes("setBreak") && kinds.includes("matchWon")).toBe(false);
}

/** Prüft das Endergebnis eines beendeten Matches. */
function checkFinishedMatch(score: MatchScore): void {
  const { setsToWin, gamesPerSet } = score.format;
  const winner = score.winner;
  expect(winner).not.toBeNull();
  if (winner === null) return;

  const sets = getSetsWon(score);
  expect(sets[winner], "Der Sieger hat genau die nötigen Sätze").toBe(setsToWin);
  expect(sets[otherPlayer(winner)]).toBeLessThan(setsToWin);
  expect(score.completedSets.length).toBeLessThanOrEqual(2 * setsToWin - 1);

  for (const set of score.completedSets) {
    const high = Math.max(set.games[0], set.games[1]);
    const low = Math.min(set.games[0], set.games[1]);
    const regular = high === gamesPerSet && low <= gamesPerSet - MIN_LEAD;
    const decidedByTiebreak =
      high === gamesPerSet + 1 && (low === gamesPerSet - 1 || low === gamesPerSet);
    expect(regular || decidedByTiebreak, `Satzergebnis ${String(set.games)}`).toBe(true);
  }

  expect(() => scorePoint(score, 0)).toThrow(MatchFinishedError);
}

function randomFormat(random: ReturnType<typeof createRandom>): ScoringFormat {
  return {
    setsToWin: random.int(1, 3),
    gamesPerSet: random.int(1, 8),
    tiebreakPoints: random.int(1, 10),
  };
}

describe("Invarianten der Zählung", () => {
  it("jedes zufällige Match endet regelkonform und alle Regeln gelten nach jedem Punkt", () => {
    const random = createRandom(20261030);

    for (let run = 0; run < 400; run++) {
      const format = randomFormat(random);
      const firstServer: Player = random.int(0, 1) === 0 ? 0 : 1;
      // Ungleiche Stärke: mal ausgeglichen, mal klar einseitig.
      const strength = random.next();

      let score = createMatchScore(format, firstServer);
      let expectedGamePoints: Pair = [0, 0];
      let lastChangeoverPoint = -10;

      for (let point = 0; score.winner === null; point++) {
        expect(point, "Das Match muss enden").toBeLessThan(MAX_POINTS_PER_MATCH);
        const pointWinner: Player = random.next() < strength ? 0 : 1;

        const before = JSON.stringify(score);
        const update = scorePoint(score, pointWinner);
        expect(JSON.stringify(score), "Eingabe wurde verändert").toBe(before);
        score = update.score;

        checkEvents(update.events);
        const kinds = update.events.map((event) => event.type);

        // Changeovers kommen nie direkt nacheinander.
        if (kinds.includes("changeover")) {
          expect(point, "Changeover direkt nach Changeover").not.toBe(lastChangeoverPoint + 1);
          lastChangeoverPoint = point;
        }

        // Die Punkte im Game bzw. Tiebreak entsprechen den gezählten Punkten.
        if (kinds.includes("gameWon") || kinds.includes("setWon")) {
          expectedGamePoints = [0, 0];
        } else {
          expectedGamePoints =
            pointWinner === 0
              ? [expectedGamePoints[0] + 1, expectedGamePoints[1]]
              : [expectedGamePoints[0], expectedGamePoints[1] + 1];
        }
        expect(score.currentGame.points, "Punktesumme").toEqual(expectedGamePoints);

        if (score.winner === null) {
          checkRunningMatch(score, firstServer);
        }
      }

      checkFinishedMatch(score);
      expect(JSON.parse(JSON.stringify(score)), "JSON-Roundtrip").toEqual(score);
    }
  });

  it("ist deterministisch: gleiche Eingaben ergeben gleiche Ergebnisse", () => {
    const random = createRandom(7);
    const format = randomFormat(random);
    const winners: Player[] = Array.from({ length: 200 }, () => (random.next() < 0.5 ? 0 : 1));

    const run = () => {
      let score = createMatchScore(format, 0);
      const events: ScoreEvent[] = [];
      for (const winner of winners) {
        if (score.winner !== null) break;
        const update = scorePoint(score, winner);
        score = update.score;
        events.push(...update.events);
      }
      return { score, events };
    };

    expect(run()).toEqual(run());
  });
});
