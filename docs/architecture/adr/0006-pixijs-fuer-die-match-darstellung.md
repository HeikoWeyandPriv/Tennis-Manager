# 0006 – PixiJS für die Match-Darstellung

- **Status:** angenommen
- **Datum:** 2026-10-28
- **Issue:** #2

## Kontext

Matches werden in einer animierten 2D-Draufsicht gezeigt. Die Darstellung soll taktische Mittel sichtbar machen: Flugkurven je Schlagtyp, farbige Ballspuren, Einblendungen, Laufwege (`docs/design/06-darstellung.md`). Die Draufsicht ist in die React-Oberfläche eingebettet.

## Betrachtete Optionen

1. **Canvas 2D direkt** – keine Abhängigkeit; Animationen, Ebenen und Effekte müssen selbst gebaut werden.
2. **PixiJS** – schnelle 2D-Darstellung mit Ebenen, Sprites, Grafikprimitiven und Effekten; kümmert sich nur ums Zeichnen.
3. **Phaser** – komplettes Spiel-Framework mit eigener Szenen- und Zustandsverwaltung; konkurriert mit React um die Steuerung der Anwendung.
4. **SVG** – einfach, bei vielen Animationen weniger flüssig.

## Entscheidung

Die Match-Darstellung wird mit **PixiJS** umgesetzt.

## Begründung

PixiJS liefert genau die benötigten Werkzeuge, ohne die Anwendung steuern zu wollen, und lässt sich gut in eine React-Komponente einbetten.

## Konsequenzen

- Die Darstellung ist ein eigener Bereich innerhalb von `app` und animiert ausschließlich die Ereignisse der Engine (ADR 0003).
- Die Darstellung kennt Ansichtsmodus und Geschwindigkeit, verändert aber nie den Spielzustand.
- Die Darstellung enthält keine Spiellogik; sie darf aus Zielzonen und Positionen nur Bildschirmkoordinaten und Animationspfade ableiten.
