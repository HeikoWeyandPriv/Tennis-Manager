# 0009 – Statische Anwendung ohne Backend, Auslieferung zurückgestellt

- **Status:** angenommen
- **Datum:** 2026-10-28
- **Issue:** #2

## Kontext

Das Spiel wird zunächst allein und lokal gespielt. Ein späteres Hosting ist unwahrscheinlich. Wie das Spiel später ausgeliefert und gestartet wird, hat im Moment keine Relevanz, soll aber nicht durch heutige Entscheidungen verbaut werden.

## Betrachtete Optionen für die spätere Auslieferung

1. **Lokaler Server** (`pnpm dev` / `pnpm preview`) – ideal während der Entwicklung.
2. **Statische Seite im Netz** (z. B. GitHub Pages, Netlify).
3. **Installierbare Web-App (PWA)** – offline nutzbar.
4. **Desktop-App mit Tauri** – kleine Programmdatei, Zugriff auf das Dateisystem.
5. **Desktop-App mit Electron** – bewährt, aber deutlich größer.

## Entscheidung

- Das Spiel ist eine **rein statische Web-Anwendung ohne Backend**. Der Build besteht nur aus statischen Dateien.
- Während der Entwicklung wird es über den Vite-Entwicklungsserver gestartet.
- Die Entscheidung über die **endgültige Auslieferung wird zurückgestellt**.

## Begründung

Ohne Backend bleiben alle Auslieferungswege offen. Zusammen mit dem Spielstand-Export (ADR 0007) ist auch ein späterer Wechsel des Auslieferungswegs ohne Verlust von Spielständen möglich.

## Konsequenzen

- Kein Server, keine Benutzerkonten, keine Netzwerkzugriffe zur Laufzeit.
- Alle Daten und Ressourcen werden mit dem Build ausgeliefert.
- Wenn die Auslieferung entschieden wird, entsteht ein neuer ADR.
