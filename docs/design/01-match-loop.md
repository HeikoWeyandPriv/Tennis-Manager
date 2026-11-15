# 01 – Match-Loop

Dieses Dokument beschreibt den **Ablauf** eines Matches: wann Punkte gespielt werden, wann der Spieler eingreifen kann und was er dabei sieht. Wie ein einzelner Punkt entsteht, steht in [02 Punktsimulation](02-punktsimulation.md).

## Ablauf

1. **Vor dem Match:** Die Attribute beider Spieler werden festgelegt (im MVP frei einstellbar, siehe [05 Attribute](05-attribute.md)). Danach stellt der Spieler seine Tendenzen ein (Rallye, 1. Aufschlag, 2. Aufschlag, Return – siehe [04 Taktik](04-taktik.md)).
2. **Punkte spielen:** Die Simulation berechnet jeden Punkt. Je nach Ansichtsmodus wird er animiert oder übersprungen.
3. **Changeover:** Der Spieler sieht Statistiken, eigene Energie und Momentum und kann seine Tendenzen anpassen. Die gegnerische KI passt sich ebenfalls an.
4. **Wiederholen** bis zum Matchende.
5. **Nach dem Matchende:** Der Spieler sieht den Ergebnisbildschirm und entscheidet, wie es weitergeht (siehe [Nach dem Matchende](#nach-dem-matchende)).

Ein Match hat feste Rahmenbedingungen: das **Zählformat** (siehe unten) und den **Belag** (siehe [02 Punktsimulation](02-punktsimulation.md)).

## Zählung

Die Zählung folgt dem echten Tennis: Punkte im Game (0, 15, 30, 40, Einstand, Vorteil), Games im Satz, Sätze im Match. Steht es im Satz bei den Games unentschieden, entscheidet ein Tiebreak.

Aufschlag:

- Der Aufschlag wechselt nach jedem Game.
- Im Tiebreak schlägt ein Spieler den ersten Punkt auf, danach wechselt der Aufschlag alle zwei Punkte.
- Im folgenden Satz schlägt der Spieler auf, der im Tiebreak zuerst zurückgeschlagen hat.

### Zählformat

Wie ein Match gezählt wird, legt das **Zählformat** fest. Es besteht aus drei Parametern, die von Match zu Match verschieden sein können:

- **Gewinnsätze:** Sätze, die für den Matchgewinn nötig sind
- **Games pro Satz:** Games, die für einen Satzgewinn nötig sind (mit zwei Games Vorsprung); bei Gleichstand auf diesem Wert folgt der Tiebreak
- **Tiebreak-Punkte:** Punkte, die für den Tiebreak-Gewinn nötig sind (mit zwei Punkten Vorsprung)

Die Logik des Aufschlagspiels ist fest und gilt für jedes Format: Zählweise im Game mit Einstand und Vorteil, Aufschlagwechsel und Changeover-Rhythmus (siehe unten).

Aktuell definiert ist die Variante **Standard**: zwei Gewinnsätze, sechs Games pro Satz, Tiebreak bis sieben Punkte in jedem Satz. Weitere reale Turnierformate folgen später (siehe [Offene Fragen](offene-fragen.md)); das Zählformat ist deshalb bewusst als austauschbarer Parameter angelegt.

## Changeover-Rhythmus

Der Rhythmus folgt dem echten Tennis:

- nach dem 1. Game eines Satzes
- danach alle zwei Games
- im Tiebreak alle 6 Punkte
- zusätzlich in jeder Satzpause

Das ergibt pro Satz etwa 5–7 Entscheidungsmomente.

Changeovers und Satzpausen haben zusätzlich eine spielmechanische Wirkung: Sie regenerieren Energie und lassen das Momentum abklingen (siehe [03 Energie & Momentum](03-energie-momentum.md)).

## Ansichtsmodi

| Modus                        | Verhalten                                                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alle Punkte** (Default)    | Jeder Punkt wird animiert.                                                                                                                     |
| **Nur entscheidende Punkte** | Nur Punkte, deren Wichtigkeit mindestens der Schwelle entspricht, werden animiert (siehe [Wichtigkeit von Punkten](#wichtigkeit-von-punkten)). |
| **Games überspringen**       | Ganze Aufschlagspiele werden berechnet, man sieht nur das Ergebnis.                                                                            |

Die Logik berechnet **immer** jeden Punkt vollständig. Der Ansichtsmodus entscheidet nur, was animiert wird.

Der Modus soll **während des Matches wechselbar** sein – spannt sich ein Satz zu, will man wieder jeden Punkt sehen.

### Geschwindigkeit und Pause

- Im MVP gibt es einen **Geschwindigkeitsregler** für die Animation mit den Stufen **1x, 1,25x, 1,5x, 2x und 4x** (Startwerte, siehe [Balancing](balancing.md#animationstempo)). **1x** entspricht etwa der realen Geschwindigkeit eines Ballwechsels.
- Es gibt **keinen festen Richtwert für die Matchdauer**. Die Dauer ergibt sich aus Ansichtsmodus und Geschwindigkeit.
- Der Regler ist **jederzeit wechselbar**, auch während eines Ballwechsels. Für die Wartezeiten zwischen den Punkten gilt für die Geschwindigkeit dieselbe Regel wie für das Spiel; was dort inhaltlich passiert, wird in Issue #56 geklärt.
- Das Match kann **jederzeit pausiert** werden (nur Pause und Weiter, keine Taktikänderung).
- Die gewählte Stufe gilt im MVP **nur pro Match**; ein neues Match startet mit 1x. Eine globale Spieleinstellung ist später möglich.
- Tempo und Pause betreffen nur die Darstellung und ändern nie das Ergebnis eines Matches.

## Wichtigkeit von Punkten

Jeder Punkt hat eine **Wichtigkeit** (Stufe 0 bis 5): wie entscheidend er für das Gesamtmatch ist. Sie bezieht sich auf den **Punkt**, nicht auf einen Spieler, und ist eine reine Funktion des Spielstands. Die Wichtigkeit ist **nicht gedämpft**: Wie stark die Lage (z. B. 5:0 im Satz mit drei Matchbällen) den Druck verändert, gehört nur in die Druck-Berechnung (Issue #38).

Es gilt immer die **höchste zutreffende Stufe**, es gibt keine Zuschläge. Ein Breakball oder Spielball, der zugleich den Satz oder das Match beenden kann, zählt als Satzball bzw. Matchball.

| Stufe | Punkt im normalen Game                                                                              | Punkt im Tiebreak                        |
| ----- | --------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 5     | **Matchball:** Punkt kann das Match beenden                                                         | Matchball                                |
| 4     | **Satzball:** Punkt kann den Satz beenden                                                           | Satzball                                 |
| 3     | **Breakball:** Punkt kann das Aufschlagspiel des Gegners gewinnen (ohne Satz oder Match zu beenden) | Gleichstand ab „Tiebreak-Punkte minus 2“ |
| 2     | **Spielball:** Punkt kann das eigene Aufschlagspiel gewinnen (ohne Satz oder Match zu beenden)      | alle übrigen Tiebreak-Punkte             |
| 1     | 30:30 oder Einstand, in jedem Game                                                                  | –                                        |
| 0     | alle anderen Punkte                                                                                 | –                                        |

Tiebreak:

- Ein Tiebreak ist ein Game, daher gibt es dort keinen Breakball und keinen Spielball. Die Stufen 2 und 3 gelten dort direkt.
- Gleichstand zählt nur ab „Tiebreak-Punkte minus 2“ (Standard, Tiebreak bis 7: 5:5, 6:6, 7:7 …). Frühere Gleichstände wie 1:1 oder 3:3 haben Stufe 2.
- Der Zielwert kommt aus dem Zählformat, nicht fest aus dem Code.

Verwendung:

- **Ansicht:** Im Modus „Nur entscheidende Punkte“ wird ein Punkt animiert, wenn seine Wichtigkeit mindestens der **Schwelle** entspricht. Die Schwelle ist ein Konfigurationswert (siehe [Balancing](balancing.md)). Bei Schwelle 2 oder weniger wird jeder Tiebreak-Punkt animiert, bei Schwelle 3 nur Tiebreak-Gleichstände, Breakbälle, Satzbälle und Matchbälle.
- **Druck:** Die Wichtigkeit ist die Eingabe der Druck-Mechanik (siehe [03 Energie & Momentum](03-energie-momentum.md), Konzeption in Issue #38).

## Changeover-Bildschirm

### Statistiken (wie bei TV-Übertragungen)

| Statistik                          | Beide Spieler |
| ---------------------------------- | ------------- |
| Asse                               | ✓             |
| Doppelfehler                       | ✓             |
| 1. Aufschlag in %                  | ✓             |
| Gewonnene Punkte nach 1. Aufschlag | ✓             |
| Gewonnene Punkte nach 2. Aufschlag | ✓             |
| Winner                             | ✓             |
| Unerzwungene Fehler                | ✓             |
| Netzpunkte gewonnen / gespielt     | ✓             |
| Breakbälle genutzt                 | ✓             |
| Gewonnene Punkte gesamt            | ✓             |

### Zustand

- **Eigene Energie:** exakt sichtbar
- **Gegnerische Energie:** verborgen, nur indirekt erkennbar (siehe [06 Darstellung](06-darstellung.md))
- **Momentum:** sichtbar als gemeinsame Leiste

### Anpassung

Alle Taktik-Regler aus [04 Taktik](04-taktik.md) können verändert werden.

Die **Tendenzen des Gegners sind nicht sichtbar.** Der Spieler muss sie aus Animation und Statistiken ableiten. Später können Coaches zusätzliche Analysen liefern.

## Nach dem Matchende

Im MVP gibt es keine Karriere. Nach dem Matchende sieht der Spieler den **Ergebnisbildschirm** und wählt, wie es weitergeht.

### Ergebnisbildschirm

- **Endstand** des Matches
- **Vollständige Statistik** für das ganze Match, mit denselben Statistiken wie auf dem Changeover-Bildschirm (siehe Tabelle oben)
- **Momentum-Verlauf** über das Match: Verlauf des Momentums **pro Punkt**, mit markierten **Satzgrenzen** und **Aufschlagspiel-Grenzen** (jedes Game wird als Aufschlagspiel des jeweiligen Aufschlägers markiert)

Der Verlauf zeigt nur das Momentum, nicht die Energie. Es wird **nichts Verborgenes aufgedeckt**: weder die Tendenzen noch die Energie des Gegners. Das Prinzip „das Match lesen“ gilt auch im Rückblick; der Spieler leitet Schlüsse aus Statistiken und Momentum-Verlauf ab.

Dafür muss die Engine das Momentum nach jedem Punkt im Spielzustand festhalten.

### Weiter

Der Spieler hat zwei Optionen:

- **Match nochmal starten:** gleiches Match „genau so“, also mit den gleichen Einstellungen wie zuvor (Attribute und Start-Tendenzen). Ob dabei ein neuer Zufallsstart verwendet wird, wird mit dem Match-Start im MVP in Issue #35 entschieden.
- **Neues Match:** zurück an den Anfang, Attribute und Tendenzen werden neu eingestellt wie beim ersten Start des MVP.

## Gegnerische KI

Die gegnerische KI passt ihre Tendenzen ebenfalls beim Changeover an. Wie sie Muster erkennt und reagiert, ist noch offen (siehe [Offene Fragen](offene-fragen.md)).
