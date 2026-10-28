# Architekturüberblick

Zusammenfassung des aktuellen Stands. Die Begründungen stehen in den [ADRs](adr/README.md).

## Leitlinien aus dem Design

- **Browserbasiert.** Das Spiel läuft im Browser.
- **Trennung von Logik und Darstellung.** Die Punktsimulation berechnet Ergebnisse in Zonen und Zuständen; die Darstellung animiert sie nur (siehe [Darstellung](../design/06-darstellung.md)).
- **Jeder Punkt wird vollständig berechnet**, unabhängig vom Ansichtsmodus (siehe [Match-Loop](../design/01-match-loop.md)).
- **Balancing-Werte getrennt vom Code** (siehe [Balancing](../design/balancing.md)).
- **Gute Testbarkeit der Simulation**, damit agentische Entwicklung abgesichert ist.

## Tech-Stack

| Bereich | Wahl | ADR |
|---|---|---|
| Technologie | Web-Technik, TypeScript (strikt) | [0002](adr/0002-web-technik-mit-typescript.md) |
| Architektur | Eigenständige, deterministische Engine | [0003](adr/0003-trennung-engine-oberflaeche-darstellung.md) |
| Struktur | pnpm-Workspace mit `engine` und `app` | [0004](adr/0004-projektstruktur-pnpm-workspace.md) |
| Oberfläche | React, Vite, Zustand | [0005](adr/0005-react-fuer-die-oberflaeche.md) |
| Match-Darstellung | PixiJS | [0006](adr/0006-pixijs-fuer-die-match-darstellung.md) |
| Persistenz | IndexedDB (Dexie), Export/Import, versionierte Spielstände | [0007](adr/0007-persistenz-indexeddb-export-versionierung.md) |
| Tests | Vitest, fast-check, Playwright, ESLint, Prettier | [0008](adr/0008-teststrategie.md) |
| Auslieferung | Statisch, ohne Backend; Art der Auslieferung zurückgestellt | [0009](adr/0009-statische-anwendung-ohne-backend.md) |

## Bausteine

```
packages/
  engine/      Spiellogik – reines TypeScript, ohne DOM
  app/         Oberfläche (React), Match-Darstellung (PixiJS), Persistenz (Dexie)
config/        Balancing-Werte
tools/         Hilfsskripte, z. B. Balancing-Simulation
```

| Baustein | Aufgabe | Darf verwenden |
|---|---|---|
| **Engine** | Punktsimulation, Match-Loop, Energie, Momentum, Gegner-KI, später Karriere | nichts aus dem Workspace; keine Browser-APIs |
| **Oberfläche** | Alle Bildschirme, Taktikeinstellung, Changeover | Engine (öffentliche Schnittstelle) |
| **Match-Darstellung** | Animiert die Ereignisse der Engine | Engine-Typen und -Ereignisse |
| **Persistenz** | Speichern, Laden, Export, Import, Migrationen | serialisierter Spielzustand |

## Datenfluss

1. Die Oberfläche übergibt der Engine den aktuellen **Spielzustand** und eine **Eingabe** (z. B. geänderte Tendenzen, „nächsten Punkt spielen“).
2. Die Engine liefert den **neuen Spielzustand** und **Ereignisse** (z. B. die Schläge eines Punkts).
3. Die Match-Darstellung animiert die Ereignisse; die Oberfläche zeigt den neuen Zustand.
4. Die Persistenz speichert den Spielzustand bei Bedarf.

## Kernregeln

- Die Engine ist **deterministisch**: Zufall nur über den Zufallsgenerator mit Seed, dessen Zustand Teil des Spielzustands ist.
- Der Spielzustand ist **reine, serialisierbare Daten**.
- Die Darstellung **erfindet nichts**, sie visualisiert nur Engine-Ereignisse.
- Keine Spiellogik in React-Komponenten, Stores oder der Darstellung.

## Entscheidungen

Siehe [ADR-Übersicht](adr/README.md).
