/**
 * Öffentliche Schnittstelle der Engine.
 *
 * Alles, was andere Pakete aus der Engine verwenden dürfen, wird hier exportiert.
 * Regeln: siehe ADR 0003 (keine Browser-APIs, deterministisch, serialisierbarer Zustand).
 */

/** Platzhalter bis zur ersten echten Engine-Funktion. */
export const ENGINE_NAME = "Tennis Manager Engine";

export * from "./scoring/index";
