/**
 * Feste Regeln der Zählung.
 *
 * Diese Werte beschreiben die übliche Logik des Aufschlagspiels und sind bewusst **keine**
 * Parameter eines Matches: Sie gelten für jedes Zählformat. Es sind Spielregeln und keine
 * Balancing-Werte (siehe `docs/design/balancing.md`). Alles, was von Match zu Match variieren
 * darf, steht im Zählformat (`format.ts`).
 */

/** Punkte, die für ein Game nötig sind (0 / 15 / 30 / 40 und der Punkt zum Gewinn). */
export const POINTS_TO_WIN_GAME = 4;

/** Mindestvorsprung für Game, Satz und Tiebreak. */
export const MIN_LEAD = 2;

/** Anzeige der ersten Punkte im Game. Index = Anzahl gewonnener Punkte. */
export const GAME_POINT_LABELS = ["0", "15", "30", "40"] as const;

/** Anzeige für den Punkt nach einem Einstand. */
export const ADVANTAGE_LABEL = "Vorteil";

/** Ab dieser Punktzahl beider Spieler gilt im Game Einstand bzw. Vorteil. */
export const DEUCE_FROM_POINTS = POINTS_TO_WIN_GAME - 1;

/** Changeover nach dem 1. Game eines Satzes ... */
export const CHANGEOVER_AFTER_FIRST_GAME = 1;

/** ... und danach nach jedem zweiten Game. */
export const CHANGEOVER_GAME_INTERVAL = 2;

/** Im Tiebreak: Changeover alle 6 Punkte. */
export const TIEBREAK_CHANGEOVER_INTERVAL = 6;

/** Im Tiebreak: Der Aufschlag wechselt nach dem ersten Punkt und dann alle 2 Punkte. */
export const TIEBREAK_SERVE_INTERVAL = 2;
