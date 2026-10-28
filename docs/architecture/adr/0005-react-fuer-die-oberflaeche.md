# 0005 – React für die Oberfläche

- **Status:** angenommen
- **Datum:** 2026-10-28
- **Issue:** #2

## Kontext

Das Spiel umfasst viele Bildschirme mit Tabellen, Formularen und Diagrammen: Trainingsplanung, Turnierkalender, Spielerprofil, Taktikeinstellung, Changeover-Statistiken. Die Oberfläche wird weitgehend agentisch entwickelt.

## Betrachtete Optionen

1. **React** – größtes Ökosystem, viele fertige Bausteine; Agenten arbeiten damit sehr zuverlässig; etwas mehr Schreibaufwand.
2. **Svelte** – schlanker und gut lesbar, kleineres Ökosystem.
3. **Vue** – solider Mittelweg.
4. **Solid** – sehr performant, kleinste Community.

## Entscheidung

Die Oberfläche wird mit **React** gebaut, als Build-Werkzeug dient **Vite**. Für den Oberflächenzustand (aktueller Bildschirm, Auswahlen, Einstellungen der Ansicht) wird **Zustand** verwendet.

## Begründung

Das große Ökosystem und die Zuverlässigkeit agentischer Entwicklung überwiegen den etwas höheren Schreibaufwand. Vite ist der Standard für neue React-Projekte und schnell.

## Konsequenzen

- Der **Spielzustand gehört der Engine** (ADR 0003). Zustand-Stores halten nur Oberflächenzustand und eine Referenz auf den aktuellen Spielzustand; Spiellogik in Komponenten oder Stores ist nicht erlaubt.
- Weitere UI-Bibliotheken (Komponenten, Diagramme, Routing) werden bei Bedarf per eigenem ADR ergänzt.
