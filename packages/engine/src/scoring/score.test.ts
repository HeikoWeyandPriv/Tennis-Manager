import { describe, expect, it } from "vitest";
import { gamePointLabels, isDeuce } from "./display";
import { STANDARD_SCORING_FORMAT } from "./format";
import type { ScoringFormat } from "./format";
import { MatchFinishedError, createMatchScore, getSetsWon, scorePoint } from "./score";
import { alternating, deepFreeze, play, playGames, winGame, winSet } from "./test-helpers";
import type { MatchScore, Player } from "./types";

const start = (firstServer: Player = 0): MatchScore =>
  createMatchScore(STANDARD_SCORING_FORMAT, firstServer);

/** Spielt 12 Games abwechselnd: Stand 6:6, der Tiebreak beginnt. */
const atTiebreak = (): MatchScore => playGames(start(), alternating(12)).score;

const types = (events: readonly { type: string }[]) => events.map((event) => event.type);

describe("Game", () => {
  it("zählt 0, 15, 30, 40", () => {
    const s = start();
    expect(gamePointLabels(s)).toEqual(["0", "0"]);
    expect(gamePointLabels(play(s, [0]).score)).toEqual(["15", "0"]);
    expect(gamePointLabels(play(s, [0, 0]).score)).toEqual(["30", "0"]);
    expect(gamePointLabels(play(s, [0, 0, 0]).score)).toEqual(["40", "0"]);
    expect(gamePointLabels(play(s, [0, 0, 0, 1]).score)).toEqual(["40", "15"]);
  });

  it("gewinnt das Game mit dem vierten Punkt, wenn der Gegner höchstens 30 hat", () => {
    const update = winGame(start(), 0);
    expect(update.events[0]).toEqual({ type: "gameWon", winner: 0 });
    expect(update.score.currentSetGames).toEqual([1, 0]);
    expect(update.score.currentGame).toEqual({ kind: "game", points: [0, 0] });
  });

  it("gewinnt bei 40:30 mit dem nächsten Punkt", () => {
    const at4030 = play(start(), [0, 0, 0, 1, 1]).score;
    expect(gamePointLabels(at4030)).toEqual(["40", "30"]);
    const update = scorePoint(at4030, 0);
    expect(types(update.events)).toContain("gameWon");
  });

  it("führt bei 40:40 zu Einstand und wechselt zwischen Vorteil und Einstand", () => {
    const deuce = play(start(), [0, 0, 0, 1, 1, 1]).score;
    expect(isDeuce(deuce)).toBe(true);
    expect(gamePointLabels(deuce)).toEqual(["40", "40"]);

    const advantage = scorePoint(deuce, 0).score;
    expect(isDeuce(advantage)).toBe(false);
    expect(gamePointLabels(advantage)).toEqual(["Vorteil", "40"]);

    const deuceAgain = scorePoint(advantage, 1).score;
    expect(isDeuce(deuceAgain)).toBe(true);
    expect(gamePointLabels(deuceAgain)).toEqual(["40", "40"]);

    const advantageSecond = scorePoint(deuceAgain, 1).score;
    expect(gamePointLabels(advantageSecond)).toEqual(["40", "Vorteil"]);
  });

  it("entscheidet erst bei zwei Punkten Vorsprung nach mehrfachem Einstand", () => {
    // 3:3, dann abwechselnd Vorteil und Einstand, am Ende zwei Punkte in Folge für Spieler 1
    const afterDeuces = play(start(), [0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1]).score;
    expect(isDeuce(afterDeuces)).toBe(true);
    expect(afterDeuces.currentSetGames).toEqual([0, 0]);

    const advantage = scorePoint(afterDeuces, 1);
    expect(advantage.events).toEqual([]);
    const gameOver = scorePoint(advantage.score, 1);
    expect(types(gameOver.events)).toContain("gameWon");
    expect(gameOver.events[0]).toEqual({ type: "gameWon", winner: 1 });
  });
});

describe("Satz", () => {
  it("wird 6:0 gewonnen und endet mit Satzpause", () => {
    const fiveGames = playGames(start(), [0, 0, 0, 0, 0]).score;
    const last = winGame(fiveGames, 0);
    expect(last.events).toEqual([
      { type: "gameWon", winner: 0 },
      { type: "setWon", winner: 0, games: [6, 0] },
      { type: "setBreak" },
    ]);
    expect(last.score.completedSets).toEqual([{ games: [6, 0] }]);
    expect(last.score.currentSetGames).toEqual([0, 0]);
    expect(last.score.winner).toBeNull();
  });

  it("wird 6:4 gewonnen", () => {
    const after44 = playGames(start(), alternating(8)).score;
    const after54 = winGame(after44, 0);
    expect(after54.score.currentSetGames).toEqual([5, 4]);
    const last = winGame(after54.score, 0);
    expect(last.events).toContainEqual({ type: "setWon", winner: 0, games: [6, 4] });
  });

  it("ist bei 6:5 noch nicht entschieden und wird 7:5 gewonnen", () => {
    const at55 = playGames(start(), alternating(10)).score;
    const at65 = winGame(at55, 0);
    expect(at65.score.currentSetGames).toEqual([6, 5]);
    expect(types(at65.events)).not.toContain("setWon");

    const at75 = winGame(at65.score, 0);
    expect(at75.events).toContainEqual({ type: "setWon", winner: 0, games: [7, 5] });
  });

  it("führt bei 6:6 in den Tiebreak", () => {
    const score = atTiebreak();
    expect(score.currentSetGames).toEqual([6, 6]);
    expect(score.currentGame.kind).toBe("tiebreak");
    expect(score.currentGame.points).toEqual([0, 0]);
  });
});

describe("Tiebreak", () => {
  it("wird bei 7:5 gewonnen; der Satz endet 7:6", () => {
    const tiebreak = atTiebreak();
    const at55 = play(tiebreak, alternating(10)).score;
    const last = play(at55, [0, 0]);
    expect(last.events).toEqual([
      { type: "setWon", winner: 0, games: [7, 6] },
      { type: "setBreak" },
    ]);
    expect(last.score.completedSets).toEqual([{ games: [7, 6] }]);
  });

  it("ist bei 7:6 noch nicht entschieden und wird mit 8:6 gewonnen", () => {
    const at66 = play(atTiebreak(), alternating(12)).score;
    const at76 = scorePoint(at66, 0);
    expect(at76.events).toEqual([]);
    expect(at76.score.currentGame.kind).toBe("tiebreak");

    const at86 = scorePoint(at76.score, 0);
    expect(at86.events).toContainEqual({ type: "setWon", winner: 0, games: [7, 6] });
  });

  it("geht über 7 Punkte hinaus, bis zwei Punkte Vorsprung bestehen (12:10)", () => {
    const at1010 = play(atTiebreak(), alternating(20)).score;
    expect(at1010.currentGame.points).toEqual([10, 10]);
    const at1110 = scorePoint(at1010, 0).score;
    expect(at1110.currentGame.kind).toBe("tiebreak");
    const done = scorePoint(at1110, 0);
    expect(done.events).toContainEqual({ type: "setWon", winner: 0, games: [7, 6] });
  });

  it("zeigt die gewonnenen Punkte als Zahlen", () => {
    const score = play(atTiebreak(), [0, 0, 1]).score;
    expect(gamePointLabels(score)).toEqual(["2", "1"]);
  });
});

describe("Aufschlag", () => {
  it("startet mit dem angegebenen ersten Aufschläger", () => {
    expect(start(0).server).toBe(0);
    expect(start(1).server).toBe(1);
  });

  it("wechselt nach jedem Game", () => {
    const servers: Player[] = [];
    let score = start();
    for (const winner of [0, 0, 1, 0] as const) {
      score = winGame(score, winner).score;
      servers.push(score.server);
    }
    expect(servers).toEqual([1, 0, 1, 0]);
  });

  it("bleibt innerhalb eines Games gleich", () => {
    const score = play(start(), [0, 1, 0]).score;
    expect(score.server).toBe(0);
  });

  it("schlägt im Tiebreak zuerst auf und wechselt dann alle zwei Punkte", () => {
    const tiebreak = atTiebreak();
    expect(tiebreak.server).toBe(0);
    expect(tiebreak.currentGame).toMatchObject({ kind: "tiebreak", firstServer: 0 });

    const servers: Player[] = [];
    let score = tiebreak;
    for (const winner of alternating(12)) {
      score = scorePoint(score, winner).score;
      servers.push(score.server);
    }
    // Aufschläger für den jeweils nächsten Punkt: Punkt 1 schlägt Spieler 0 auf, dann 1, 1, 0, 0 ...
    expect(servers).toEqual([1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0]);
  });

  it("lässt im Satz nach dem Tiebreak den Spieler aufschlagen, der im Tiebreak zuerst zurückgeschlagen hat", () => {
    const afterTiebreak = play(atTiebreak(), [...alternating(10), 0, 0]).score;
    expect(afterTiebreak.completedSets).toHaveLength(1);
    // Im Tiebreak hat Spieler 0 zuerst aufgeschlagen, also schlägt im neuen Satz Spieler 1 auf.
    expect(afterTiebreak.server).toBe(1);
  });
});

describe("Changeover und Satzpause", () => {
  it("entsteht nach dem 1. Game und danach nach jedem zweiten Game", () => {
    let score = start();
    const hadChangeover: boolean[] = [];
    for (let game = 0; game < 5; game++) {
      const update = winGame(score, 0);
      score = update.score;
      hadChangeover.push(types(update.events).includes("changeover"));
    }
    // nach Game 1, 3 und 5 – nicht nach Game 2 und 4
    expect(hadChangeover).toEqual([true, false, true, false, true]);
  });

  it("entsteht am Satzende nicht; stattdessen folgt die Satzpause", () => {
    const fiveGames = playGames(start(), [0, 0, 0, 0, 0]).score;
    const last = winGame(fiveGames, 0);
    expect(types(last.events)).toEqual(["gameWon", "setWon", "setBreak"]);
  });

  it("zählt im nächsten Satz wieder ab dem 1. Game", () => {
    const secondSet = winSet(start(), 0).score;
    expect(types(winGame(secondSet, 0).events)).toEqual(["gameWon", "changeover"]);
  });

  it("entsteht im Tiebreak alle 6 Punkte", () => {
    let score = atTiebreak();
    const changeoverAt: number[] = [];
    alternating(12).forEach((winner, index) => {
      const update = scorePoint(score, winner);
      score = update.score;
      if (types(update.events).includes("changeover")) changeoverAt.push(index + 1);
    });
    expect(changeoverAt).toEqual([6, 12]);
  });

  it("entsteht nicht beim Wechsel in den Tiebreak (nach dem 12. Game)", () => {
    const at55 = playGames(start(), alternating(10)).score;
    const at65 = winGame(at55, 0).score;
    const toTiebreak = winGame(at65, 1);
    expect(types(toTiebreak.events)).toEqual(["gameWon"]);
  });
});

describe("Matchende", () => {
  it("gewinnt, wer zwei Sätze gewonnen hat (2:0), ohne Satzpause", () => {
    const afterFirstSet = winSet(start(), 0);
    expect(types(afterFirstSet.events)).toContain("setBreak");
    expect(afterFirstSet.score.winner).toBeNull();

    const fiveGames = playGames(afterFirstSet.score, [0, 0, 0, 0, 0]).score;
    const last = winGame(fiveGames, 0);
    expect(last.events).toEqual([
      { type: "gameWon", winner: 0 },
      { type: "setWon", winner: 0, games: [6, 0] },
      { type: "matchWon", winner: 0 },
    ]);
    expect(last.score.winner).toBe(0);
    expect(getSetsWon(last.score)).toEqual([2, 0]);
  });

  it("gewinnt nach 1:1 in Sätzen im dritten Satz (2:1)", () => {
    let score = winSet(start(), 0).score;
    score = winSet(score, 1).score;
    expect(score.winner).toBeNull();
    expect(getSetsWon(score)).toEqual([1, 1]);

    const final = winSet(score, 0).score;
    expect(final.winner).toBe(0);
    expect(getSetsWon(final)).toEqual([2, 1]);
    expect(final.completedSets).toHaveLength(3);
  });

  it("lehnt Punkte nach dem Matchende ab", () => {
    let score = winSet(start(), 1).score;
    score = winSet(score, 1).score;
    expect(score.winner).toBe(1);
    expect(() => scorePoint(score, 0)).toThrow(MatchFinishedError);
  });
});

describe("Zählformat als Parameter", () => {
  const custom = (format: ScoringFormat) => createMatchScore(format, 0);

  it("nutzt die Anzahl der Games pro Satz und den Tiebreak-Wert des Formats", () => {
    const format: ScoringFormat = { setsToWin: 1, gamesPerSet: 4, tiebreakPoints: 5 };
    // 4:4 führt in den Tiebreak
    const at44 = playGames(custom(format), alternating(8)).score;
    expect(at44.currentGame.kind).toBe("tiebreak");
    // Im Tiebreak bis 5 reicht 5:4 nicht, erst 6:4 entscheidet
    const tiebreakAt44 = play(at44, [0, 0, 0, 1, 1, 1, 0, 1]).score;
    expect(tiebreakAt44.currentGame.points).toEqual([4, 4]);
    const at54 = scorePoint(tiebreakAt44, 0);
    expect(at54.events).toEqual([]);
    const won = scorePoint(at54.score, 0);
    expect(won.events).toContainEqual({ type: "setWon", winner: 0, games: [5, 4] });
    expect(won.score.winner).toBe(0);
  });

  it("entscheidet den Satz bei 4:2 mit vier Games pro Satz", () => {
    const format: ScoringFormat = { setsToWin: 1, gamesPerSet: 4, tiebreakPoints: 7 };
    const at22 = playGames(custom(format), alternating(4)).score;
    const at32 = winGame(at22, 0).score;
    expect(at32.currentSetGames).toEqual([3, 2]);
    expect(at32.winner).toBeNull();
    const at42 = winGame(at32, 0);
    expect(at42.events).toContainEqual({ type: "setWon", winner: 0, games: [4, 2] });
    expect(at42.score.winner).toBe(0);
  });

  it("endet bei einem Gewinnsatz nach dem ersten Satz", () => {
    const format: ScoringFormat = { setsToWin: 1, gamesPerSet: 6, tiebreakPoints: 7 };
    const score = winSet(custom(format), 1).score;
    expect(score.winner).toBe(1);
  });

  it("braucht bei drei Gewinnsätzen drei gewonnene Sätze", () => {
    const format: ScoringFormat = { setsToWin: 3, gamesPerSet: 6, tiebreakPoints: 7 };
    let score = custom(format);
    score = winSet(score, 0).score;
    score = winSet(score, 0).score;
    expect(score.winner).toBeNull();
    score = winSet(score, 1).score;
    score = winSet(score, 0).score;
    expect(score.winner).toBe(0);
    expect(getSetsWon(score)).toEqual([3, 1]);
  });

  it("lässt die Aufschlaglogik bei jedem Format gleich", () => {
    const format: ScoringFormat = { setsToWin: 2, gamesPerSet: 3, tiebreakPoints: 3 };
    const servers: Player[] = [];
    let score = createMatchScore(format, 1);
    for (const winner of [0, 1, 0] as const) {
      score = winGame(score, winner).score;
      servers.push(score.server);
    }
    expect(servers).toEqual([0, 1, 0]);
  });
});

describe("Spielstand als Daten", () => {
  it("lässt sich als JSON speichern und ohne Unterschied weiterspielen", () => {
    const winners: Player[] = [0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0];
    const half = play(start(), winners).score;
    const restored = JSON.parse(JSON.stringify(half)) as MatchScore;
    expect(restored).toEqual(half);

    const next: Player[] = [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1];
    const fromOriginal = play(half, next);
    const fromRestored = play(restored, next);
    expect(fromRestored).toEqual(fromOriginal);
  });

  it("verändert den übergebenen Spielstand nicht", () => {
    const frozen = deepFreeze(play(start(), [0, 0, 1, 0, 0]).score);
    const snapshot = JSON.stringify(frozen);
    expect(() => scorePoint(frozen, 0)).not.toThrow();
    expect(JSON.stringify(frozen)).toBe(snapshot);
  });
});
