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

**Reihenfolge:** Die Meilensteine bauen aufeinander auf. Die Reihenfolge M1 → M2 → … → M8 ist eine **Empfehlung**; der Projektinhaber steuert die Abarbeitung und weicht bewusst davon ab, wenn es sinnvoll ist. Der Plan dient dazu, die richtige Reihenfolge einzuhalten und erkennbare Abschnitte zu haben. Jeder Meilenstein hat ein **Abnahme-Issue** mit einer Prüfliste (3 bis 5 prüfbare Punkte), die der Projektinhaber abhakt; sie sperrt den nächsten Meilenstein nicht. „MVP spielbar“ ist erreicht mit M1 bis M7; M8 (Hosting) folgt für Tests.

**Abnahme-Artefakte:** Jeder Meilenstein liefert etwas, das der Projektinhaber ohne Code lesen kann. Ab M2 sind das ein **Massentest-Bericht** und **einzelne Matches als lesbares Textprotokoll** (Skripte in `tools/`, Grundlage ist die Ereignisliste aus [ADR 0012](../architecture/adr/0012-ereignisliste-schnittstelle-engine-darstellung.md)).

**Festlegungen aus der Überprüfung des Plans (Issue #63):**

- M2 enthält eine **grobe Plausibilitätsprüfung** mit Zielkorridoren (z. B. Aufschlagquote, Matchlänge, Stärkeverhältnis), damit ein untaugliches Rechenmodell vor M3 auffällt. Das Feinbalancing bleibt M7.
- M3 enthält die **Statistik-Erfassung** (Engine-Logik); die Anzeige gehört zu M5.
- M4 wird nur für **Desktop** gebaut und mit **festen, vorgewählten Tendenzen** geprüft; die Einstellbarkeit der Tendenzen folgt in M5. Die Plattform-Entscheidung #47 wird danach geprüft.
- M5 bleibt ein Meilenstein, intern in Tickets gestaffelt; abgenommen wird am Ende.
- M7 enthält die Kennzahl **Taktik-Wirksamkeit**: Eine passende Taktik verschiebt das Ergebnis messbar, aber keine Taktik gewinnt immer.
- **Persistenz im MVP:** Es werden nur Einstellungen gespeichert, kein Match-Spielstand (betrifft #49).

| Meilenstein                          | Inhalt                                                                      | Offene Voraussetzungen (Entscheidungen/Aufgaben) |
| ------------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------ |
| M1 Engine-Kern                       | Zählung, Zustand, Zufall mit Seed, Konfiguration                            | #49, #22                                         |
| M2 Punktsimulation                   | Schritte, Rechenmodell, Massentest und Textprotokoll, Plausibilitätsprüfung | #42, #43 (Zielgrößen), #51                       |
| M3 Dynamik                           | Energie, Momentum, Wichtigkeit, Druck, Tendenzen, Statistik-Erfassung       | #38, #44, #45                                    |
| M4 Match-Darstellung                 | Platz, Ballwechsel, Tempo, Einblendungen (nur Desktop, feste Tendenzen)     | #46, #51, #56                                    |
| M5 Oberfläche (inkl. Spielerauswahl) | Match-Start, Spielerauswahl, Changeover, Ergebnisbildschirm                 | #35, #47                                         |
| M6 Entwicklermodus                   | Wahrscheinlichkeiten und Einflüsse anzeigen                                 | #42                                              |
| M7 Balancing                         | Zielgrößen, Feinjustierung, Taktik-Wirksamkeit (braucht M6 und Massentest)  | #43                                              |
| M8 Hosting                           | Auslieferung für Tests                                                      | #48                                              |

Stand der Voraussetzungen: Bereits geschlossen und damit keine Voraussetzung mehr sind #7, #9, #11, #14, #15 und #34.

**Freigabe von Code-Issues:** Code-Issues eines Meilensteins entstehen, sobald **alle** seine Voraussetzungen entschieden und in die Dokumentation übernommen sind **und** der Projektinhaber das Issue zur Umsetzung freigibt; die Abnahme des Vorgänger-Meilensteins ist dafür eine Empfehlung, keine Sperre (CLAUDE.md, Regel 10 regelt das Schließen von Issues). Es gibt keine globale Design-Phase mehr. Entscheidungen späterer Meilensteine dürfen parallel geklärt werden, solange frühere Meilensteine gebaut werden.
