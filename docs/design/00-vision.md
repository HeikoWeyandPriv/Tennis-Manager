# 00 – Vision

## Das Spiel in einem Satz

Ein browserbasierter Tennis-Manager, in dem man die Karriere eines einzelnen Spielers steuert und jedes Match als taktisches Duell erlebt, das man in einer Draufsicht Punkt für Punkt verfolgt und bei jedem Seitenwechsel neu ausrichtet.

## Der Hook

**Simple Regeln, taktisch komplexe Matches.**

Die taktische Tiefe entsteht aus dem Zusammenspiel weniger, klarer Regeln – nicht aus vielen Werten, Menüs oder Sonderfällen. Ein Ballwechsel soll sich wie eine kleine Geschichte lesen lassen: *„Er drückt ihn mit drei Bällen auf die Rückhand und schließt longline ab.“*

## Rolle des Spielers

- Man **ist** der Spieler, dessen Karriere man steuert.
- Man steuert keine einzelnen Schläge, sondern gibt **Tendenzen** vor, wie der eigene Spieler reagiert.
- Eingriffe ins Match erfolgen nur beim **Changeover** (Seitenwechsel) und in Satzpausen.
- Coaches können später angestellt werden (siehe [Offene Fragen](offene-fragen.md)).

## Designprinzipien

1. **Wenige, bedeutsame Entscheidungen.** Jeder Regler hat eine klar spürbare Wirkung.
2. **Keine toten Werte.** Jedes Attribut greift an einer benennbaren Stelle in die Simulation ein.
3. **Situation schlägt Tendenz.** Tendenzen verschieben Wahrscheinlichkeiten, sie erzwingen keine unrealistischen Schläge.
4. **Jede Tendenz hat einen Preis.** Kein Regler ist immer richtig – Risiko kostet Fehler, Netzangriffe kosten Energie, Einseitigkeit macht berechenbar.
5. **Das Match lesen.** Gegner-Tendenzen und Gegner-Energie sind verborgen. Der Spieler muss aus Animation und Statistik selbst Schlüsse ziehen.
6. **Taktik muss sichtbar sein.** Die Darstellung macht erkennbar, welche taktischen Mittel angewendet werden.
7. **Dramaturgie ohne Willkür.** Energie und Momentum erzeugen Spannung und Wendungen, werden aber gebremst, damit kein früher Vorteil das Match automatisch entscheidet.

## Umfang

### Aktueller Fokus
- Der **Match-Loop**: ein einzelnes Match von Anfang bis Ende, inklusive Simulation, Taktik, Energie, Momentum und Darstellung.

### Später
- Gegnerische KI (Mustererkennung und Anpassung)
- Coaches
- Karriereebene (Turnierkalender, Training, Finanzen, Ranking)

### Bewusst nicht enthalten (vorerst)
- Steuerung einzelner Schläge während des Ballwechsels
- Echte Ballphysik (die Simulation arbeitet mit Zonen, siehe [02 Punktsimulation](02-punktsimulation.md))
- Situative Taktikregeln (z. B. „bei Breakbällen sicherer spielen“) – zunächst nur globale Tendenzen

Ob es später einen Mehrspielermodus geben soll, ist noch offen (siehe [Offene Fragen](offene-fragen.md)).
