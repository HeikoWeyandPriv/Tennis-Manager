# Offene Fragen

## Match-Loop

- **Gegnerische KI:** Wie erkennt sie Muster des Spielers? Wie und wie stark passt sie ihre Tendenzen beim Changeover an? Welche Rolle spielt die Spielintelligenz dabei?
- **Druck-Mechanik:** Wie wirkt die Wichtigkeit eines Punktes auf die Ausführung (Dämpfung durch die Lage, Bezug auf den einzelnen Spieler, Wirkung je mentaler Stärke)? Wird in Issue #38 geklärt.
- **Weitere Zählformate:** Die Variante „Standard“ ist festgelegt (zwei Gewinnsätze, Tiebreak in allen Sätzen, Einstand mit Vorteil). Offen: Welche realen Turnierformate kommen dazu (andere Gewinnsätze, Games pro Satz, Tiebreak-Punkte), und wie wird einem Match sein Zählformat zugeordnet, z. B. über das Turnier?
- **Herkunft der Attribute im fertigen Spiel:** Im MVP gibt es drei Archetypen und eine Einstiegsmaske (siehe [05 Attribute](05-attribute.md)). Im fertigen Spiel kommen die Attribute aus dem Spielkontext; offen ist, woher sie dort konkret kommen (Karriere, Turnier, vorbereitete Profile) und ob die Maske bleibt. Der Match-Start wird in Issue #35 geklärt.
- **Matchdauer und Animationstempo:** Wie lange darf ein Match im Modus „alle Punkte“ maximal dauern?

## Darstellung

- **Kommentarzeile nach dem MVP:** Textbausteine und Mustererkennung für Ballwechsel, inklusive Kommentare wie „wirkt müde“ (siehe [06 Darstellung](06-darstellung.md)). Im MVP nicht enthalten.

## Simulation

- **Wirkung der Beläge:** Sand, Rasen und Hartplatz beeinflussen die Ausführung der Schlagtypen (siehe [02 Punktsimulation](02-punktsimulation.md)). Offen: Wie stark wirkt jeder Belag je Typ? Beeinflusst der Belag zusätzlich Ankunft, Laufwege oder Energieverbrauch? Wie wird einem Match sein Belag zugeordnet, z. B. über das Turnier?
- **Umfang von Energie und Momentum im MVP:** Das Konzept ist vollständig beschrieben. Welche Teile (Abklingen, abnehmender Zuwachs, Comeback-Ausschläge, abgestufte Ausschläge, schwächere Regeneration bei langen Matches) im MVP aktiv sind, wird später entschieden.

## Darstellung

- **Optimaler Schlagort:** Ob die Darstellung einen „optimalen Schlagort“ (Koordinate, zu der der Spieler läuft) kennt und wie sich daraus die Ankunft ergibt, ist offen. Wird in Issue #51 entschieden.
- **Zonenmodell:** Bleiben die 3 × 3 Zielzonen, oder werden sie durch Koordinaten ersetzt? Issue #51. Der Aufsetzpunkt als Koordinate gilt unabhängig davon.
- **Sound:** Schiedsrichteransage des Spielstands und weitere Geräusche kommen im Design noch nicht vor; eigenes Issue.
- **Optional später:** Händigkeit und Rückhandtyp könnten sich in der Spielerfigur zeigen (kein MVP-Muss, nicht entschieden).

## Später

- **Coaches:** Welche Coach-Typen gibt es, und was verbessern sie? (Idee aus der Konzeptphase: Coaches verbessern vor allem die Qualität der Informationen beim Changeover.)
- **Karriereebene:** Turnierkalender, Training, Finanzen, Ranking.
- **Situative Taktikregeln:** z. B. „bei Breakbällen sicherer spielen“.
- **Spielintelligenz:** Soll sie später durch Matcherfahrung wachsen?
- **Start-Energie über mehrere Matches:** Ermüdung innerhalb eines Turniers.
- **Mehrspielermodus:** vorerst nicht vorgesehen – das Spiel wird allein gespielt und hat kein Backend (ADR 0009). Würde ein neues ADR erfordern.
- **Auslieferung:** Wie wird das Spiel später ausgeliefert und gestartet (z. B. PWA oder Desktop-App mit Tauri)? Bewusst zurückgestellt (ADR 0009).
