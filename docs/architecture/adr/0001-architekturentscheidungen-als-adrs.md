# 0001 – Architekturentscheidungen als ADRs festhalten

- **Status:** angenommen
- **Datum:** 2026-10-28
- **Issue:** –

## Kontext

Das Projekt soll weitgehend agentisch mit Claude Code entwickelt werden. Damit Agenten getroffene Entscheidungen zuverlässig beachten, müssen diese nachvollziehbar, auffindbar und im Repository versioniert sein. Gleichzeitig soll der Projektinhaber jederzeit sehen können, warum etwas so gebaut wurde.

## Betrachtete Optionen

1. **Ein zentrales Architekturdokument** – einfach, aber Änderungen überschreiben frühere Begründungen.
2. **Entscheidungen nur in Issues und Pull Requests** – keine zusätzliche Pflege, aber nicht im Repository selbst und schwer auffindbar.
3. **Architecture Decision Records** – eine Datei pro Entscheidung, Historie bleibt erhalten.

## Entscheidung

Architekturentscheidungen werden als ADRs in `docs/architecture/adr/` festgehalten. `docs/architecture/overview.md` fasst den aktuellen Stand zusammen.

## Begründung

ADRs sind klein, gezielt lesbar und bewahren die Begründung auch dann, wenn eine Entscheidung später ersetzt wird. Agenten können gezielt die relevanten ADRs lesen.

## Konsequenzen

- Jede Architekturentscheidung braucht einen ADR im selben Pull Request (siehe `CLAUDE.md`).
- Designentscheidungen werden weiterhin in `docs/design/entscheidungslog.md` festgehalten, nicht als ADR.
