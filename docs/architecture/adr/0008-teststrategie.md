# 0008 – Teststrategie

- **Status:** angenommen
- **Datum:** 2026-10-28
- **Issue:** #2

## Kontext

Das Projekt wird weitgehend agentisch entwickelt. Tests sind neben den Dokumenten die wichtigste Leitplanke: Sie prüfen, ob eine Umsetzung den Akzeptanzkriterien und dem Design entspricht. Die Engine ist deterministisch (ADR 0003) und damit gut testbar.

## Entscheidung

| Ebene         | Werkzeug                             | Zweck                                                                                                                     |
| ------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Engine        | **Vitest**                           | Tests der Spiellogik, schnell und ohne Browser                                                                            |
| Invarianten   | **fast-check**                       | Eigenschaftsbasierte Tests über viele Zufallsfälle, z. B. „Energie wird nie negativ“, „ein Satz endet immer regelkonform“ |
| Determinismus | Vitest                               | Gleicher Seed und gleiche Eingaben ergeben identische Ergebnisse                                                          |
| Balancing     | eigenes Skript in `tools/`           | Massensimulationen mit Statistikausgabe; zur Analyse, nicht als bestehen/nicht-bestehen-Test                              |
| Oberfläche    | **Vitest** mit React Testing Library | Komponenten und Oberflächenlogik                                                                                          |
| Ende-zu-Ende  | **Playwright**                       | Durchklicken der Anwendung im Browser, inklusive Screenshots                                                              |
| Codestil      | **ESLint** und **Prettier**          | Einheitlicher Stil, frühes Erkennen von Fehlern                                                                           |
| Typen         | TypeScript im strikten Modus         | Typprüfung als eigener Schritt                                                                                            |

Regeln:

- Neue Engine-Logik wird immer mit Tests ausgeliefert.
- Die CI führt Typprüfung, Lint und Tests für jeden Pull Request aus; ein Pull Request wird nur mit grüner CI gemergt.
- Tests, die Balancing-Werte prüfen, verwenden eigene Test-Konfigurationen, damit Balancing-Änderungen keine Logiktests brechen.

## Begründung

Die Kombination prüft Logik, Regeln und Oberfläche auf jeweils passender Ebene. Eigenschaftsbasierte Tests finden gerade in Simulationen Fehler, an die man beim Schreiben einzelner Fälle nicht denkt.

## Konsequenzen

- Die CI wird bei der Projekteinrichtung angelegt.
- Ende-zu-Ende-Tests werden eingeführt, sobald es eine bedienbare Oberfläche gibt.
