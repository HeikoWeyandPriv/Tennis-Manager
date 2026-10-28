# Tennis Manager

Ein browserbasierter Tennis-Manager: Man steuert die Karriere eines einzelnen Spielers und erlebt jedes Match als taktisches Duell in der Draufsicht.

**Der Hook:** simple Regeln, taktisch komplexe Matches.

## Status

Konzeptphase. Das Spieldesign ist in Arbeit, die Architektur wird als Nächstes festgelegt. Es gibt noch keinen Code.

## Dokumentation

| Bereich | Ort |
|---|---|
| Spieldesign | [`docs/design/`](docs/design/README.md) |
| Architektur | [`docs/architecture/`](docs/architecture/overview.md) |
| Architekturentscheidungen (ADRs) | [`docs/architecture/adr/`](docs/architecture/adr/README.md) |
| Regeln für Agenten | [`CLAUDE.md`](CLAUDE.md) |

## Arbeitsweise

- **Alle Arbeit läuft über GitHub Issues.** Jeder Pull Request verweist auf ein Issue.
- **Alle Entscheidungen landen als Datei im Repository**: Designentscheidungen in `docs/design/`, Architekturentscheidungen als ADR in `docs/architecture/adr/`.
- **`main` ist geschützt.** Änderungen gelangen nur über Pull Requests dorthin.
- Die Umsetzung erfolgt weitgehend agentisch mit Claude Code. Die Regeln dafür stehen in [`CLAUDE.md`](CLAUDE.md).
