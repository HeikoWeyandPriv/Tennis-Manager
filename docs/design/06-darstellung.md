# 06 – Darstellung

## Draufsicht

Matches werden in einer **Draufsicht** dargestellt. Jeder Punkt kann verfolgt werden (abhängig vom Ansichtsmodus, siehe [01 Match-Loop](01-match-loop.md)).

### Zwei Schichten

| Schicht         | Aufgabe                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------- |
| **Logik**       | Berechnet den Punkt in Zonen und Zuständen (siehe [02 Punktsimulation](02-punktsimulation.md)) |
| **Darstellung** | Animiert das Ergebnis flüssig: Ballflug, Laufwege, Positionen                                  |

Die Darstellung erfindet keine Ereignisse; sie visualisiert ausschließlich, was die Logik berechnet hat.

## Darstellung eines Ballwechsels

Entschieden in Issue #34. Die Darstellung zeigt nur, was die Engine als Ereignisse liefert (siehe [ADR 0012](../architecture/adr/0012-ereignisliste-schnittstelle-engine-darstellung.md)).

- **Reine Draufsicht.** Keine Seitenansicht, keine schräge Perspektive.
- **Höhe über Ballgröße:** Je höher der Ball fliegt, desto größer wird er (näher am Beobachter), ein Lob zeigt sich also als deutlich größerer Ball.
- **Aufsetzpunkt:** Ein kleiner Marker zeigt, wo der Ball den Boden berührt, auch außerhalb des Feldes. Das macht knappe Ausbälle erkennbar. Die Koordinate liefert die Engine; die Darstellung wählt sie nicht selbst.
- **Schlagtyp erkennbar** über **Flugbahn, Farbe der Ballspur und Geschwindigkeit**. Es gibt keine zusätzlichen Formunterschiede.
- **Ablauf pro Schlag:** Der Spieler läuft los, während der Ball fliegt. Kurz vor dem Ball holt er mit dem Schläger aus. Das Treffen des Balls oder das Nichterreichen ist die **Ankunft**.
- **Aufschläge** werden normal durchgeführt und dargestellt, Fehler (Netz, Aus) sind zu sehen. Ein zweiter Aufschlag folgt wie im Tennis. Keine Sonderdarstellung.
- **Punktende:** Der neue Spielstand wird über dem Platz eingeblendet. Die **Art des Punktendes** (Winner, Fehler, Ass) wird **nicht** zusätzlich angezeigt. Eine Schiedsrichteransage per Sound ist ein eigenes Thema (siehe [Offene Fragen](offene-fragen.md)).
- **Spieler** werden von oben stark reduziert dargestellt; Schlägerschwung und Ballkontakt sind erkennbar.

## Taktik sichtbar machen

Ziel: Der Spieler soll erkennen, **welche taktischen Mittel angewendet werden**.

| Mittel                      | Beschreibung                                                                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Positionen**              | Weit aus dem Feld gedrängte Spieler und offene Ecken sind direkt sichtbar.                                                                                          |
| **Flugkurven je Schlagtyp** | Power gerade und schnell, Topspin hoher Bogen, Slice flach, Stop kurz, Lob hoch über den Gegner (siehe Schlagtypen in [02 Punktsimulation](02-punktsimulation.md)). |
| **Farbige Ballspuren**      | Kurzer Schweif, der das Muster eines Ballwechsels zeigt.                                                                                                            |
| **Einblendungen**           | Kleine Labels im Moment des Schlags, z. B. „Stop“, „Netzangriff“, „Passierschlag“.                                                                                  |
| **Kommentarzeile**          | Ein Satz nach dem Punkt, der das Muster benennt, z. B. „Öffnet das Feld über die Rückhand und beendet den Punkt am Netz.“                                           |

Einblendungen und Kommentarzeile sind **abschaltbar**.

### Umfang im MVP

Die Taktik des Gegners wird über sein **sichtbares Verhalten** erkennbar, z. B. über die verwendeten Schlagtypen. Gezeigt wird nur, was gespielt wurde, nie die eingestellte Tendenz.

| Mittel                  | MVP                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| Positionen              | ja                                                                                                    |
| Flugkurven je Schlagtyp | ja                                                                                                    |
| Farbige Ballspuren      | ja                                                                                                    |
| Einblendungen           | ja, **standardmäßig an**, für **beide Spieler**, abschaltbar                                          |
| Kommentarzeile          | nein, folgt nach dem MVP (siehe [Offene Fragen](offene-fragen.md)); abschaltbar, sobald sie existiert |

Die konkrete Darstellung eines Ballwechsels (Bedeutung der Ballspur-Farben, Dauer und Ort der Einblendungen, Ablauf der Animation) wird in Issue #34 festgelegt.

## Indirekte Ermüdungshinweise

Die Energie des Gegners ist verborgen (siehe [03 Energie & Momentum](03-energie-momentum.md)). Sie wird indirekt sichtbar über:

- langsamere Laufanimationen (im MVP der einfache Ermüdungshinweis)
- Kommentare wie „wirkt müde“ (gehören zur Kommentarzeile, folgen nach dem MVP)
- steigende Fehlerzahlen in den Statistiken

## Weitere UI-Elemente im Match

- Spielstand
- Eigene Energie (Balken)
- Momentum-Leiste (gemeinsam für beide Spieler)
- Ansichtsmodus-Wahl (während des Matches wechselbar)
- Geschwindigkeitsregler (Stufen 1x, 1,25x, 1,5x, 2x, 4x; jederzeit wechselbar; gilt nur pro Match)
- Pause/Weiter (jederzeit; nur Pause und Weiter, keine Taktikänderung)

Der Regler skaliert die gesamte zeitliche Darstellung gemeinsam, also auch die Wartezeiten zwischen den Punkten. 1x entspricht etwa der realen Geschwindigkeit eines Ballwechsels; Regeln siehe [Geschwindigkeit und Pause in 01 Match-Loop](01-match-loop.md#geschwindigkeit-und-pause). Was zwischen den Ballwechseln passiert, wird in Issue #56 geklärt.

## Changeover-Bildschirm

Inhalt siehe [01 Match-Loop](01-match-loop.md).

## Ergebnisbildschirm

Inhalt und Optionen für das Weiterspielen siehe [Nach dem Matchende in 01 Match-Loop](01-match-loop.md#nach-dem-matchende). Zur Darstellung:

- **Momentum-Verlauf** als Verlaufsgrafik über alle Punkte des Matches, mit markierten Satzgrenzen und Aufschlagspiel-Grenzen. Gezeigt wird nur das Momentum, nicht die Energie.
- Verborgene Werte des Gegners (Tendenzen, Energie) werden nicht eingeblendet.
