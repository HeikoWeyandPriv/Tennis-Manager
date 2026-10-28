# 03 – Energie & Momentum

## Energie

### Grundprinzip

Jeder Spieler geht mit einem **Energievorrat** in die Partie. Der Vorrat wird aus dem Attribut **Ausdauer** abgeleitet (siehe [05 Attribute](05-attribute.md)).

> Später in der Karriere kann die Start-Energie zusätzlich von vorherigen Matches abhängen, z. B. bei mehreren langen Matches innerhalb eines Turniers.

### Verbrauch

| Quelle | Beschreibung |
|---|---|
| **Pro Schlag** | Kleiner Grundwert. Lange Ballwechsel summieren sich so von selbst. |
| **Laufwege** | Je weiter der Weg zum Ball, desto teurer. Wer den Gegner hin- und herjagt, zermürbt ihn. |
| **Schlagtyp** | Power kostet mehr als Slice oder Lob (siehe Schlagtypen in [02 Punktsimulation](02-punktsimulation.md)). |
| **Taktik** | Netzangriffe (Sprint nach vorn) und hohes Risiko kosten zusätzlich. |

Dadurch entsteht eine Abwägung: Aggressives Spiel ist pro Schlag teurer, verkürzt aber Ballwechsel. Defensives Spiel ist pro Schlag günstig, führt aber zu langen Rallyes.

### Regeneration

| Pause | Wirkung |
|---|---|
| **Changeover** | Kleiner Bonus |
| **Satzpause** | Größerer Bonus |

Die Höhe hängt vom Attribut **Regeneration** ab.

- Regeneration füllt den Vorrat **nie vollständig** auf.
- Optional: Die Regeneration wird umso schwächer, je länger das Match dauert.

### Auswirkungen

| Schritt der Schlagauflösung | Wirkung bei niedriger Energie |
|---|---|
| **Ankunft** | Der Laufradius schrumpft. Bälle werden schlechter oder gar nicht mehr erreicht. |
| **Ausführung** | Schläge fallen häufiger eine Qualitätsstufe schwächer aus. |

Die Wirkung ist **nichtlinear**: Bei hoher Energie spürt man kaum etwas, unterhalb einer Schwelle wird es zunehmend deutlich. Dadurch wird Ermüdung vor allem in späten Sätzen zum Thema.

### Sichtbarkeit

- **Eigene Energie:** exakt sichtbar (Balken)
- **Gegnerische Energie:** verborgen; indirekt erkennbar (siehe [06 Darstellung](06-darstellung.md))

## Momentum

### Grundprinzip

Momentum ist ein **gemeinsamer Wert als Tauziehen** zwischen beiden Spielern. Eine Seite hat das Momentum, die andere entsprechend nicht.

### Was das Momentum bewegt

| Ereignis | Ausschlag |
|---|---|
| Punkt gewonnen | klein |
| Spektakulärer Punktgewinn (Winner, Ass, erfolgreicher Netzangriff) | größer |
| Unerzwungener Fehler, Doppelfehler | zugunsten des Gegners |
| Break, Satzgewinn | deutlicher Sprung |

Gelungene Aktionen steigern das Momentum, misslungene senken es.

### Auswirkung

Ein **kleiner prozentualer Bonus oder Malus auf alle Attribute** des Spielers, abhängig vom Stand des Momentums.

### Bremsen gegen den Schneeballeffekt

Ohne Bremse würde ein früher Lauf das Match entscheiden (Momentum → besser → mehr Punkte → mehr Momentum). Gegenmittel:

- **Abklingen:** Bei Changeover und Satzpause rutscht das Momentum ein Stück Richtung Mitte.
- **Abnehmender Zuwachs:** Je höher das Momentum schon ist, desto weniger bringt ein weiterer Punkt.
- **Comeback-Ausschläge:** Ein Punktgewinn gegen hohes gegnerisches Momentum zählt mehr.

### Einfluss der Mentalität

- **Mentale Stärke** dämpft, wie stark negatives Momentum den Spieler beeinflusst.
- **Selbstvertrauen** bestimmt den Startwert des Momentums zu Matchbeginn.

Siehe [05 Attribute](05-attribute.md).

## Wichtige Punkte (Druck)

Bei wichtigen Punkten (Breakbälle, Satzbälle, Matchbälle) beeinflusst die **mentale Stärke** die Ausführung. Mental schwache Spieler machen dort mehr Fehler.
