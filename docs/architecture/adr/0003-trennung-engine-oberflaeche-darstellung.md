# 0003 – Trennung von Engine, Oberfläche und Darstellung

- **Status:** angenommen
- **Datum:** 2026-10-28
- **Issue:** #2

## Kontext

Das Design verlangt, dass die Punktsimulation Ergebnisse in Zonen und Zuständen berechnet und die Darstellung sie nur animiert (`docs/design/06-darstellung.md`). Jeder Punkt wird vollständig berechnet, unabhängig vom Ansichtsmodus (`docs/design/01-match-loop.md`). Für die Karriere müssen zudem viele Matches anderer Spieler im Hintergrund simuliert werden, und das Balancing soll über Massensimulationen geprüft werden.

## Betrachtete Optionen

1. **Spiellogik eng mit Oberfläche und Darstellung verwoben** – schneller Start, aber schwer testbar und nicht ohne Oberfläche lauffähig.
2. **Eigenständige Engine** ohne Abhängigkeit zu Browser, Oberfläche oder Darstellung.

## Entscheidung

Die gesamte Spiellogik liegt in einer **eigenständigen Engine**:

- **Umfang:** Punktsimulation, Match-Loop, Energie, Momentum, gegnerische KI, später die Karriere (Kalender, Training, Turniere, Ranking).
- **Keine Abhängigkeiten** zu Browser-APIs, Oberfläche oder Darstellung.
- **Schnittstelle:** Die Engine erhält einen Zustand und Eingaben und liefert einen neuen Zustand und Ereignisse. Sie hält keinen versteckten Zustand.
- **Spielzustand als reine Daten:** vollständig als JSON serialisierbar (keine Klasseninstanzen mit Verhalten, keine Funktionen, keine zyklischen Referenzen).
- **Deterministisch:** Zufall nur über einen eigenen Zufallsgenerator mit Seed, dessen Zustand Teil des Spielzustands ist. Gleicher Zustand und gleiche Eingaben ergeben immer dasselbe Ergebnis. `Math.random`, Systemzeit und ähnliche Quellen sind in der Engine verboten.
- **Ereignisse für die Darstellung:** Die Engine liefert pro Punkt eine Abfolge von Ereignissen (Schläge mit Typ, Zielzone, Qualität, Positionen). Die Darstellung animiert ausschließlich diese Ereignisse und erfindet nichts hinzu.
- **Balancing-Werte** werden der Engine als Konfiguration übergeben und nicht im Code festgelegt.

## Begründung

- Die Engine ist ohne Browser testbar – Grundlage für sichere agentische Entwicklung.
- Massensimulationen (Karriere, Balancing) sind ohne Darstellung möglich.
- Reproduzierbarkeit: Fehler lassen sich über Seed und Zustand exakt nachstellen.
- Serialisierbarer Zustand vereinfacht Speichern und Laden (siehe ADR 0007).

## Konsequenzen

- Die Trennung wird technisch durch getrennte Pakete erzwungen (siehe ADR 0004).
- Oberfläche und Darstellung greifen nur über die öffentliche Schnittstelle der Engine zu.
- Rechenintensive Massensimulationen können später in einen Web Worker verlagert werden, ohne die Engine zu ändern.
