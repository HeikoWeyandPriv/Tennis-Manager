# Architekturüberblick

> Status: **offen**. Die Architektur wird als Nächstes festgelegt. Jede Entscheidung wird als ADR in [`adr/`](adr/README.md) festgehalten und hier zusammengefasst.

## Leitlinien aus dem Design

Diese Anforderungen ergeben sich bereits aus dem Spieldesign und sind bei allen Architekturentscheidungen zu berücksichtigen:

- **Browserbasiert.** Das Spiel läuft im Browser.
- **Trennung von Logik und Darstellung.** Die Punktsimulation berechnet Ergebnisse in Zonen und Zuständen; die Darstellung animiert sie nur (siehe [Darstellung](../design/06-darstellung.md)).
- **Jeder Punkt wird vollständig berechnet**, unabhängig vom Ansichtsmodus (siehe [Match-Loop](../design/01-match-loop.md)).
- **Balancing-Werte getrennt vom Code**, damit sie ohne Codeänderung angepasst werden können (siehe [Balancing](../design/balancing.md)).
- **Gute Testbarkeit der Simulation**, damit agentische Entwicklung abgesichert ist.

## Bausteine

_Folgt._

## Entscheidungen

| ADR | Titel | Status |
|---|---|---|
| [0001](adr/0001-architekturentscheidungen-als-adrs.md) | Architekturentscheidungen als ADRs festhalten | angenommen |
