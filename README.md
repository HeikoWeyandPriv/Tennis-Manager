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
