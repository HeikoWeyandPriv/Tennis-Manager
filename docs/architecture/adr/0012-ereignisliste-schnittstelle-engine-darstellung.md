# 0012 – Ereignisliste als Schnittstelle zwischen Engine und Darstellung

- **Status:** vorgeschlagen
- **Datum:** 2026-11-15
- **Issue:** #34

## Kontext

ADR 0003 legt fest, dass die Engine pro Punkt Ereignisse liefert und die Darstellung nichts erfindet. Die Darstellung eines Ballwechsels (siehe `docs/design/06-darstellung.md`) braucht dafür genaue Orte: Ein Marker am Aufsetzpunkt soll knappe Ausbälle erkennbar machen, auch außerhalb des Feldes. Die Zonen (3 × 3) reichen dafür nicht. Das Zonenmodell selbst wird in Issue #51 geklärt.

## Betrachtete Optionen

1. **Engine liefert den Aufsetzpunkt als Koordinate** (deterministisch aus dem Zufallsgenerator). Reproduzierbar, die Darstellung erfindet nichts.
2. **Engine liefert nur „Aus knapp / Aus weit“**, die Darstellung platziert den Marker selbst. Die Darstellung würde etwas erfinden und wäre nicht reproduzierbar.

## Entscheidung

Option 1. Die Ereignisliste je Punkt enthält pro Schlag mindestens: Spieler, Schlagtyp, Startposition, **Aufsetzpunkt** (Koordinate, auch außerhalb des Feldes), Ankunftsergebnis, Ausführungsqualität und Ergebnis (Netz, Aus, im Feld). Die Darstellung verwendet nur diese Werte.

Die genaue Form der Koordinaten und ein möglicher **optimaler Schlagort** sind **nicht** Teil dieser Entscheidung; sie hängen am Zonenmodell (Issue #51) und werden dort entschieden. Dieser ADR wird danach bei Bedarf ergänzt.

## Begründung

- Hält ADR 0003 ein: Engine deterministisch, Darstellung zeigt nur Berechnetes.
- Der Aufsetzpunkt wird einmal gewürfelt und lässt sich über Seed und Zustand exakt nachstellen.

## Konsequenzen

- Die Punktsimulation muss pro Schlag einen Aufsetzpunkt bestimmen (siehe `docs/design/02-punktsimulation.md`).
- Die Ereignisliste wird zum öffentlichen, zu testenden Vertrag der Engine.
- Änderungen am Zonenmodell (Issue #51) können die Koordinaten und Felder der Ereignisse berühren.
