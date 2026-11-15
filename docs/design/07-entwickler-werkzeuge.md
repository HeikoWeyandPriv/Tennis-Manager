# 07 – Entwickler-Werkzeuge

Dieses Dokument beschreibt, was die **Entwickler-Werkzeuge** können und für wen sie gedacht sind. Sie dienen dazu, Balancing und Match-Loop zu prüfen. Umsetzung, Optik und Platzierung sind nicht Teil dieses Dokuments.

## Entwicklermodus

Die Werkzeuge stehen nur im **Entwicklermodus** zur Verfügung. Er ist ein reiner Entwicklermodus, kein Testmodus für Spieler.

- **Einschalten:** Ob ein Match im Entwicklermodus läuft, wird **vor dem Match-Start** festgelegt. Ein Wechsel während eines Matches ist nicht vorgesehen. Wo diese Wahl getroffen wird, klärt Issue #35 (Match-Start).
- **Anzeige:** Ein kleiner Banner in einer Ecke zeigt, dass der Entwicklermodus aktiv ist.
- **Geltungsbereich:** Der Entwicklermodus gilt nur für **Einzelmatches**. Ergebnisse werden deshalb nicht als „verändert“ gekennzeichnet. Mit der Karriereebene wird das neu geprüft.

## Was ist sichtbar?

Im Entwicklermodus sind sichtbar:

- die Werte des aktuellen Matches: Spielerwerte, Energie, Momentum, Zählstand, aktive Taktik,
- die **verborgenen Werte des Gegners**, zum Beispiel Tendenzen, Taktik und Energie,
- die **Zwischenergebnisse der Punktsimulation**: Wahrscheinlichkeiten und Einflüsse pro Punkt, damit nachvollziehbar wird, warum ein Punkt so ausging.

Der Entwicklermodus ist damit eine bewusste Ausnahme zu „Tendenzen des Gegners verborgen“ und „Gegnerische Energie verborgen“ (siehe [Entscheidungslog](entscheidungslog.md)). Im normalen Spiel bleibt beides verborgen.

## Was ist änderbar?

Änderbar sind alle **Spielerwerte** beider Spieler, auch **mitten im Match**:

- **alle Attribute** (siehe [05 Attribute](05-attribute.md)), auch Werte, die im normalen Spiel fest sind,
- **Taktik und Tendenzen** (siehe [04 Taktik](04-taktik.md)): genau so änderbar wie im normalen Spiel. Einziger Unterschied: Im Entwicklermodus geht das auch für den **Gegner**.

Nicht änderbar sind **globale Balancing-Werte** (siehe [Balancing](balancing.md)).

Änderungen gelten nur für die **aktuelle Sitzung** und werden nicht gespeichert.

## Ablauf kontrollieren

Zusätzlich zur normalen Geschwindigkeit lässt sich das Match **pausieren** und in **Einzelschritten** (Punkt für Punkt) ausführen. Zurückspringen oder Wiederholen eines Punktes gehört nicht dazu.

## Abgrenzung zum Match-Start

Der Entwicklermodus ändert nichts am Einstellen vor dem Match (siehe [01 Match-Loop](01-match-loop.md) und [05 Attribute](05-attribute.md)). Er legt nur fest, ob ein Match mit Entwickler-Werkzeugen läuft.
