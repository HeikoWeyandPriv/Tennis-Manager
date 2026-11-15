# 0011 – Entscheidungs-Issues per Label klären und in die Dokumentation übernehmen

- **Status:** vorgeschlagen
- **Datum:** 2026-11-15
- **Issue:** #31

## Kontext

Entscheidungs-Issues (Design und fachliche Klärung, Label `braucht-entscheidung`) wurden bisher im Dialog mit Claude Code bearbeitet. Sie sollen ähnlich wie Umsetzungs-Issues (ADR 0010) über Labels gesteuert werden: Claude antwortet im Issue, und erst auf ausdrückliche Freigabe wird der Stand per Pull Request in die Dokumentation übernommen. Das Repository ist öffentlich, Kommentare kann jeder schreiben.

## Betrachtete Optionen

1. **Zwei Labels, zwei Workflows, zwei Skills** – Klären (nur Issues) und Übernehmen (Pull Request) getrennt.
2. **Ein Workflow, ein Skill mit zwei Modi** – weniger Dateien, aber der Dialog bekäme unnötige Schreibrechte.
3. **Auslösen per `@claude`-Kommentar** – natürlicher Dialog, aber leichter versehentlich ausgelöst und im öffentlichen Repository schwerer abzusichern.

## Entscheidung

Option 1.

- Label `claude-antworten`: Workflow `claude-entscheidung-klaeren.yml`, Skill `entscheidung-klaeren`. Claude beantwortet Fragen im Issue und pflegt einen Kommentar „Stand der Entscheidung“. Der Lauf nutzt das `GITHUB_TOKEN` mit Leserechten auf Dateien und kann daher nichts im Repository ändern.
- Label `entscheidung-uebernehmen`: Workflow `claude-entscheidung-uebernehmen.yml`, Skill `entscheidung-uebernehmen`. Läuft nur bei Issues mit `braucht-entscheidung`. Claude übernimmt den Stand in Design-Dokument, Entscheidungslog und offene Fragen und öffnet einen Pull Request. Dieser Lauf nutzt das Token der Claude-App, damit der Pull Request die CI startet.
- Beide Auslöser-Labels setzt nur der Projektinhaber und entfernt der Workflow nach erfolgreichem Lauf. Stattdessen setzt er `claude-hat-geantwortet` zum Filtern. Bei einem Fehler bleibt das Auslöser-Label stehen.
- Gesteuert wird ausschließlich über Labels. Kommentare lösen nichts aus.
- Ein Skript (`.github/scripts/kontext-vorbereiten.sh`) schreibt Issue-Text und Kommentare vor dem Lauf nach `.claude-kontext/`, gefiltert auf den Projektinhaber, `claude[bot]` und `github-actions[bot]`. Die Skills lesen nur von dort (CLAUDE.md, Regel 11).

## Begründung

Klären und Festschreiben haben unterschiedliche Ziele und brauchen unterschiedliche Rechte. Ein reiner Dialoglauf ohne Schreibrechte ist günstig und sicher. Das Filtern der Kommentare vor dem Lauf schützt im öffentlichen Repository davor, dass fremde Texte als Anweisung wirken. Labels machen jeden Schritt zu einer bewussten Handlung des Projektinhabers.

## Konsequenzen

- Zwei weitere Workflows und Skills, ein Hilfsskript, drei neue Labels (`claude-antworten`, `entscheidung-uebernehmen`, `claude-hat-geantwortet`).
- Kommentare von Claude im Klärungs-Workflow erscheinen unter `github-actions[bot]` (sein `GITHUB_TOKEN`), nicht unter `claude[bot]`. Beide gelten als vertrauenswürdig.
- Jede Antwortrunde ist ein Lauf und verbraucht das Nutzungskontingent des Claude-Abos.
- Der Workflow zu `issue-umsetzen` filtert Kommentare nicht per Skript, sondern nur per Anweisung im Skill (Regel 11). Das Skript könnte dort später ebenfalls eingebunden werden.
- Die Nacharbeit an Pull Requests nach einem Review ist noch offen (#32) und wird in einem eigenen ADR oder als Ergänzung hier festgehalten.
