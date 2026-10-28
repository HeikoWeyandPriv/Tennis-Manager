# 0007 – Persistenz mit IndexedDB, Export/Import und versionierten Spielständen

- **Status:** angenommen
- **Datum:** 2026-10-28
- **Issue:** #2

## Kontext

Das Spiel läuft lokal im Browser und soll Karrieren über lange Zeit speichern, inklusive Matchhistorie. Die Auslieferung ist noch offen (ADR 0009); Browserdaten sind an die Adresse gebunden, unter der das Spiel läuft, und können durch das Löschen von Websitedaten verloren gehen. Das Spiel wird sich ständig weiterentwickeln.

## Betrachtete Optionen

1. **localStorage** – sehr einfach, aber auf wenige Megabyte begrenzt.
2. **IndexedDB** (über die Bibliothek **Dexie**) – eingebaute Browser-Datenbank mit viel Platz; mehrere Spielstände möglich.
3. **SQLite im Browser** – mächtig, für dieses Projekt überdimensioniert.
4. **Nur Datei-Export und -Import** – unabhängig vom Browser, aber umständlich im Alltag.

## Entscheidung

- Spielstände werden in **IndexedDB über Dexie** gespeichert.
- Jeder Spielstand kann als **Datei exportiert und wieder importiert** werden.
- Jeder Spielstand trägt eine **Formatversion**. Beim Laden werden ältere Stände über eine Kette von **Migrationen** schrittweise auf das aktuelle Format gebracht.
- Persistenz liegt in `app` hinter einer schmalen Schnittstelle (Speichern, Laden, Auflisten, Löschen, Exportieren, Importieren). Die Engine kennt keine Persistenz.
- Gespeichert wird der serialisierbare Spielzustand der Engine (ADR 0003).

## Begründung

- IndexedDB bietet ausreichend Platz für Karrieren mit Historie.
- Der Export schützt vor Datenverlust und macht Spielstände beim Wechsel der Auslieferung übertragbar.
- Ohne Versionierung wären Spielstände nach jedem Formatwechsel unbrauchbar.

## Konsequenzen

- Jede Änderung am Format des Spielzustands erhöht die Formatversion und braucht eine Migration mit Test.
- Migrationen sind reine Funktionen und können in der Engine oder einem eigenen Modul liegen; sie werden bei der ersten Migration festgelegt.
- Ein Wechsel des Speicherorts (z. B. Dateisystem bei einer Desktop-App) betrifft nur die Persistenz-Schnittstelle.
