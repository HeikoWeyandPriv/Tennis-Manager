# 02 – Punktsimulation

Dieses Dokument beschreibt, **wie ein einzelner Punkt entsteht**. Es ist das Herzstück des Spiels und die einzige Stelle, an der Schlag- und Aufschlagtypen definiert werden.

## Grundidee

Ein Punkt ist eine **Abfolge von Schlägen**. Jeder Schlag wird mit derselben Regelkette aufgelöst. Druck baut sich über mehrere Schläge auf: Ein starker Ball führt zu einer schwierigen Ankunft, daraus folgt ein schwacher Ball, daraus eine Angriffschance.

Es gibt **keine echte Ballphysik**. Die Simulation arbeitet mit Zonen und Zuständen; die Darstellung animiert das Ergebnis (siehe [06 Darstellung](06-darstellung.md)).

## Zonenmodell

### Zielzonen

Jede Platzhälfte ist in **3 × 3 Zielzonen** eingeteilt:

|                            | Links | Mitte | Rechts |
| -------------------------- | ----- | ----- | ------ |
| **Tief** (nahe Grundlinie) |       |       |        |
| **Mittel**                 |       |       |        |
| **Kurz** (vor der T-Linie) |       |       |        |

### Spielerposition

Die Position eines Spielers wird getrennt von den Zielzonen geführt:

- **Tiefe:** weit hinter der Grundlinie · Grundlinie · Mittelfeld · Netz
- **Seitlich:** links · Mitte · rechts

## Schlagauflösung

Jeder Schlag durchläuft vier Schritte.

### 1. Ankunft

Wie gut erreicht der Spieler den Ball?

**Einflüsse:** Laufweg (Position → Zielzone), Qualität des eingehenden Balls, Schlagtyp des eingehenden Balls (bei hohen Topspin-Bällen auf die Rückhand zusätzlich der Rückhandtyp), Schnelligkeit, Spielintelligenz (Startposition), Energie, Momentum.

**Ergebnis:**

- **bequem** – volle Auswahl an Schlägen
- **unter Druck** – eingeschränkte Auswahl
- **knapp** – stark eingeschränkte Auswahl, vor allem defensive Schläge
- **nicht erreicht** – Winner für den Gegner

### 2. Schlagwahl

Welcher Schlag wird gespielt, und wohin?

1. Die **Situation** (Ankunft, eigene Position, Position des Gegners) bestimmt, welche Schlagtypen überhaupt sinnvoll sind (**Situationsfilter**).
2. Der **Schlagmix** aus der Taktik gewichtet die verbleibenden Typen; die Anteile werden auf 100 % hochgerechnet.
3. **Zielseite**, **Grundlinie ↔ Netz** und **Risiko** bestimmen Zielzone und ob ein Netzangriff erfolgt.

Siehe [04 Taktik](04-taktik.md) für die Regler.

### 3. Ausführung

Gelingt der Schlag?

**Einflüsse:** kombinierter Wert aus Seite und Schlagtyp (siehe [05 Attribute](05-attribute.md); bei Rückhandschlägen modifiziert ihn der Rückhandtyp), Belag, Schwierigkeit der Ankunft, Risiko, Energie, Momentum, bei wichtigen Punkten die mentale Stärke.

**Ergebnis:**

- **Fehler** – Netz oder Aus
- **schwach**
- **solide**
- **stark**

Die Qualität bestimmt, wie präzise die Zielzone getroffen wird und wie schwer der Ball für den Gegner ist.

### 4. Übergabe

Der Ball landet in der Zielzone. Der Gegner beginnt wieder bei Schritt 1.

### Punktende

Ein Punkt endet durch:

- **Winner** – Ball nicht erreicht
- **Unerzwungener Fehler** – Fehler bei bequemer Ankunft
- **Erzwungener Fehler** – Fehler bei Ankunft unter Druck oder knapp
- beim Aufschlag zusätzlich **Ass** und **Doppelfehler**

## Situationsfilter

Die Situation schlägt die Tendenz. Beispiele:

| Situation                                         | Wirkung auf die Schlagwahl                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------- |
| Ankunft knapp                                     | Power und Stop kaum möglich, Lob und Slice werden wahrscheinlicher        |
| Ankunft bequem, Gegner weit hinter der Grundlinie | alle Typen möglich, Stop bekommt einen Bonus                              |
| Gegner am Netz                                    | Lob und Power (als Passierschlag) dominieren                              |
| Eigener Spieler am Netz                           | Volley bzw. Schmetterball (Attribut Netzspiel)                            |
| Ankunft bequem im Mittelfeld                      | Netzangriff wird wahrscheinlicher, wenn die Tendenz Netzangriffe vorsieht |

## Schlagtypen (Rallye)

| Schlagtyp   | Stärke                                                                                | Schwäche                                               | Energie                       | Flugkurve                    |
| ----------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------- | ---------------------------- |
| **Power**   | Hohes Tempo, Gegner kommt öfter unter Druck oder gar nicht an den Ball                | Höchste Fehlerquote, braucht bequeme Ankunft           | hoch                          | gerade, schnell              |
| **Topspin** | Sicher, tief, hoher Absprung; solider Rallyeschlag zum Druckaufbau                    | Wenig direkte Winner                                   | mittel                        | hoher Bogen, springt hoch ab |
| **Slice**   | Gut aus der Defensive, verschafft Zeit, flacher Absprung; idealer Anlaufball          | Wenig Druck, lädt zum Angriff ein                      | niedrig                       | flach, gleitend              |
| **Stop**    | Sehr effektiv gegen Gegner weit hinter der Grundlinie; kostet den Gegner viel Energie | Hohes Risiko; wird bestraft, wenn der Gegner nah steht | niedrig (für den Gegner hoch) | kurz hinter dem Netz         |
| **Lob**     | Gegen Netzspieler; als Defensivlob Zeitgewinn                                         | Zu kurz gespielt folgt ein Schmetterball               | niedrig                       | hoher Bogen über den Gegner  |

### Konter-Beziehungen

- Stop gegen Gegner, die tief stehen
- Lob gegen Netzangriffe
- Slice als Anlaufball, Power als Abschluss
- Hoher Topspin gegen eine einhändige Rückhand

## Aufschlagtypen

| Aufschlagtyp      | Profil                                                                      |
| ----------------- | --------------------------------------------------------------------------- |
| **Power** (flach) | Viele Asse und direkte Punkte, niedrigste Quote; klassischer 1. Aufschlag   |
| **Kick**          | Sicher, springt hoch ab; klassischer 2. Aufschlag, stark gegen die Rückhand |
| **Slice**         | Zieht nach außen und öffnet das Feld für den nächsten Schlag                |

### Zielseite beim Aufschlag

Die Taktik legt die Zielseite als **Vorhand oder Rückhand des Gegners** fest. Die Engine rechnet das abhängig von Spielfeldseite (Einstand/Vorteil) und Händigkeit des Gegners intern in _außen_, _Körper_ oder _durch die Mitte_ um.

## Return

Der Return wird wie ein Rallyeschlag aufgelöst, mit dem Attribut **Return** in der Ausführung. Das **Return-Risiko** steuert die Abwägung:

- **sicher:** tief in die Mitte, Ballwechsel neutralisieren
- **aggressiv:** Angriff mit dem Return, höhere Fehlerquote

## Belag

Der **Belag** ist, wie das Zählformat, ein Parameter des Matches (siehe [01 Match-Loop](01-match-loop.md)). Vorgesehen sind drei Beläge: **Sand**, **Rasen** und **Hartplatz**.

Der Belag beeinflusst, wie gut die einzelnen Schlagtypen und Aufschlagtypen gelingen. Er wirkt in der **Ausführung** (Schritt 3) als Bonus oder Malus je Typ, zusätzlich zu den Attributen des Spielers. Die Richtung ist vorgegeben: Slice ist zum Beispiel auf Rasen stärker, Topspin auf Sand. So verschiebt der Belag, welche Taktik und welche Spielertypen im Vorteil sind.

Der Belag ändert die Regelkette der Schlagauflösung nicht, sondern nur die Werte, mit denen sie rechnet. Jeder Belag hat dafür je Schlag- und Aufschlagtyp einen eigenen Ausgleichswert; die Zahlen stehen im [Balancing](balancing.md).

**Im MVP** wird kein Belag-Einfluss angewendet: Alle Ausgleichswerte sind neutral. Das Design ist aber so angelegt, dass Beläge später ergänzt werden können, ohne die Schlagauflösung zu verändern. Offen ist unter anderem, ob der Belag zusätzlich Ankunft, Laufwege oder Energieverbrauch beeinflusst (siehe [Offene Fragen](offene-fragen.md)).

## Einfluss von Energie und Momentum

Energie und Momentum wirken in den Schritten **Ankunft** und **Ausführung**. Details: [03 Energie & Momentum](03-energie-momentum.md).
