import { describe, expect, it } from "vitest";
import { STANDARD_SCORING_FORMAT, validateScoringFormat } from "./format";
import type { ScoringFormat } from "./format";
import { createMatchScore } from "./score";

describe("Zählformat", () => {
  it("beschreibt die Variante Standard: 2 Gewinnsätze, 6 Games, Tiebreak bis 7", () => {
    expect(STANDARD_SCORING_FORMAT).toEqual({ setsToWin: 2, gamesPerSet: 6, tiebreakPoints: 7 });
  });

  it("akzeptiert abweichende, gültige Formate", () => {
    const formats: ScoringFormat[] = [
      { setsToWin: 3, gamesPerSet: 6, tiebreakPoints: 7 },
      { setsToWin: 1, gamesPerSet: 4, tiebreakPoints: 5 },
      { setsToWin: 2, gamesPerSet: 6, tiebreakPoints: 10 },
    ];
    for (const format of formats) {
      expect(() => validateScoringFormat(format)).not.toThrow();
    }
  });

  it.each([
    { setsToWin: 0, gamesPerSet: 6, tiebreakPoints: 7 },
    { setsToWin: 2, gamesPerSet: 0, tiebreakPoints: 7 },
    { setsToWin: 2, gamesPerSet: 6, tiebreakPoints: 0 },
    { setsToWin: -1, gamesPerSet: 6, tiebreakPoints: 7 },
    { setsToWin: 2.5, gamesPerSet: 6, tiebreakPoints: 7 },
    { setsToWin: 2, gamesPerSet: Number.NaN, tiebreakPoints: 7 },
    { setsToWin: 2, gamesPerSet: 6, tiebreakPoints: Number.POSITIVE_INFINITY },
  ])("lehnt ungültige Werte ab: %o", (format) => {
    expect(() => validateScoringFormat(format)).toThrow(RangeError);
    expect(() => createMatchScore(format, 0)).toThrow(RangeError);
  });

  it("kopiert das Format in den Spielstand", () => {
    const format = { ...STANDARD_SCORING_FORMAT };
    const score = createMatchScore(format, 0);
    expect(score.format).toEqual(format);
    expect(score.format).not.toBe(format);
  });
});
