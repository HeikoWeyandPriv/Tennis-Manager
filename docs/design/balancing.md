# Balancing

Dieses Dokument sammelt **konkrete Zahlenwerte**. Alle Werte sind **Platzhalter** und werden beim Testen der Simulation angepasst. Später werden sie in Konfigurationsdateien überführt.

## Momentum

| Parameter | Platzhalter | Anmerkung |
|---|---|---|
| Wertebereich | −100 bis +100 | gemeinsamer Tauziehen-Wert |
| Maximale Wirkung auf Attribute | ±5 % | bei vollem Momentum |
| Abklingen pro Changeover | offen | Richtung 0 |
| Abklingen pro Satzpause | offen | stärker als beim Changeover |

## Energie

| Parameter | Platzhalter | Anmerkung |
|---|---|---|
| Schwelle für spürbare Auswirkungen | ca. 60 % Restenergie | darunter nichtlinear zunehmend |
| Verbrauch pro Schlag | offen | |
| Verbrauch nach Laufweg | offen | |
| Zusatzverbrauch je Schlagtyp | offen | Power hoch, Topspin mittel, Slice/Stop/Lob niedrig |
| Zusatzverbrauch Netzangriff | offen | |
| Regeneration Changeover | offen | abhängig vom Attribut Regeneration |
| Regeneration Satzpause | offen | größer als Changeover |

## Attribute

| Parameter | Platzhalter | Anmerkung |
|---|---|---|
| Kombination Seite + Schlagtyp | Mittelwert | z. B. Vorhand 80 + Slice 40 → 60 |
| Bonus/Malus Rückhandtyp | offen | |
| Wirkung Körpergröße | offen | |
| Zuwachs mentale Stärke pro Match | offen | langsam, mit Obergrenze |
