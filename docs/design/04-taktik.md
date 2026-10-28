# 04 – Taktik

Die Taktik wird über **globale Tendenzen** gesteuert. Sie legen nicht fest, welcher Schlag gespielt wird, sondern **verschieben Wahrscheinlichkeiten**. Die Situation hat Vorrang (siehe Situationsfilter in [02 Punktsimulation](02-punktsimulation.md)).

Tendenzen werden vor dem Match eingestellt und können bei jedem Changeover angepasst werden.

## Übersicht

| Bereich          | Regler                                          |
| ---------------- | ----------------------------------------------- |
| **Rallye**       | Schlagmix, Zielseite, Grundlinie ↔ Netz, Risiko |
| **1. Aufschlag** | Aufschlagmix, Zielseite, Risiko                 |
| **2. Aufschlag** | Aufschlagmix, Zielseite, Risiko                 |
| **Return**       | Risiko                                          |

## Rallye

### Schlagmix

Fünf Regler, die zusammen **100 %** ergeben:

**Power · Topspin · Slice · Stop · Lob**

Der Schlagmix ist eine **Grundpräferenz**, keine Häufigkeit. Bei jedem Schlag filtert die Situation die sinnvollen Typen heraus; die verbleibenden Anteile werden auf 100 % hochgerechnet.

> Beispiel: Bei 15 % Stop wird nicht jeder siebte Schlag ein Stopp. Aus einer knappen Ankunft heraus fällt Stop praktisch weg; gegen einen Gegner weit hinter der Grundlinie wird er deutlich wahrscheinlicher.

Die Schlagtypen sind in [02 Punktsimulation](02-punktsimulation.md) definiert.

### Zielseite

**Vorhand ← ausgewogen → Rückhand** des Gegners

Bestimmt, auf welche Seite des Gegners bevorzugt gespielt wird. Berücksichtigt die Händigkeit des Gegners.

### Grundlinie ↔ Netz

**Grundlinie halten ← → Netzangriffe**

Bestimmt, wie oft der Spieler nach einem guten Ball ans Netz vorrückt.

### Risiko

**sicher ← → aggressiv**

Bestimmt, **wie nah an die Linien und wie hart** innerhalb des gewählten Schlagtyps gespielt wird. Ein riskanter Topspin landet tiefer und linienäher, ein sicherer mittiger.

## Aufschlag

Für den **1. und 2. Aufschlag** gibt es jeweils eigene Regler.

### Aufschlagmix

Drei Regler, die zusammen **100 %** ergeben:

**Power · Kick · Slice**

Die Aufschlagtypen sind in [02 Punktsimulation](02-punktsimulation.md) definiert.

### Zielseite

**Vorhand ← ausgewogen → Rückhand** des Gegners

### Risiko

**sicher ← → aggressiv**

Höheres Risiko bringt mehr Tempo und Präzision, aber auch mehr Fehler. Beim 2. Aufschlag bedeutet hohes Risiko mehr Doppelfehler.

## Return

### Risiko

**sicher ← → aggressiv**

- **sicher:** tief in die Mitte, Ballwechsel neutralisieren
- **aggressiv:** mit dem Return angreifen, höhere Fehlerquote

## Preis der Tendenzen

Jede Tendenz hat Vor- und Nachteile:

| Tendenz              | Vorteil                        | Preis                                                  |
| -------------------- | ------------------------------ | ------------------------------------------------------ |
| Viel Power           | Mehr Winner, kürzere Punkte    | Mehr Fehler, mehr Energieverbrauch                     |
| Viele Netzangriffe   | Punkte schneller beenden       | Energie, anfällig für Lob und Passierschlag            |
| Hohes Risiko         | Mehr Winner, Asse              | Mehr Fehler und Doppelfehler                           |
| Einseitige Zielseite | Schwäche des Gegners ausnutzen | Berechenbar; die gegnerische KI stellt sich darauf ein |

## Zusammenspiel mit Attributen

Tendenzen wirken nur so gut wie die zugehörigen Attribute (siehe [05 Attribute](05-attribute.md)). Viele Netzangriffe sind bei schwachem Netzspiel ein Fehler; ein hoher Stop-Anteil lohnt sich nur bei gutem Stop-Attribut.

## Verborgene Gegner-Tendenzen

Die Tendenzen des Gegners sind **nicht sichtbar**. Der Spieler leitet sie aus Animation und Statistik ab.
