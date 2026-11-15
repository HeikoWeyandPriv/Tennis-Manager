# Tennis Manager

Ein browserbasierter Tennis-Manager: Man steuert die Karriere eines einzelnen Spielers und erlebt jedes Match als taktisches Duell in der Draufsicht.

**Der Hook:** simple Regeln, taktisch komplexe Matches.

## Status

Frühe Entwicklungsphase. Spieldesign und Architektur sind festgelegt, das technische Grundgerüst steht. Die Spiellogik folgt.

## Dokumentation

| Bereich                          | Ort                                                         |
| -------------------------------- | ----------------------------------------------------------- |
| Spieldesign                      | [`docs/design/`](docs/design/README.md)                     |
| Architektur                      | [`docs/architecture/`](docs/architecture/overview.md)       |
| Architekturentscheidungen (ADRs) | [`docs/architecture/adr/`](docs/architecture/adr/README.md) |
| Regeln für Agenten               | [`CLAUDE.md`](CLAUDE.md)                                    |

## Entwicklung

### Voraussetzungen

- [Node.js](https://nodejs.org/) 22 oder neuer (siehe `.nvmrc`)
- [pnpm](https://pnpm.io/) 10 – am einfachsten über Corepack: `corepack enable`

### Installation

```bash
pnpm install
```

### Befehle

Alle Befehle werden im Wurzelverzeichnis ausgeführt.

| Befehl              | Zweck                                                    |
| ------------------- | -------------------------------------------------------- |
| `pnpm dev`          | Startet die App im Entwicklungsserver                    |
| `pnpm build`        | Baut die App als statische Dateien (`packages/app/dist`) |
| `pnpm test`         | Führt alle Tests aus                                     |
| `pnpm typecheck`    | Prüft die Typen aller Pakete                             |
| `pnpm lint`         | Prüft den Code mit ESLint                                |
| `pnpm format`       | Formatiert alle Dateien mit Prettier                     |
| `pnpm format:check` | Prüft die Formatierung, ohne zu ändern                   |

Die CI führt bei jedem Pull Request Formatierung, Typprüfung, Lint, Tests und Build aus.

### Pakete

| Paket             | Inhalt                                                                        |
| ----------------- | ----------------------------------------------------------------------------- |
| `packages/engine` | Spiellogik – reines TypeScript, ohne Browser-APIs, deterministisch (ADR 0003) |
| `packages/app`    | Oberfläche mit React und Vite                                                 |

## Arbeitsweise

- **Alle Arbeit läuft über GitHub Issues.** Jeder Pull Request verweist auf ein Issue.
- **Alle Entscheidungen landen als Datei im Repository**: Designentscheidungen in `docs/design/`, Architekturentscheidungen als ADR in `docs/architecture/adr/`.
- **`main` ist geschützt.** Änderungen gelangen nur über Pull Requests dorthin.
- Die Umsetzung erfolgt weitgehend agentisch mit Claude Code. Die Regeln dafür stehen in [`CLAUDE.md`](CLAUDE.md).
- **Automatische Umsetzung:** Aufgaben-Issues mit dem Label `claude-umsetzen` setzt Claude per GitHub Action um und öffnet einen Pull Request ([ADR 0010](docs/architecture/adr/0010-automatische-issue-umsetzung.md)). Entscheidungs-Issues (`braucht-entscheidung`) werden per Label `claude-antworten` im Issue geklärt und per `entscheidung-uebernehmen` in die Dokumentation übernommen ([ADR 0011](docs/architecture/adr/0011-entscheidungs-issues-per-label.md)). Die Auslöser-Labels setzt nur der Projektinhaber.

Diese Labels steuern den Ablauf:

| Label                      | Bedeutung                                                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `claude-umsetzen`          | Der Projektinhaber gibt das Issue zur automatischen Umsetzung frei; Claude öffnet einen Pull Request und mergt nie selbst.                                                                    |
| `auto-schliessen`          | Nur der Projektinhaber setzt es: Claude hakt erfüllte Akzeptanzkriterien ab und der Pull Request nutzt `Closes #<nr>`; sonst gilt `Bezug: #<nr>`.                                             |
| `braucht-entscheidung`     | Das Issue ist eine offene Entscheidung oder unklar: Claude fragt nach und setzt keinen Code um. Geklärt wird mit `claude-antworten`.                                                          |
| `claude-antworten`         | Der Projektinhaber meldet neue Infos im Issue: Claude antwortet im Issue und pflegt den Kommentar „Stand der Entscheidung“, ändert aber keine Dateien. Das Label wird nach dem Lauf entfernt. |
| `entscheidung-uebernehmen` | Nur bei `braucht-entscheidung`: Claude übernimmt den Stand der Entscheidung per Pull Request in Design-Dokumente und Entscheidungslog. Das Label wird nach dem Lauf entfernt.                 |
| `claude-hat-geantwortet`   | Claude setzt es nach jedem erfolgreichen Lauf von `claude-antworten` und `entscheidung-uebernehmen`: Es gibt einen neuen Stand zum Ansehen. Zum Filtern gedacht.                              |
