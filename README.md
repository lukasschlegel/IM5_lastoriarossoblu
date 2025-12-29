# La storia Rossoblù – Scrollytelling

Scrollytelling-Webprojekt mit Bildsequenz, Scrollsteuerung und Sounddesign.

## Projektbeschreibung

Dieses Projekt ist ein interaktives Scrollytelling über die Geschichte des FC Chiasso.
Die Erzählung wird über eine animierte Bildsequenz realisiert, die durch Scrollen
gesteuert wird und durch gezielte Soundatmosphären ergänzt wird.

## Learnings

- Arbeiten mit `GSAP.timeline()` inkl. Labels, Keyframes und parallelen Animationen.
- Umgang mit `ScrollTrigger` (scrub, pinning, ScrollDistanz vs. Zeit).
- Unterschied zwischen zeitgesteuerten Animationen und scrollbasierten Abläufen.
- Kombination mehrerer übereinanderliegender Ebenen (Clouds, Titel, Spieler, Ball).
- Verwaltung komplexer Timings über Labels und präzise Triggerpunkte.
- Verständnis von CSS-Layern, z-Index, object-fit und absoluter Positionierung.

## Schwierigkeiten

- Abstimmung der Scrollhöhe (`intro { height: xxxvh; }`) auf das gewünschte Timing.
- Verhindern, dass Animationen sich gegenseitig überschreiben.
- Spielerwechsel ohne Fade, aber mit sauberem Entfernen aus dem Layout (`display:none`).
- Richtige Startwerte für Wolken, Titel, Ball und Hintergrund initial per `gsap.set`.
- Scrollabhängige Fallanimation benötigt ausreichend Scrollraum, sonst keine sichtbare Bewegung.
- Synchronisation von Hintergrund-Fade, Spielerwechsel und Ball-Keyframes.

## Ressourcen

- GSAP: https://greensock.com/gsap/
- ScrollTrigger: https://greensock.com/scrolltrigger/
- MDN Web Docs für CSS/JS Grundlagen
- Browser DevTools für Debugging und Performance-Analyse
- Visual Studio Code

STAND: 25. November 2025
