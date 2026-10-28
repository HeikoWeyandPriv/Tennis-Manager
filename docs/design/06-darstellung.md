# 06 – Darstellung

## Draufsicht

Matches werden in einer **Draufsicht** dargestellt. Jeder Punkt kann verfolgt werden (abhängig vom Ansichtsmodus, siehe [01 Match-Loop](01-match-loop.md)).

### Zwei Schichten

| Schicht | Aufgabe |
|---|---|
| **Logik** | Berechnet den Punkt in Zonen und Zuständen (siehe [02 Punktsimulation](02-punktsimulation.md)) |
| **Darstellung** | Animiert das Ergebnis flüssig: Ballflug, Laufwege, Positionen |

Die Darstellung erfindet keine Ereignisse; sie visualisiert ausschließlich, was die Logik berechnet hat.

## Taktik sichtbar machen

Ziel: Der Spieler soll erkennen, **welche taktischen Mittel angewendet werden**.

| Mittel | Beschreibung |
|---|---|
| **Positionen** | Weit aus dem Feld gedrängte Spieler und offene Ecken sind direkt sichtbar. |
| **Flugkurven je Schlagtyp** | Power gerade und schnell, Topspin hoher Bogen, Slice flach, Stop kurz, Lob hoch über den Gegner (siehe Schlagtypen in [02 Punktsimulation](02-punktsimulation.md)). |
| **Farbige Ballspuren** | Kurzer Schweif, der das Muster eines Ballwechsels zeigt. |
| **Einblendungen** | Kleine Labels im Moment des Schlags, z. B. „Stop“, „Netzangriff“, „Passierschlag“. |
| **Kommentarzeile** | Ein Satz nach dem Punkt, der das Muster benennt, z. B. „Öffnet das Feld über die Rückhand und beendet den Punkt am Netz.“ |

Einblendungen und Kommentarzeile sind **abschaltbar**.

## Indirekte Ermüdungshinweise

Die Energie des Gegners ist verborgen (siehe [03 Energie & Momentum](03-energie-momentum.md)). Sie wird indirekt sichtbar über:

- langsamere Laufanimationen
- Kommentare wie „wirkt müde“
- steigende Fehlerzahlen in den Statistiken

## Weitere UI-Elemente im Match

- Spielstand
- Eigene Energie (Balken)
- Momentum-Leiste (gemeinsam für beide Spieler)
- Ansichtsmodus-Wahl (während des Matches wechselbar)
- Geschwindigkeitsregler

## Changeover-Bildschirm

Inhalt siehe [01 Match-Loop](01-match-loop.md).
