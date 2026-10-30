# 01 – Match-Loop

Dieses Dokument beschreibt den **Ablauf** eines Matches: wann Punkte gespielt werden, wann der Spieler eingreifen kann und was er dabei sieht. Wie ein einzelner Punkt entsteht, steht in [02 Punktsimulation](02-punktsimulation.md).

## Ablauf

1. **Vor dem Match:** Der Spieler stellt seine Tendenzen ein (Rallye, 1. Aufschlag, 2. Aufschlag, Return – siehe [04 Taktik](04-taktik.md)).
2. **Punkte spielen:** Die Simulation berechnet jeden Punkt. Je nach Ansichtsmodus wird er animiert oder übersprungen.
3. **Changeover:** Der Spieler sieht Statistiken, eigene Energie und Momentum und kann seine Tendenzen anpassen. Die gegnerische KI passt sich ebenfalls an.
4. **Wiederholen** bis zum Matchende.

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

Aktuell definiert ist die Variante **Standard**: zwei Gewinnsätze, sechs Games pro Satz, Tiebreak bis sieben Punkte in jedem Satz. Weitere reale Turnierformate folgen später (siehe [Offene Fragen](offene-fragen.md)); die Zählung ist darauf vorbereitet.

## Changeover-Rhythmus

Der Rhythmus folgt dem echten Tennis:

- nach dem 1. Game eines Satzes
- danach alle zwei Games
- im Tiebreak alle 6 Punkte
- zusätzlich in jeder Satzpause

Das ergibt pro Satz etwa 5–7 Entscheidungsmomente.

Changeovers und Satzpausen haben zusätzlich eine spielmechanische Wirkung: Sie regenerieren Energie und lassen das Momentum abklingen (siehe [03 Energie & Momentum](03-energie-momentum.md)).

## Ansichtsmodi

| Modus                        | Verhalten                                                                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alle Punkte** (Default)    | Jeder Punkt wird animiert.                                                                                                                      |
| **Nur entscheidende Punkte** | Nur wichtige Punkte werden animiert, z. B. Breakbälle, Satzbälle, Matchbälle, Tiebreaks. Welche Punkte genau dazugehören, ist noch festzulegen. |
| **Games überspringen**       | Ganze Aufschlagspiele werden berechnet, man sieht nur das Ergebnis.                                                                             |

Die Logik berechnet **immer** jeden Punkt vollständig. Der Ansichtsmodus entscheidet nur, was animiert wird.

Der Modus soll **während des Matches wechselbar** sein – spannt sich ein Satz zu, will man wieder jeden Punkt sehen.

Zusätzlich ist ein **Geschwindigkeitsregler** für die Animation vorgesehen.

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

## Gegnerische KI

Die gegnerische KI passt ihre Tendenzen ebenfalls beim Changeover an. Wie sie Muster erkennt und reagiert, ist noch offen (siehe [Offene Fragen](offene-fragen.md)).
