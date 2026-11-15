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

Im MVP geschieht das über eine explizite Einstiegsmaske vor dem Match. Sie ist im MVP **immer sichtbar** und nicht an den Entwicklermodus gekoppelt. Im fertigen Spiel werden die Attribute nicht mehr explizit eingestellt, sondern kommen aus dem Spielkontext. Das gilt nur für Attribute, nicht für Tendenzen: Das Einstellen der Tendenzen bleibt ein Design-Merkmal vor dem Match. Den Aufbau des Match-Starts klärt Issue #35, die Herkunft der Attribute im Spielkontext bleibt offen (siehe [Offene Fragen](offene-fragen.md)).

Der Entwicklermodus ändert daran nichts (siehe [07 Entwickler-Werkzeuge](07-entwickler-werkzeuge.md)).

### Archetypen und Standardprofile im MVP

- In der Einstiegsmaske wählt man für jeden Spieler einen von **drei Archetypen**: **Konterspieler**, **Aufschlagriese**, **Künstler** (Profile siehe [Spielertypen](#spielertypen-beispiele)). Danach sind **alle Attribute** beider Spieler weiter anpassbar.
- **Standard-Paarung:** Konterspieler (eigener Spieler) gegen Aufschlagriese. Beide sind **gleich stark** (gleiches Gesamtniveau, gegensätzliches Profil, nicht identische Werte).
- **Mentale Attribute:** Alle Startwerte sind mittel bzw. neutral. Das Selbstvertrauen ist neutral, das Momentum startet bei 0.
- **Händigkeit:** Sie ist im MVP ein änderbares Attribut. Die Standardvorgabe ist zufällig; die Zufallsauswahl kommt aus dem Seed des Spielzustands (kein `Math.random`, siehe [ADR 0003](../architecture/adr/0003-trennung-engine-oberflaeche-darstellung.md)).
- **Charakter der Maske:** Archetyp-Auswahl und Attribut-Editor sind im MVP ein **Entwicklerwerkzeug im Sinn von „nicht Teil des fertigen Spiels“**. Sie können später aktivierbar und deaktivierbar sein oder ganz entfallen.
- Die konkreten Attributwerte der Archetypen entstehen im [Balancing](balancing.md), nicht in diesem Dokument.

## Spielertypen (Beispiele)

Die drei Typen sind im MVP die auswählbaren **Archetypen** (siehe oben).

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
