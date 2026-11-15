# Balancing

Dieses Dokument sammelt **konkrete Zahlenwerte**. Alle Werte sind **Platzhalter** und werden beim Testen der Simulation angepasst. Später werden sie in Konfigurationsdateien überführt.

## Wichtigkeit von Punkten

| Parameter                               | Platzhalter | Anmerkung                                                                                      |
| --------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| Stufen                                  | 0 bis 5     | entschieden (siehe [01 Match-Loop](01-match-loop.md#wichtigkeit-von-punkten)), keine Zuschläge |
| Schwelle für „nur entscheidende Punkte“ | 3           | Platzhalter; ab dieser Stufe wird animiert, ggf. im Ansichtsmodus einstellbar                  |

## Animationstempo

| Parameter            | Platzhalter             | Anmerkung                                                                                             |
| -------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------- |
| Reglerstufen         | 1x, 1,25x, 1,5x, 2x, 4x | Startwerte (entschieden, Issue #14); 1x entspricht etwa der realen Geschwindigkeit eines Ballwechsels |
| Standardstufe        | 1x                      | Start jedes Matches; Stufe gilt im MVP nur pro Match                                                  |
| Richtwert Matchdauer | keiner                  | bewusst kein Zeitziel; gegebenenfalls später aus gemessener Spielzeit des Prototyps ableiten          |

## Archetypen im MVP

| Parameter                               | Platzhalter      | Anmerkung                                                                           |
| --------------------------------------- | ---------------- | ----------------------------------------------------------------------------------- |
| Attributwerte Konterspieler             | offen            | Profil siehe [05 Attribute](05-attribute.md); gleiches Gesamtniveau wie die anderen |
| Attributwerte Aufschlagriese            | offen            | Profil siehe [05 Attribute](05-attribute.md)                                        |
| Attributwerte Künstler                  | offen            | Profil siehe [05 Attribute](05-attribute.md)                                        |
| Mentale Stärke, Selbstvertrauen (Start) | mittel / neutral | entschieden: Selbstvertrauen neutral, Momentum startet bei 0; Zahlenwert offen      |

## Momentum

| Parameter                      | Platzhalter   | Anmerkung                                            |
| ------------------------------ | ------------- | ---------------------------------------------------- |
| Wertebereich                   | −100 bis +100 | gemeinsamer Tauziehen-Wert                           |
| Maximale Wirkung auf Attribute | ±5 %          | bei vollem Momentum                                  |
| Abklingen pro Changeover       | offen         | Richtung 0                                           |
| Abklingen pro Satzpause        | offen         | stärker als beim Changeover                          |
| Ausschlag je Ereignis          | offen         | Punkt, spektakulärer Punkt, Fehler, Break/Satzgewinn |
| Abnehmender Zuwachs            | offen         | je höher das Momentum, desto kleiner der Zuwachs     |
| Comeback-Ausschlag             | offen         | Punkt gegen hohes gegnerisches Momentum zählt mehr   |

## Energie

| Parameter                          | Platzhalter          | Anmerkung                                          |
| ---------------------------------- | -------------------- | -------------------------------------------------- |
| Schwelle für spürbare Auswirkungen | ca. 60 % Restenergie | darunter nichtlinear zunehmend                     |
| Verbrauch pro Schlag               | offen                |                                                    |
| Verbrauch nach Laufweg             | offen                |                                                    |
| Zusatzverbrauch je Schlagtyp       | offen                | Power hoch, Topspin mittel, Slice/Stop/Lob niedrig |
| Zusatzverbrauch Netzangriff        | offen                |                                                    |
| Regeneration Changeover            | offen                | abhängig vom Attribut Regeneration                 |
| Regeneration Satzpause             | offen                | größer als Changeover                              |
| Abnahme der Regeneration           | offen                | je länger das Match dauert                         |

## Belag

| Parameter                                        | Platzhalter | Anmerkung                                              |
| ------------------------------------------------ | ----------- | ------------------------------------------------------ |
| Ausgleichswert je Belag und Schlag-/Aufschlagtyp | offen       | Sand, Rasen, Hartplatz; im MVP neutral (kein Einfluss) |

## Attribute

| Parameter                        | Platzhalter | Anmerkung                                                   |
| -------------------------------- | ----------- | ----------------------------------------------------------- |
| Kombination Seite + Schlagtyp    | Mittelwert  | z. B. Vorhand 80 + Slice 40 → 60                            |
| Anteil Seite an der Kombination  | 50 %        | Schlagtyp = Rest; bei 50 % genau der Mittelwert             |
| Bonus/Malus Rückhandtyp          | offen       | Bonus auf Ausführung, Malus gegen hohen Topspin auf Ankunft |
| Wirkung Körpergröße              | offen       | stetige Kurve über die Körpergröße in cm                    |
| Zuwachs mentale Stärke pro Match | offen       | langsam, mit Obergrenze                                     |
