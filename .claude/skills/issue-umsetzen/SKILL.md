---
name: issue-umsetzen
description: Setzt ein GitHub Issue dieses Repositorys nach dem festgelegten Ablauf um – Design und ADRs lesen, Plan posten, umsetzen, testen, Pull Request öffnen. Verwenden, wenn ein Issue umgesetzt werden soll.
---

# Issue umsetzen

Ablauf für jede Umsetzung eines Issues. Die Pflichtregeln aus `CLAUDE.md` gelten immer.

## 1. Verstehen

- Issue vollständig lesen, inklusive aller Kommentare.
- Alle im Abschnitt „Bezug zu Design und Architektur“ genannten Dokumente lesen.
- Zusätzlich `docs/design/glossar.md` und alle ADRs mit Status `angenommen`, die den betroffenen Bereich berühren.

## 2. Prüfen

Anhalten und im Issue nachfragen (Label `braucht-entscheidung` setzen), wenn:
- das Issue dem Design oder einem ADR widerspricht,
- Akzeptanzkriterien fehlen oder mehrdeutig sind,
- die Umsetzung eine neue Architekturentscheidung erfordert, deren Richtung nicht klar ist.

## 3. Planen

Einen kurzen Plan als Kommentar im Issue posten: betroffene Dateien, Vorgehen, geplante Tests, ggf. geplanter ADR.

## 4. Umsetzen

- Branch: `issue-<nr>-<kurzer-titel>`
- Nur umsetzen, was das Issue verlangt.
- Balancing-Werte in Konfiguration, nicht im Code.
- Bei Architekturentscheidungen: ADR aus `docs/architecture/adr/0000-vorlage.md` anlegen und in `docs/architecture/adr/README.md` und `docs/architecture/overview.md` eintragen.

## 5. Absichern

- Tests für alle Akzeptanzkriterien schreiben und ausführen.
- Jedes Akzeptanzkriterium einzeln gegen das Ergebnis prüfen.

## 6. Abgeben

- Pull Request gegen `main` mit der PR-Vorlage, `Closes #<nr>`, Checkliste ehrlich ausgefüllt.
- Offene Punkte und Abweichungen im Abschnitt „Offene Punkte“ nennen.
- Nicht selbst mergen.
