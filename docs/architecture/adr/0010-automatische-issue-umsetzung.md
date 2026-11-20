# 0010 – Automatische Issue-Umsetzung per GitHub Action

- **Status:** angenommen
- **Datum:** 2026-11-15
- **Issue:** #23

## Kontext

Umsetzbare Issues (Typ „Aufgabe“) sollen automatisch von Claude bearbeitet werden. Design- und Klärungsfragen (Issues mit Label `braucht-entscheidung`, Typ „Entscheidung“) bleiben bei Heiko und Claude Code, weil sie Dialog erfordern. Der Git-Prozess aus `CLAUDE.md` bleibt unverändert: Branch, Pull Request, Merge nur durch den Projektinhaber.

## Betrachtete Optionen

1. **Claude Code GitHub Action, ausgelöst per Label** – explizit, kein versehentlicher Start, Einstiegspunkt ist der vorhandene Skill `issue-umsetzen`.
2. **Auslösung per `@claude`-Kommentar** – flexibel, aber ein zusätzlicher Schritt pro Issue und leichter versehentlich auszulösen.
3. **Automatischer Start bei jedem neuen Issue** – ungeeignet, da Entscheidungs-Issues nicht automatisch bearbeitet werden dürfen.

## Entscheidung

Option 1. Der Workflow `.github/workflows/claude-issues.yml` startet, wenn der Projektinhaber das Label `claude-umsetzen` setzt. Er startet nicht bei Issues mit dem Label `braucht-entscheidung`. Claude arbeitet nach dem Skill `issue-umsetzen`, öffnet einen Pull Request und mergt nie selbst.

## Begründung

Das Label macht die Freigabe zu einem bewussten Schritt. Design-Issues bleiben ohne Label und damit unberührt. Regeln und Ablauf liegen bereits im Repository (`CLAUDE.md`, Skill) und werden wiederverwendet.

## Konsequenzen

- Einmalig nötig: Claude GitHub App installieren, Repository-Secret `CLAUDE_CODE_OAUTH_TOKEN` anlegen (`claude setup-token`), unter Settings → Actions „Allow GitHub Actions to create pull requests“ aktivieren.
- Die Läufe verbrauchen das Nutzungskontingent des Claude-Abos.
- `main` muss weiterhin durch Branch-Schutz mit Review geschützt sein.
- Läufe sind durch Timeout (45 Minuten) und `--max-turns` begrenzt.
- Das Label `claude-umsetzen` setzt man erst, wenn das Issue klare Akzeptanzkriterien hat und die zugehörigen Design-Entscheidungen angenommen sind.
