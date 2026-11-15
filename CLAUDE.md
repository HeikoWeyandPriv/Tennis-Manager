# CLAUDE.md

Regeln für alle Agenten, die an diesem Repository arbeiten. Kurz halten – diese Datei wird bei jedem Lauf gelesen.

## Projekt

Browserbasierter Tennis-Manager. Hook: **simple Regeln, taktisch komplexe Matches.** Aktueller Fokus: der Match-Loop. Sprache der Dokumentation, Issues und Pull Requests: **Deutsch**.

## Quellen der Wahrheit

| Thema                       | Datei                                              |
| --------------------------- | -------------------------------------------------- |
| Spieldesign (Was und Warum) | `docs/design/` – Einstieg: `docs/design/README.md` |
| Begriffe                    | `docs/design/glossar.md`                           |
| Zahlenwerte                 | `docs/design/balancing.md`, später `config/`       |
| Architektur                 | `docs/architecture/overview.md`                    |
| Architekturentscheidungen   | `docs/architecture/adr/`                           |

## Pflichtregeln

1. **Vor jeder Umsetzung** das zum Issue passende Design-Dokument und alle relevanten ADRs lesen.
2. **Nie stillschweigend abweichen.** Widerspricht eine Aufgabe dem Design oder einem ADR, oder ist etwas unklar: anhalten, im Issue nachfragen und das Label `braucht-entscheidung` setzen.
3. **Keine Architekturentscheidung ohne ADR.** Neue Bibliothek, neue Struktur, neues Muster → neuer ADR im selben Pull Request (Vorlage: `docs/architecture/adr/0000-vorlage.md`).
4. **Design-Änderungen im selben Pull Request dokumentieren**: betroffenes Design-Dokument und `docs/design/entscheidungslog.md` aktualisieren.
5. **Keine Änderung am Repository ohne Issue.** Das gilt für jede Änderung (Dateien, Branches, Labels, Einstellungen), auch für Kleinigkeiten und Folgekorrekturen. Gibt es noch kein passendes Issue, wird **zuerst** eines angelegt (Vorlage „Aufgabe“ oder „Entscheidung“) und erst danach geändert. Jeder Pull Request verweist auf sein Issue (Verweisform siehe Regel 10), das Issue verweist auf den Pull Request, und der Pull Request nutzt die PR-Vorlage.
6. **Nie direkt auf `main` pushen.** Immer Branch + Pull Request. Gemergt wird nur durch den Projektinhaber.
7. **Begriffe aus dem Glossar verwenden**, auch im Code (Bezeichner dürfen englisch sein, müssen aber eindeutig einem Glossarbegriff entsprechen).
8. **Keine Zahlenwerte im Code verstreuen.** Balancing-Werte gehören in Konfiguration.
9. **Scope einhalten.** Nur umsetzen, was das Issue verlangt. Weitere Ideen als neues Issue vorschlagen.
10. **Abnahme durch den Projektinhaber.** Standard: Der Pull Request verweist mit `Bezug: #<nr>` (nie `Closes`) auf das Issue, das Issue bleibt offen. Claude hakt Akzeptanzkriterien nicht ab und schließt das Issue nicht – das macht der Projektinhaber. Claude nennt im Pull Request, wie jedes Kriterium erfüllt wurde. **Ausnahme:** Nur bei Issues mit dem vom Projektinhaber vergebenen Label `auto-schliessen` prüft Claude jedes Akzeptanzkriterium einzeln, hakt es im Issue ab (nur wenn erfüllt) und nutzt `Closes #<nr>`. Ist ein Kriterium nicht erfüllt, bleibt es offen und der Pull Request nutzt `Bezug: #<nr>`.

## Ablauf für ein Issue

Siehe Skill `.claude/skills/issue-umsetzen/SKILL.md`.

## Technik

TypeScript (strikt) · pnpm-Workspace (`packages/engine`, `packages/app`) · React + Vite + Zustand · PixiJS · IndexedDB über Dexie · Vitest, fast-check, Playwright · statisch, ohne Backend. Details und Begründungen: `docs/architecture/overview.md`.

Architektur-Kernregeln (ADR 0003):

- Die Engine importiert nichts aus anderen Paketen und nutzt keine Browser-APIs.
- Die Engine ist deterministisch: kein `Math.random`, keine Systemzeit – nur der Zufallsgenerator mit Seed aus dem Spielzustand.
- Der Spielzustand ist reine, serialisierbare Daten.
- Keine Spiellogik in React-Komponenten, Stores oder der Match-Darstellung.
