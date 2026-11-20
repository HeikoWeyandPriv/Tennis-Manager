# Tennis Manager – Design-Dokumentation

Browserbasierter Tennis-Manager. Man steuert die Karriere eines einzelnen Spielers – man _ist_ dieser Spieler. Der Hook: **simple Regeln, taktisch komplexe Matches.**

## Dokumente

| Nr. | Dokument                                           | Inhalt                                                      | Status      |
| --- | -------------------------------------------------- | ----------------------------------------------------------- | ----------- |
| 00  | [Vision](00-vision.md)                             | Hook, Designprinzipien, Umfang                              | Entwurf     |
| 01  | [Match-Loop](01-match-loop.md)                     | Ablauf eines Matches, Changeover, Ansichtsmodi, Statistiken | Entwurf     |
| 02  | [Punktsimulation](02-punktsimulation.md)           | Zonenmodell, Schlagauflösung, Schlag- und Aufschlagtypen    | Entwurf     |
| 03  | [Energie & Momentum](03-energie-momentum.md)       | Ermüdung und Momentum im Match                              | Entwurf     |
| 04  | [Taktik](04-taktik.md)                             | Alle Taktik-Regler und ihre Wirkung                         | Entwurf     |
| 05  | [Attribute](05-attribute.md)                       | Spielerattribute nach Kategorien                            | Entwurf     |
| 06  | [Darstellung](06-darstellung.md)                   | Draufsicht, Lesbarkeit der Taktik, UI                       | Entwurf     |
| 07  | [Entwickler-Werkzeuge](07-entwickler-werkzeuge.md) | Entwicklermodus: Werte ansehen und ändern, Ablauf steuern   | Entwurf     |
| –   | [Balancing](balancing.md)                          | Konkrete Zahlenwerte (Platzhalter)                          | Platzhalter |
| –   | [Glossar](glossar.md)                              | Begriffsdefinitionen                                        | Entwurf     |
| –   | [Entscheidungslog](entscheidungslog.md)            | Getroffene Entscheidungen mit Begründung                    | laufend     |
| –   | [Offene Fragen](offene-fragen.md)                  | Noch zu klärende Themen                                     | laufend     |

## Regeln für diese Dokumentation

1. **Jedes Konzept wird genau an einer Stelle definiert.** Andere Dokumente verweisen nur darauf.
   - Schlag- und Aufschlagtypen: definiert in [02 Punktsimulation](02-punktsimulation.md)
   - Attribute: definiert in [05 Attribute](05-attribute.md)
   - Taktik-Regler: definiert in [04 Taktik](04-taktik.md)
2. **Keine konkreten Zahlen in den Designdokumenten.** Designdokumente beschreiben das _Was_ und _Warum_. Zahlenwerte gehören in [Balancing](balancing.md) und später in Konfigurationsdateien.
3. **Entscheidungen werden im [Entscheidungslog](entscheidungslog.md) festgehalten**, besonders wenn etwas bewusst verworfen wurde.
4. **Begriffe aus dem [Glossar](glossar.md) werden einheitlich verwendet.**

## Umsetzungsplan und Definition „MVP spielbar“

Festgelegt in Issue #50.

**MVP spielbar:** Das MVP berechnet und zeigt ein **vollständiges Match** – Match-Start mit der bereits designten Spielerauswahl (Archetypen und Attribut-Editor, siehe [05 Attribute](05-attribute.md)), Spielen mit Taktik-Reglern am Changeover und Ergebnisbildschirm. **Beide Spieler** sind über dieselbe Maske einstellbar (Standardgegner: Aufschlagriese). **Sound ist nicht Teil des MVP.**

**Reihenfolge:** Die Meilensteine bauen aufeinander auf und werden **strikt nacheinander** gebaut und vom Projektinhaber abgenommen (M1 → M2 → … → M8). So ist jeder Meilenstein für sich prüfbar, bevor der nächste beginnt. „MVP spielbar“ ist erreicht mit M1 bis M7; M8 (Hosting) folgt für Tests.

| Meilenstein                          | Inhalt                                                       | Offene Voraussetzungen (Entscheidungen/Aufgaben) |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------ |
| M1 Engine-Kern                       | Zählung, Zustand, Zufall mit Seed, Konfiguration             | #49, #22                                         |
| M2 Punktsimulation                   | Schritte, Rechenmodell, Massensimulation                     | #42, #43 (Zielgrößen), #51                       |
| M3 Dynamik                           | Energie, Momentum, Wichtigkeit, Druck, Tendenzen             | #38, #44, #45                                    |
| M4 Match-Darstellung                 | Platz, Ballwechsel, Tempo, Einblendungen                     | #46, #51, #56                                    |
| M5 Oberfläche (inkl. Spielerauswahl) | Match-Start, Spielerauswahl, Changeover, Ergebnisbildschirm  | #35, #47                                         |
| M6 Entwicklermodus                   | Wahrscheinlichkeiten und Einflüsse anzeigen                  | #42                                              |
| M7 Balancing                         | Zielgrößen, Feinjustierung (braucht M6 und Massensimulation) | #43                                              |
| M8 Hosting                           | Auslieferung für Tests                                       | #48                                              |

Stand der Voraussetzungen: Bereits geschlossen und damit keine Voraussetzung mehr sind #7, #9, #11, #14, #15 und #34.

**Freigabe von Code-Issues:** Code-Issues eines Meilensteins entstehen, sobald **alle** seine Voraussetzungen entschieden und in die Dokumentation übernommen sind **und** der Vorgänger-Meilenstein vom Projektinhaber abgenommen ist (CLAUDE.md, Regel 10). Es gibt keine globale Design-Phase mehr. Entscheidungen späterer Meilensteine dürfen parallel geklärt werden, solange frühere Meilensteine gebaut werden.
