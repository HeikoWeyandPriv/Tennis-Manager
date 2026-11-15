# Entscheidungslog

Getroffene Designentscheidungen mit kurzer Begründung. Neueste Einträge oben innerhalb jedes Bereichs.

## Rahmen

| Entscheidung                                                                         | Begründung                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Man steuert die Karriere eines **einzelnen Spielers** und ist selbst dieser Spieler. | Fokussiert und emotional; hält das Grundprinzip simpel. |
| **Coaches** können angestellt werden, werden aber erst später ausgearbeitet.         | Fokus liegt zunächst vollständig auf dem Match-Loop.    |

## Match-Loop

| Entscheidung                                                                                                                                                                                                                            | Begründung                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Jeder Punkt hat eine **Wichtigkeit** (Stufe 0–5, höchste zutreffende Stufe, keine Zuschläge, keine Dämpfung, gilt für den Punkt): 5 Matchball, 4 Satzball, 3 Breakball, 2 Spielball, 1 30:30/Einstand in jedem Game, 0 sonst. Issue #7. | Ein Wert statt fester Punktemenge; einfach zu berechnen und zu testen, getrennt steuerbar für Ansicht und Druck. |
| Im **Tiebreak** haben Punkte grundsätzlich Stufe 2, Gleichstände ab „Tiebreak-Punkte minus 2“ Stufe 3; Satz- und Matchbälle bleiben 4 und 5. Issue #7.                                                                                  | Analog zu Aufschlagspielen; frühe Gleichstände (1:1, 3:3) sind nicht entscheidend.                               |
| Ansichtsmodus „nur entscheidende Punkte“ animiert Punkte mit **Wichtigkeit ≥ Schwelle** (Konfigurationswert). Issue #7.                                                                                                                 | Ersetzt die feste Liste; die Schwelle lässt sich beim Balancing anpassen.                                        |
| **Dämpfung durch die Lage** (z. B. 5:0 mit drei Matchbällen) gehört nur in die Druck-Berechnung, nicht in die Wichtigkeit; Druck-Mechanik wird in Issue #38 konzipiert. Issue #7.                                                       | Trennt „wie entscheidend ist der Punkt“ von „wie stark wirkt Druck“.                                             |
| Nach dem Matchende zeigt der **Ergebnisbildschirm** Endstand, vollständige Statistik und **Momentum-Verlauf pro Punkt** (mit Satz- und Aufschlagspiel-Grenzen); nur Momentum, keine Energie. Issue #16.                                 | Statistiken und Momentum sind der Anlass, das Match im Rückblick zu lesen und zu lernen.                         |
| Nach dem Match wird **nichts Verborgenes aufgedeckt** (weder Tendenzen noch Energie des Gegners). Issue #16.                                                                                                                            | Das Prinzip „das Match lesen“ gilt auch im Rückblick.                                                            |
| Im MVP **zwei Optionen nach dem Match:** Match nochmal starten (gleiche Einstellungen) oder neues Match (Attribute und Tendenzen neu einstellen). Zufallsstart beim „Nochmal“: Issue #35. Issue #16.                                    | Ohne Karriere braucht das MVP einen sinnvollen Abschluss; mit nur einem Gegner ist ein Rematch das Mindeste.     |
| **Zählformat als Parameter** eines Matches; erste Variante „Standard“.                                                                                                                                                                  | Reale Turniere zählen verschieden; Varianten sollen ergänzbar sein.                                              |
| Matches werden in einer **Draufsicht** simuliert; jeder Punkt ist verfolgbar.                                                                                                                                                           | Taktik soll sichtbar und nachvollziehbar sein.                                                                   |
| Taktische Anpassungen nur beim **Changeover**.                                                                                                                                                                                          | Natürlicher Rhythmus mit klaren Entscheidungsmomenten.                                                           |
| **Drei Ansichtsmodi:** alle Punkte (Default), nur entscheidende Punkte, Games überspringen.                                                                                                                                             | Matches können sonst sehr lang werden.                                                                           |
| Changeover zeigt **Grundinformationen wie bei TV-Übertragungen**.                                                                                                                                                                       | Spieler soll das Match selbst lesen; tiefere Analysen später über Coaches.                                       |
| **Gegnerische KI** wird später geklärt.                                                                                                                                                                                                 | Erst sollen Simulation, Taktik und Attribute stehen.                                                             |

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

## Entwickler-Werkzeuge

| Entscheidung                                                                                                                                                                                            | Begründung                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Reiner Entwicklermodus**, vor dem Match-Start festgelegt, kein Wechsel im Match; kleiner Banner zeigt ihn an.                                                                                         | Werkzeug für Entwickler, nicht für Spieler; Verwechslung mit dem normalen Spiel vermeiden.             |
| **Sichtbar:** Matchwerte, verborgene Werte des Gegners, Zwischenergebnisse der Punktsimulation.                                                                                                         | Balancing und Match-Loop lassen sich nur prüfen, wenn nachvollziehbar ist, warum ein Punkt so ausging. |
| **Änderbar:** alle Attribute, Taktik und Tendenzen beider Spieler, auch mitten im Match; Taktik und Tendenzen wie im normalen Spiel, zusätzlich für den Gegner. Globale Balancing-Werte nicht änderbar. | Situationen gezielt prüfen; globale Werte bleiben in der Konfiguration.                                |
| **Ablauf:** Pausieren und Einzelschritte, kein Zurückspringen.                                                                                                                                          | Punkt für Punkt prüfen; Zurückspringen wäre ein eigenes, größeres Thema.                               |
| **Änderungen nur für die Sitzung**, keine Kennzeichnung von Ergebnissen.                                                                                                                                | Nur Einzelmatches haben den Entwicklermodus; mit der Karriereebene neu prüfen.                         |
| **Entwicklermodus ändert nichts am Einstellen vor dem Match.**                                                                                                                                          | Einstellen vor dem Match ist ein eigenes Thema (Issue #35).                                            |

## Energie & Momentum

| Entscheidung                                                                                                         | Begründung                                                                               |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Energie und Momentum werden im vollen Konzept definiert**; der Umfang im MVP wird später entschieden.              | Das Konzept soll vollständig dokumentiert sein, bevor es für das MVP zugeschnitten wird. |
| **Energie als Vorrat**, verbraucht durch Ballwechsel und energieintensive Taktiken, teilweise regeneriert in Pausen. | Macht lange Matches und Taktikwahl strategisch bedeutsam.                                |
| Niedrige Energie verschlechtert **Ausführung und Ankunft**.                                                          | Ermüdung soll spürbar, aber nachvollziehbar wirken.                                      |
| **Gegnerische Energie verborgen**, nur indirekt erkennbar.                                                           | Konsistent mit verborgenen Tendenzen.                                                    |
| **Momentum** steigt durch gelungene Aktionen, sinkt durch misslungene, wirkt leicht auf alle Attribute.              | Dramaturgie und Comebacks.                                                               |

## Attribute

| Entscheidung                                                                                                                                                         | Begründung                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Attribute beider Spieler sind vor dem Match einstellbar** (MVP, Einstiegsmaske); im fertigen Spiel kommen sie aus dem Spielkontext, Tendenzen bleiben einstellbar. | Stärkeverhältnisse und Spielertypen lassen sich gezielt ausprobieren. Präzisiert mit Issue #20; Match-Start: Issue #35. |
| **Körpergröße wirkt stetig** nach Größe in cm, nicht in Klassen.                                                                                                     | Fein abgestuft, keine Sprünge an Klassengrenzen.                                                                        |
| **Rückhandtyp:** Bonus wirkt auf die Ausführung, der Malus der einhändigen Rückhand gegen hohen Topspin auf die Ankunft.                                             | Entspricht der Aufteilung der Schlagauflösung: eingehender Schlagtyp → Ankunft, kombinierter Wert → Ausführung.         |
| **Skala 1–100.**                                                                                                                                                     | Feine Entwicklung und gutes Balancing.                                                                                  |
| Kategorien: **technisch, körperlich, angeboren, mental**.                                                                                                            | Unterschiedliche Arten, wie sich Werte ändern.                                                                          |
| **Schlagtypen und Aufschlagtypen als technische Attribute.**                                                                                                         | Tendenzen wirken nur so gut wie die zugehörigen Fähigkeiten.                                                            |
| **Gefühl entfernt.**                                                                                                                                                 | Durch Stop und Lob ersetzt.                                                                                             |
| **Aufschlag-Präzision entfernt.**                                                                                                                                    | Abgedeckt durch Risiko und Aufschlagtyp-Attribute.                                                                      |
| **Körpergröße und Rückhandtyp** enthalten.                                                                                                                           | Prägen Spielertypen und machen Schlagtypen interessanter.                                                               |
| **Spielintelligenz vorerst fest.**                                                                                                                                   | Einfachheit; Wachstum durch Erfahrung eventuell später.                                                                 |
| **Mentale Stärke (langfristig) und Selbstvertrauen (kurzfristig)** als getrennte Werte.                                                                              | Bildet Grundcharakter und aktuelle Form getrennt ab.                                                                    |

## Darstellung

| Entscheidung                                                                                                                                                                                                          | Begründung                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Im MVP zur **Taktik-Sichtbarkeit**: Positionen, Flugkurven je Schlagtyp, farbige Ballspuren und Einblendungen; langsamere Laufanimation als einfacher Ermüdungshinweis. Kommentarzeile folgt nach dem MVP. Issue #15. | Die Taktik des Gegners wird über sein Verhalten sichtbar; die Kommentarzeile ist aufwendig und ein abgegrenztes Folgethema. |
| **Einblendungen** sind im MVP standardmäßig an, gelten für beide Spieler und sind abschaltbar. Zeigen nur den gespielten Schlagtyp. Details der Ballwechsel-Darstellung in Issue #34. Issue #15.                      | Passt zu „Tendenzen des Gegners verborgen“: gezeigt wird nur, was gespielt wurde.                                           |
