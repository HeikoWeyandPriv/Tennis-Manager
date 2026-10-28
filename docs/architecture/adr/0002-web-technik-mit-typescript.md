# 0002 – Web-Technik mit TypeScript

- **Status:** angenommen
- **Datum:** 2026-10-28
- **Issue:** #2

## Kontext

Das Spiel besteht zu großen Teilen aus Oberflächen rund um das Match: Trainingsplanung, Turnierkalender, Spielerprofil, Changeover-Statistiken. Die Match-Darstellung ist eine einfache 2D-Draufsicht mit wenigen Objekten. Das Spiel soll zunächst lokal und allein gespielt werden. Die Umsetzung erfolgt weitgehend agentisch mit Claude Code; Code, Konfiguration und Tests müssen daher als Textdateien bearbeit- und prüfbar sein.

## Betrachtete Optionen

1. **Web-Technik mit TypeScript** – sehr stark bei menülastigen Oberflächen; Spiellogik ohne Grafik testbar; Claude arbeitet damit sehr zuverlässig; später als Browserspiel oder Desktop-App auslieferbar. Für aufwendige 3D-Grafik ungeeignet (nicht benötigt).
2. **Web-Technik mit JavaScript** – wie 1, aber ohne Typprüfung; Fehler fallen später auf.
3. **Godot** – echte 2D-Engine, exportiert für Web und Desktop. Management-Oberflächen mühsam; viel Arbeit im Editor, die Agenten schlecht bearbeiten und prüfen können.
4. **Unity** – sehr mächtig, aber editorzentriert und für ein 2D-Management-Spiel überdimensioniert.
5. **Python** (z. B. Pygame) – einfache Simulation, aber schwache Oberflächen und umständliche Auslieferung.

## Entscheidung

Das Spiel wird mit **Web-Technik in TypeScript** gebaut.

## Begründung

- Der größte Teil des Spiels ist Oberfläche – das Kerngebiet von Web-Technik.
- Alles liegt als Text vor und ist automatisiert testbar; ideal für agentische Entwicklung.
- Die Typen von TypeScript sind eine Leitplanke für Agenten: viele Fehler fallen beim Kompilieren auf.
- Die Entscheidung über die Auslieferung bleibt offen (siehe ADR 0009).

## Konsequenzen

- TypeScript wird im strikten Modus verwendet.
- Grafisch aufwendige Darstellung (3D, viele Partikel) ist nicht vorgesehen.
- Folgeentscheidungen: Struktur (0004), Oberfläche (0005), Darstellung (0006).
