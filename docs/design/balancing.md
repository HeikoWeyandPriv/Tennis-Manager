# Balancing

Dieses Dokument sammelt **konkrete Zahlenwerte**. Alle Werte sind **Platzhalter** und werden beim Testen der Simulation angepasst. Später werden sie in Konfigurationsdateien überführt.

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
| Bonus/Malus Rückhandtyp          | offen       | Bonus auf Ausführung, Malus gegen hohen Topspin auf Ankunft |
| Wirkung Körpergröße              | offen       | stetige Kurve über die Körpergröße in cm                    |
| Zuwachs mentale Stärke pro Match | offen       | langsam, mit Obergrenze                                     |
