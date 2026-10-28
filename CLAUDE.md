# CLAUDE.md

Regeln für alle Agenten, die an diesem Repository arbeiten. Kurz halten – diese Datei wird bei jedem Lauf gelesen.

## Projekt

Browserbasierter Tennis-Manager. Hook: **simple Regeln, taktisch komplexe Matches.** Aktueller Fokus: der Match-Loop. Sprache der Dokumentation, Issues und Pull Requests: **Deutsch**.

## Quellen der Wahrheit

| Thema | Datei |
|---|---|
| Spieldesign (Was und Warum) | `docs/design/` – Einstieg: `docs/design/README.md` |
| Begriffe | `docs/design/glossar.md` |
| Zahlenwerte | `docs/design/balancing.md`, später `config/` |
| Architektur | `docs/architecture/overview.md` |
| Architekturentscheidungen | `docs/architecture/adr/` |

## Pflichtregeln

1. **Vor jeder Umsetzung** das zum Issue passende Design-Dokument und alle relevanten ADRs lesen.
2. **Nie stillschweigend abweichen.** Widerspricht eine Aufgabe dem Design oder einem ADR, oder ist etwas unklar: anhalten, im Issue nachfragen und das Label `braucht-entscheidung` setzen.
3. **Keine Architekturentscheidung ohne ADR.** Neue Bibliothek, neue Struktur, neues Muster → neuer ADR im selben Pull Request (Vorlage: `docs/architecture/adr/0000-vorlage.md`).
4. **Design-Änderungen im selben Pull Request dokumentieren**: betroffenes Design-Dokument und `docs/design/entscheidungslog.md` aktualisieren.
5. **Jeder Pull Request verweist auf ein Issue** (`Closes #<nr>`) und nutzt die PR-Vorlage.
6. **Nie direkt auf `main` pushen.** Immer Branch + Pull Request. Gemergt wird nur durch den Projektinhaber.
7. **Begriffe aus dem Glossar verwenden**, auch im Code (Bezeichner dürfen englisch sein, müssen aber eindeutig einem Glossarbegriff entsprechen).
8. **Keine Zahlenwerte im Code verstreuen.** Balancing-Werte gehören in Konfiguration.
9. **Scope einhalten.** Nur umsetzen, was das Issue verlangt. Weitere Ideen als neues Issue vorschlagen.

## Ablauf für ein Issue

Siehe Skill `.claude/skills/issue-umsetzen/SKILL.md`.

## Technik

Noch nicht festgelegt. Wird in ADRs entschieden; bis dahin keinen Produktionscode anlegen.
