# Entscheidungslog

Getroffene Designentscheidungen mit kurzer Begründung. Neueste Einträge oben innerhalb jedes Bereichs.

## Rahmen

| Entscheidung                                                                         | Begründung                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Man steuert die Karriere eines **einzelnen Spielers** und ist selbst dieser Spieler. | Fokussiert und emotional; hält das Grundprinzip simpel. |
| **Coaches** können angestellt werden, werden aber erst später ausgearbeitet.         | Fokus liegt zunächst vollständig auf dem Match-Loop.    |

## Match-Loop

| Entscheidung                                                                                | Begründung                                                                 |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Zählformat als Parameter** eines Matches; erste Variante „Standard“.                      | Reale Turniere zählen verschieden; Varianten sollen ergänzbar sein.        |
| Matches werden in einer **Draufsicht** simuliert; jeder Punkt ist verfolgbar.               | Taktik soll sichtbar und nachvollziehbar sein.                             |
| Taktische Anpassungen nur beim **Changeover**.                                              | Natürlicher Rhythmus mit klaren Entscheidungsmomenten.                     |
| **Drei Ansichtsmodi:** alle Punkte (Default), nur entscheidende Punkte, Games überspringen. | Matches können sonst sehr lang werden.                                     |
| Changeover zeigt **Grundinformationen wie bei TV-Übertragungen**.                           | Spieler soll das Match selbst lesen; tiefere Analysen später über Coaches. |
| **Gegnerische KI** wird später geklärt.                                                     | Erst sollen Simulation, Taktik und Attribute stehen.                       |

## Simulation

| Entscheidung                                                                                                                   | Begründung                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Belag** (Sand, Rasen, Hartplatz) ist ein Parameter des Matches und wirkt auf die Ausführung der Schlagtypen; im MVP neutral. | Authentizität und taktische Tiefe sollen später ohne Umbau ergänzbar sein; im MVP weniger Balancing. |
| **Zonenmodell** statt echter Ballphysik.                                                                                       | Weniger Aufwand, bessere taktische Lesbarkeit, leichter zu balancieren.                              |
| **Schlagtypen** Power, Topspin, Slice, Stop, Lob; **Aufschlagtypen** Power, Kick, Slice.                                       | Mehr taktische Tiefe; jeder Typ hat eine erkennbare Flugkurve.                                       |

## Taktik

| Entscheidung                                                          | Begründung                                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Nur globale Tendenzen**, keine situativen Regeln.                   | Einfachheit; situative Regeln eventuell später.                          |
| **Schlagmix und Aufschlagmix als Regler mit zusammen 100 %**.         | Einfache Bedienung; die Situation filtert unrealistische Schläge heraus. |
| **Grundhaltung entfernt.**                                            | Überschneidet sich mit Schlagmix, Grundlinie ↔ Netz und Risiko.          |
| **Regler „Spezialschläge“ entfernt.**                                 | Geht im Schlagmix (Stop, Lob) auf.                                       |
| **1. und 2. Aufschlag mit eigenen Reglern** (Mix, Zielseite, Risiko). | Unterschied zwischen 1. und 2. Aufschlag ist taktisch zentral.           |
| **Return nur mit Risiko-Regler.**                                     | Bewusst schlank gehalten.                                                |
| **Tendenzen des Gegners verborgen.**                                  | Der Spieler soll das Match lesen.                                        |

## Energie & Momentum

| Entscheidung                                                                                                         | Begründung                                                                               |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Energie und Momentum werden im vollen Konzept definiert**; der Umfang im MVP wird später entschieden.              | Das Konzept soll vollständig dokumentiert sein, bevor es für das MVP zugeschnitten wird. |
| **Energie als Vorrat**, verbraucht durch Ballwechsel und energieintensive Taktiken, teilweise regeneriert in Pausen. | Macht lange Matches und Taktikwahl strategisch bedeutsam.                                |
| Niedrige Energie verschlechtert **Ausführung und Ankunft**.                                                          | Ermüdung soll spürbar, aber nachvollziehbar wirken.                                      |
| **Gegnerische Energie verborgen**, nur indirekt erkennbar.                                                           | Konsistent mit verborgenen Tendenzen.                                                    |
| **Momentum** steigt durch gelungene Aktionen, sinkt durch misslungene, wirkt leicht auf alle Attribute.              | Dramaturgie und Comebacks.                                                               |

## Attribute

| Entscheidung                                                                                                                           | Begründung                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Attribute beider Spieler sind vor dem Match einstellbar** (MVP); die Möglichkeit soll in irgendeiner Form im fertigen Spiel bleiben. | Stärkeverhältnisse und Spielertypen lassen sich gezielt ausprobieren.                                           |
| **Körpergröße wirkt stetig** nach Größe in cm, nicht in Klassen.                                                                       | Fein abgestuft, keine Sprünge an Klassengrenzen.                                                                |
| **Rückhandtyp:** Bonus wirkt auf die Ausführung, der Malus der einhändigen Rückhand gegen hohen Topspin auf die Ankunft.               | Entspricht der Aufteilung der Schlagauflösung: eingehender Schlagtyp → Ankunft, kombinierter Wert → Ausführung. |
| **Skala 1–100.**                                                                                                                       | Feine Entwicklung und gutes Balancing.                                                                          |
| Kategorien: **technisch, körperlich, angeboren, mental**.                                                                              | Unterschiedliche Arten, wie sich Werte ändern.                                                                  |
| **Schlagtypen und Aufschlagtypen als technische Attribute.**                                                                           | Tendenzen wirken nur so gut wie die zugehörigen Fähigkeiten.                                                    |
| **Gefühl entfernt.**                                                                                                                   | Durch Stop und Lob ersetzt.                                                                                     |
| **Aufschlag-Präzision entfernt.**                                                                                                      | Abgedeckt durch Risiko und Aufschlagtyp-Attribute.                                                              |
| **Körpergröße und Rückhandtyp** enthalten.                                                                                             | Prägen Spielertypen und machen Schlagtypen interessanter.                                                       |
| **Spielintelligenz vorerst fest.**                                                                                                     | Einfachheit; Wachstum durch Erfahrung eventuell später.                                                         |
| **Mentale Stärke (langfristig) und Selbstvertrauen (kurzfristig)** als getrennte Werte.                                                | Bildet Grundcharakter und aktuelle Form getrennt ab.                                                            |
