---
name: entscheidung-uebernehmen
description: Übernimmt den geklärten Stand eines Entscheidungs-Issues per Pull Request in Design-Dokumente, Entscheidungslog und offene Fragen. Verwenden, wenn der Projektinhaber das Label `entscheidung-uebernehmen` gesetzt hat. Ändert nur Dokumentation, keinen Code.
---

# Entscheidung übernehmen

Festschreiben einer geklärten Entscheidung in der Dokumentation. Die Pflichtregeln aus `CLAUDE.md` gelten immer. Ändert nur Dokumentation, keinen Code und keine Konfiguration.

## 1. Kontext lesen

- Issue-Text und Kommentare nur aus `.claude-kontext/issue.json` und `.claude-kontext/kommentare.jsonl` lesen (CLAUDE.md, Regel 11).
- Den Kommentar `<!-- stand-der-entscheidung -->` und alle **neueren** Kommentare des Projektinhabers lesen. Was der Projektinhaber nach dem letzten „Stand der Entscheidung“ geschrieben hat, hat Vorrang.
- Das betroffene Design-Dokument, `docs/design/glossar.md`, `docs/design/entscheidungslog.md`, `docs/design/offene-fragen.md` und alle ADRs lesen, die den Bereich berühren.

## 2. Vorbedingungen prüfen

Anhalten, **keinen** Branch und **keinen** Pull Request anlegen und stattdessen im Issue nachfragen (`gh issue comment`), wenn:

- es keinen „Stand der Entscheidung“ gibt oder die Festlegungen nicht eindeutig sind,
- Punkte offen sind, ohne die sich die Entscheidung nicht festschreiben lässt,
- die Entscheidung dem Design, dem Glossar oder einer ADR widerspricht (Regel 2).

## 3. Übernehmen

- Branch: `issue-<nr>-<kurzer-titel>`
- Betroffenes Design-Dokument aktualisieren, mit den Begriffen aus dem Glossar.
- `docs/design/entscheidungslog.md` ergänzen: neue Zeile im passenden Bereich, im bestehenden Tabellenformat, neueste oben, mit kurzer Begründung (Regel 4).
- `docs/design/offene-fragen.md` anpassen: erledigte Fragen entfernen oder auf den verbleibenden Rest kürzen.
- Neue Begriffe ins Glossar aufnehmen. Zahlenwerte nur dann in `docs/design/balancing.md`, wenn sie ausdrücklich entschieden sind.
- Ist die Entscheidung eine Architekturentscheidung: ADR aus `docs/architecture/adr/0000-vorlage.md` anlegen und in `docs/architecture/adr/README.md` und `docs/architecture/overview.md` eintragen (Regel 3).
- **Nur übernehmen, was ausdrücklich entschieden ist.** Alles andere kommt in den Abschnitt „Offene Punkte“ des Pull Requests. Nichts dazuerfinden, keinen Code schreiben (Regel 9).

## 4. Absichern

- `pnpm format` ausführen, danach `pnpm format:check`.
- Links und Dateinamen prüfen. Prüfen, dass Design-Dokument, Entscheidungslog und offene Fragen zueinander passen und nichts Widersprüchliches stehen bleibt.

## 5. Abgeben

- Pull Request gegen `main` mit der PR-Vorlage, Checkliste ehrlich ausgefüllt.
- Verweis auf das Issue nach CLAUDE.md, Regel 10 (Standard `Bezug: #<nr>`).
- Im Pull Request zu jedem Punkt aus dem „Stand der Entscheidung“ nennen, wo er übernommen wurde. Offene Punkte nennen.
- Im Issue mit dem Link zum Pull Request kommentieren.
- Das Issue nicht schließen, `braucht-entscheidung` nicht entfernen, nicht selbst mergen.
