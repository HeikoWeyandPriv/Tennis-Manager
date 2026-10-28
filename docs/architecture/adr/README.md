# Architecture Decision Records (ADRs)

Jede Architekturentscheidung wird als eigene, nummerierte Datei festgehalten.

## Regeln

- **Dateiname:** `NNNN-kurzer-titel.md`, fortlaufend nummeriert.
- **Vorlage:** [`0000-vorlage.md`](0000-vorlage.md)
- **Status:** `vorgeschlagen` → `angenommen` · später ggf. `ersetzt durch NNNN` oder `verworfen`
- **Nie löschen.** Eine überholte Entscheidung wird durch einen neuen ADR ersetzt; der alte bekommt den Status `ersetzt durch NNNN`.
- Ein ADR entsteht **im selben Pull Request** wie die Änderung, die ihn betrifft. Mit dem Merge gilt er als angenommen.
- Neue ADRs werden in die Tabelle unten und in [`../overview.md`](../overview.md) eingetragen.

## Übersicht

| Nr.                                                       | Titel                                                                  | Status     |
| --------------------------------------------------------- | ---------------------------------------------------------------------- | ---------- |
| [0001](0001-architekturentscheidungen-als-adrs.md)        | Architekturentscheidungen als ADRs festhalten                          | angenommen |
| [0002](0002-web-technik-mit-typescript.md)                | Web-Technik mit TypeScript                                             | angenommen |
| [0003](0003-trennung-engine-oberflaeche-darstellung.md)   | Trennung von Engine, Oberfläche und Darstellung                        | angenommen |
| [0004](0004-projektstruktur-pnpm-workspace.md)            | Projektstruktur als pnpm-Workspace                                     | angenommen |
| [0005](0005-react-fuer-die-oberflaeche.md)                | React für die Oberfläche                                               | angenommen |
| [0006](0006-pixijs-fuer-die-match-darstellung.md)         | PixiJS für die Match-Darstellung                                       | angenommen |
| [0007](0007-persistenz-indexeddb-export-versionierung.md) | Persistenz mit IndexedDB, Export/Import und versionierten Spielständen | angenommen |
| [0008](0008-teststrategie.md)                             | Teststrategie                                                          | angenommen |
| [0009](0009-statische-anwendung-ohne-backend.md)          | Statische Anwendung ohne Backend, Auslieferung zurückgestellt          | angenommen |
