# 0004 – Projektstruktur als pnpm-Workspace

- **Status:** angenommen
- **Datum:** 2026-10-28
- **Issue:** #2

## Kontext

ADR 0003 verlangt, dass die Engine keine Abhängigkeiten zu Browser, Oberfläche oder Darstellung hat. Bei agentischer Entwicklung genügt eine reine Konvention dafür nicht zuverlässig.

## Betrachtete Optionen

1. **Ein Paket mit Ordnern** – einfach, Trennung aber nur per Konvention oder Lint-Regel.
2. **Getrennte Pakete in einem Workspace** – Trennung technisch erzwungen; etwas mehr Einrichtung.

## Entscheidung

Das Repository ist ein **pnpm-Workspace** mit getrennten Paketen:

```
packages/
  engine/   Spiellogik (ADR 0003) – reines TypeScript, ohne DOM
  app/      Oberfläche, Match-Darstellung, Persistenz
config/     Balancing-Werte
tools/      Hilfsskripte, z. B. Balancing-Simulation
```

Regeln:

- `engine` darf **keine** anderen Pakete des Workspaces importieren und hat keine Abhängigkeiten zu Browser- oder UI-Bibliotheken. Ihre TypeScript-Konfiguration enthält keine DOM-Typen.
- `app` nutzt `engine` ausschließlich über deren öffentliche Schnittstelle.
- Weitere Pakete nur per neuem ADR.

## Begründung

Getrennte Pakete erzwingen die Architektur technisch: Ein Import aus der Oberfläche in die Engine schlägt fehl. Das ist eine verlässliche Leitplanke für Agenten.

## Konsequenzen

- Paketverwaltung über **pnpm**.
- Befehle für Build, Tests und Lint laufen über den Workspace.
- Die genaue Ablage der Konfiguration (`config/`) wird bei der Projekteinrichtung festgelegt.
