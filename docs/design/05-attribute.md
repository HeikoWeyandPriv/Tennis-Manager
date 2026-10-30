# 05 – Attribute

## Grundsätze

- **Skala:** 1–100. In der UI eher als Balken oder Farbstufen statt nackter Zahlen.
- **Keine toten Werte:** Jedes Attribut hat eine klar benennbare Wirkung in der Simulation.
- **Kategorien** unterscheiden sich darin, wie sich die Werte verändern.

| Kategorie        | Veränderung                          |
| ---------------- | ------------------------------------ |
| Technisch        | trainierbar (außerhalb von Matches)  |
| Körperlich       | trainierbar (außerhalb von Matches)  |
| Angeboren / fest | unveränderlich                       |
| Mental           | verändert sich durch Matchergebnisse |

## Technische Attribute

| Gruppe         | Attribut            | Wirkung                          |
| -------------- | ------------------- | -------------------------------- |
| Seiten         | **Vorhand**         | Basis aller Vorhandschläge       |
|                | **Rückhand**        | Basis aller Rückhandschläge      |
| Grundschläge   | **Power**           | Ausführung von Power-Schlägen    |
|                | **Topspin**         | Ausführung von Topspin-Schlägen  |
|                | **Slice**           | Ausführung von Slice-Schlägen    |
| Spezialschläge | **Stop**            | Ausführung von Stopps            |
|                | **Lob**             | Ausführung von Lobs              |
| Netz           | **Netzspiel**       | Volleys und Schmetterbälle       |
| Return         | **Return**          | Ausführung des Returns           |
| Aufschlag      | **Power-Aufschlag** | Ausführung flacher Aufschläge    |
|                | **Kick-Aufschlag**  | Ausführung von Kick-Aufschlägen  |
|                | **Slice-Aufschlag** | Ausführung von Slice-Aufschlägen |

### Kombination von Seite und Schlagtyp

Die Ausführung eines Rallyeschlags nutzt einen **kombinierten Wert aus Seite und Schlagtyp**.

> Beispiel: Vorhand 80 und Slice 40 ergeben einen Vorhand-Slice von etwa 60.

Die genaue Formel ist Teil des [Balancings](balancing.md). Der Rückhandtyp (siehe unten) modifiziert die Rückhandkombinationen.

## Körperliche Attribute

| Attribut          | Wirkung                                        |
| ----------------- | ---------------------------------------------- |
| **Ausdauer**      | Größe des Energievorrats zu Matchbeginn        |
| **Schnelligkeit** | Laufradius bei der Ankunft                     |
| **Regeneration**  | Energierückgewinn bei Changeover und Satzpause |

Siehe [03 Energie & Momentum](03-energie-momentum.md).

## Angeborene / feste Eigenschaften

| Eigenschaft                              | Wirkung                                                                                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Händigkeit** (links / rechts)          | Bestimmt, wo Vorhand und Rückhand liegen; Zielseiten-Tendenzen wirken gegen Linkshänder anders                                     |
| **Körpergröße** (in cm)                  | Bonus auf Aufschlag und Netzreichweite, kleiner Malus auf Schnelligkeit; die Wirkung ist stetig, nicht in Klassen abgestuft        |
| **Rückhandtyp** (einhändig / beidhändig) | Modifiziert die Rückhandkombinationen (siehe unten)                                                                                |
| **Spielintelligenz**                     | Bessere Startposition bei der Ankunft, da Bälle früher gelesen werden. Bei KI-Gegnern zusätzlich: wie schnell sie Muster erkennen. |

### Rückhandtyp

| Typ            | Vorteil                                       | Nachteil                                        |
| -------------- | --------------------------------------------- | ----------------------------------------------- |
| **Einhändig**  | Bonus auf Rückhand-Slice und Rückhand-Stop    | Malus gegen hohe Topspin-Bälle auf die Rückhand |
| **Beidhändig** | Bonus auf Rückhand-Power und Rückhand-Topspin | –                                               |

Der Bonus des Rückhandtyps wirkt auf die **Ausführung** (er modifiziert den kombinierten Wert der Rückhandschläge). Der Malus der einhändigen Rückhand gegen hohe Topspin-Bälle wirkt auf die **Ankunft**, weil er vom eingehenden Schlagtyp abhängt (siehe [02 Punktsimulation](02-punktsimulation.md)).

## Mentale Attribute

| Attribut                          | Wirkung                                                                    | Veränderung                                                                                                               |
| --------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Mentale Stärke** (langfristig)  | Leistung bei wichtigen Punkten; dämpft den Einfluss von negativem Momentum | Wächst langsam durch gewonnene enge Matches und abgewehrte Breakbälle; sinkt durch Niederlagen in entscheidenden Momenten |
| **Selbstvertrauen** (kurzfristig) | Startwert des Momentums zu Matchbeginn                                     | Schwankt mit den letzten Ergebnissen (Formkurve)                                                                          |

### Schutz vor Schneeballeffekten

- Mentale Stärke wächst nur **langsam** und hat eine **Obergrenze**.
- Siege gegen klar schwächere Gegner zählen kaum, Siege gegen stärkere viel.

## Attribute vor dem Match einstellen

Im MVP können die Attribute **beider Spieler vor dem Match frei eingestellt** werden. So lassen sich Stärkeverhältnisse und Spielertypen gezielt ausprobieren.

Die Einstellung legt das **Ausgangsprofil** für das Match fest. Sie ist keine Veränderung im Sinne der Kategorien oben, zum Beispiel bleiben angeborene Eigenschaften in einer Karriere unveränderlich.

Die Möglichkeit ist nicht nur als Hilfsmittel für das MVP gedacht, sondern soll im fertigen Spiel in irgendeiner Form erhalten bleiben. In welcher Form, ist offen (siehe [Offene Fragen](offene-fragen.md)).

## Spielertypen (Beispiele)

| Typ                | Profil                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **Aufschlagriese** | Groß, starker Power-Aufschlag, wenig Schnelligkeit; will kurze Punkte                           |
| **Konterspieler**  | Schnell, ausdauernd, gute Rückhand und Topspin; will lange Ballwechsel und den Gegner zermürben |
| **Künstler**       | Gutes Netzspiel, Stop und Slice, einhändige Rückhand; gewinnt durch Variation                   |

## Übersicht: Wo wirkt welches Attribut?

| Attribut                         | Ankunft                       | Ausführung          | Energie    | Momentum      |
| -------------------------------- | ----------------------------- | ------------------- | ---------- | ------------- |
| Vorhand, Rückhand                |                               | ✓                   |            |               |
| Power, Topspin, Slice, Stop, Lob |                               | ✓                   |            |               |
| Netzspiel                        |                               | ✓                   |            |               |
| Return                           |                               | ✓                   |            |               |
| Aufschlag-Attribute              |                               | ✓                   |            |               |
| Ausdauer                         |                               |                     | ✓ (Vorrat) |               |
| Schnelligkeit                    | ✓                             |                     |            |               |
| Regeneration                     |                               |                     | ✓ (Pausen) |               |
| Körpergröße                      | ✓ (Netz)                      | ✓ (Aufschlag)       |            |               |
| Rückhandtyp                      | ✓ (Malus gegen hohen Topspin) | ✓                   |            |               |
| Spielintelligenz                 | ✓                             |                     |            |               |
| Mentale Stärke                   |                               | ✓ (wichtige Punkte) |            | ✓ (Dämpfung)  |
| Selbstvertrauen                  |                               |                     |            | ✓ (Startwert) |
