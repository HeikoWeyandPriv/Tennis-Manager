# Tennis Manager – Design-Dokumentation

Browserbasierter Tennis-Manager. Man steuert die Karriere eines einzelnen Spielers – man _ist_ dieser Spieler. Der Hook: **simple Regeln, taktisch komplexe Matches.**

## Dokumente

| Nr. | Dokument                                     | Inhalt                                                      | Status      |
| --- | -------------------------------------------- | ----------------------------------------------------------- | ----------- |
| 00  | [Vision](00-vision.md)                       | Hook, Designprinzipien, Umfang                              | Entwurf     |
| 01  | [Match-Loop](01-match-loop.md)               | Ablauf eines Matches, Changeover, Ansichtsmodi, Statistiken | Entwurf     |
| 02  | [Punktsimulation](02-punktsimulation.md)     | Zonenmodell, Schlagauflösung, Schlag- und Aufschlagtypen    | Entwurf     |
| 03  | [Energie & Momentum](03-energie-momentum.md) | Ermüdung und Momentum im Match                              | Entwurf     |
| 04  | [Taktik](04-taktik.md)                       | Alle Taktik-Regler und ihre Wirkung                         | Entwurf     |
| 05  | [Attribute](05-attribute.md)                 | Spielerattribute nach Kategorien                            | Entwurf     |
| 06  | [Darstellung](06-darstellung.md)             | Draufsicht, Lesbarkeit der Taktik, UI                       | Entwurf     |
| –   | [Balancing](balancing.md)                    | Konkrete Zahlenwerte (Platzhalter)                          | Platzhalter |
| –   | [Glossar](glossar.md)                        | Begriffsdefinitionen                                        | Entwurf     |
| –   | [Entscheidungslog](entscheidungslog.md)      | Getroffene Entscheidungen mit Begründung                    | laufend     |
| –   | [Offene Fragen](offene-fragen.md)            | Noch zu klärende Themen                                     | laufend     |

## Regeln für diese Dokumentation

1. **Jedes Konzept wird genau an einer Stelle definiert.** Andere Dokumente verweisen nur darauf.
   - Schlag- und Aufschlagtypen: definiert in [02 Punktsimulation](02-punktsimulation.md)
   - Attribute: definiert in [05 Attribute](05-attribute.md)
   - Taktik-Regler: definiert in [04 Taktik](04-taktik.md)
2. **Keine konkreten Zahlen in den Designdokumenten.** Designdokumente beschreiben das _Was_ und _Warum_. Zahlenwerte gehören in [Balancing](balancing.md) und später in Konfigurationsdateien.
3. **Entscheidungen werden im [Entscheidungslog](entscheidungslog.md) festgehalten**, besonders wenn etwas bewusst verworfen wurde.
4. **Begriffe aus dem [Glossar](glossar.md) werden einheitlich verwendet.**
