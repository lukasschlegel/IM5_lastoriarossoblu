# Storia Rossoblù – Scrollytelling über die Geschichte des FC Chiasso

Ein interaktives Scrollytelling-Projekt, das die Geschichte des FC Chiasso visualisiert.  
Die Intro-Szene kombiniert GSAP-Animationen, ScrollTrigger, PNG-Layer, einen frei animierbaren Ball sowie Übergänge zwischen verschiedenen Spielerbildern.

## Kurzbeschreibung

Das Projekt enthält eine animierte Intro-Szene:

- Wolken erscheinen übereinander und fliegen beim Scrollen symmetrisch auseinander.
- Titel und Ball werden eingeblendet und bleiben kurz stehen.
- Hintergrundgrafik und Spielerbild blenden ein.
- Der Ball fällt in mehreren Keyframe-Bewegungen langsam nach unten.
- Beim Erreichen eines definierten Scroll-Zeitpunkts wird Spieler 1 durch Spieler 2 ersetzt.
- Alle Animationen sind vollständig scrollgesteuert.

Die Seite dient als Auftakt für ein längeres Scrollytelling über die Vereinsgeschichte.

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
