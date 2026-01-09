# La storia rossoblù – Scrollytelling

**Scrollytelling-Webprojekt mit Bildsequenz, Scrollsteuerung und Sounddesign.**

## Projektbeschreibung

Dieses Projekt ist ein interaktives Scrollytelling über die Geschichte des FC Chiasso.
Die Erzählung wird über eine animierte Bildsequenz realisiert, die durch Scrollen
gesteuert und durch gezielte Soundatmosphären ergänzt wird.

Ziel des Projekts ist es, eine Fussballvereinsgeschichte in eine
lineare, interaktive und visuelle Web-Erfahrung zu übersetzen.
Der Fokus liegt auf folgenden drei Schwerpunkten:
- visuelles Storytelling
- Scroll-basierte Interaktion
- Sounddesign als narratives Element

## Vorgehen

Zu Beginn habe ich mich darauf konzentriert, einen klaren Plan für das Projekt zu erstellen und festzulegen, welche Fotografien dafür in Chiasso aufzunehmen waren. Nach einem ersten Shooting in Chiasso begann ich auf dem iPad in der App Procreate damit, einen Stil für meine gezeichneten Figuren zu entwickeln. Ich entschied mich dafür, die Figuren mit einem B6-Bleistift zu zeichnen und sie anschliessend mit Wasserfarben auszumalen (siehe Abb. 1).

![Animationsausschnitt](media/Zeichnung.gif)

*Abb.1: Gestaltungsprozess der gezeichneten Figuren in Pro Create.*

Danach integrierte ich das Hintergrundbild sowie die gezeichneten Figuren direkt in meine Webseite und versuchte, einen gezeichneten Ball so zu animieren, dass er mithilfe von GSAP ScrollTrigger und Positionsdaten direkt im Browser bewegt wurde. Dieser Ansatz stellte sich jedoch als äusserst aufwendig und letztlich zu ungenau heraus. Es war sehr schwierig, die exakte Position des Balls sowie dessen Flugbahn präzise zu programmieren. Zusätzlich erwies sich die Umsetzung als problematisch in Bezug auf Responsiveness, da sich die Animation auf unterschiedlichen Bildschirmgrössen nur schwer kontrollieren liess.

An einem weiteren Tag machte ich eine weitere Fotosession in Chiasso und hatte unter anderem die Möglichkeit, im Grotto del Carlin, dem ursprünglichen Ort, in dem der FC Chiasso gegründet wurde, Bilder aufzunehmen (siehe Abb. 2). Bis auf zwei Fotografien (historisches Bild des Campo del Gas, da der Platz nicht mehr existiert sowie das Foto des Fussballplatzes in Sementina, auf dem das Aufstiegsspiel in die zweite Liga stattfand), konnte ich alle Bilder selbst mit meiner Kamera aufnehmen.

![Alternativtext](img/GrottoCarlino.jpg)
*Abb.2: Grotto del Carlin mit der Gründungstafel des FC Chiasso*

Nachdem ich alle Fotografien gesammelt hatte, bearbeitete ich diese einzeln in Photoshop, um sie stilistisch an die jeweilige Epoche anzupassen. Anschliessend entschied ich mich, die Bilder und Zeichnungen in After Effects zusammenzuführen und als PNG-Sequenz zu exportieren. Dieser Schritt brachte den grossen Vorteil mit sich, dass ich die Bewegung des Balls mithilfe von Keyframes in After Effects deutlich präziser animieren konnte als direkt auf der Webseite (siehe Abb. 3).

![Alternativtext](img/AfterEffects.png)
*Abb.3: Projekt in After Effects*

Für die Webseite setzte ich das responsive Verhalten so um, dass ich einen fixen Container mit einem Seitenverhältnis von 16:9 erstellte. In diesen Container integrierte ich die PNG-Sequenz und steuerte sie mithilfe von GSAP ScrollTrigger über das Scrollen der Seite.

Um das Erlebnis immersiver zu gestalten, erstellte ich zusätzlich Soundkulissen für die einzelnen Szenen mit Adobe Audition (siehe Abb. 4). Diese Sounds wurden per JavaScript anhand der jeweiligen Bildnummern passend zu den Szenen eingebunden. Zur besseren Orientierung für die Benutzer:innen integrierte ich ausserdem einen Info-Button mit Hover-Aktion, der ein Pop-up öffnet und zusätzliche Informationen über das Projekt vermittelt.

![Alternativtext](img/AdobeAudition.png)
*Abb.4: Das Sounddesign aus zwei verschiedenen SFX in Adobe Audition*

Beim Laden der Seite erscheint zudem eine kleine Loop-Animation, die die Benutzer:innen dazu auffordert, zu scrollen, um die Animation zu starten. Zusätzlich besteht die Möglichkeit, die Geräusche über ein Lautsprecher-Symbol ein- oder auszuschalten. Beim Öffnen der Seite wird ausserdem ein Ladescreen mit Ladebalken angezeigt, der visuell vermittelt, wie lange der Ladevorgang der Bildsequenz dauert. Wird die Seite auf einem mobilen Gerät im Hochformat geöffnet, erscheint eine Meldung, die darauf hinweist, dass das Gerät gedreht werden muss, damit die Animation korrekt dargestellt werden kann.


## Schwierigkeiten

- Die vielleicht grösste Herausforderung war es, die Seite performant zu gestalten. Die ursprüngliche PNG-Sequenz, die ich aus After Effects exportiert hatte, war viel zu gross (ca. 3 GB). Deshalb habe ich alle PNGs in WEBP-Dateien umgewandelt und konnte so über 90 Prozent der ursprünglichen Dateigrösse einsparen. Letztlich habe ich mich für einen Ladebildschirm entschieden, der alle WEBPs vollständig lädt, bevor die Seite angezeigt wird. Dadurch kann man danach ohne Lags durch die gesamte Animation scrollen.
- Eine weitere Herausforderung war es, die Geschichte so zu erzählen, dass ich möglichst auf Text verzichten konnte, die Geschichte des FC Chiasso aber dennoch durch das visuelle und audiovisuelle Erlebnis verständlich wird. Hier muss ich sagen, dass es natürlich von Vorteil ist, wenn man bereits etwas über den Club weiss.
- Beim Animieren des Balls direkt auf der Webseite mit JavaScript habe ich mir regelrecht die Zähne ausgebissen. Ich habe viele Stunden daran gearbeitet, musste aber schliesslich einsehen, dass es mit meinem aktuellen Kenntnisstand sinnvoller ist, den Umweg über After Effects zu gehen und die Animation dort zu erstellen.
- Auch die Seite responsive zu gestalten, erwies sich als schwierig. Die Lösung, einen fixen Container mit einem festen Seitenverhältnis zu verwenden, der beim Skalieren das 16:9-Format beibehält, hat dabei deutlich geholfen.


## Learnings
- Performance ist entscheidend für das Nutzungserlebnis.
Besonders bei bildintensiven, scrollbasierten Animationen ist eine gute Performance zentral. Die Umwandlung der PNG-Sequenz in WEBP-Dateien und der Einsatz eines Ladebildschirms waren notwendig, um ein flüssiges Scroll-Erlebnis ohne Ruckler zu ermöglichen. Hier sehe ich aber noch Potential für eine weitere Arbeit, um die Seite so aufzubauen, dass die Ladezeit am Anfang minimiert werden kann.
- Komplexe Animationen lassen sich nicht immer sinnvoll direkt im Browser umsetzen.
Der Versuch, den Ball direkt mit JavaScript und GSAP zu animieren, erwies sich als zu aufwendig und zu ungenau. Die Entscheidung, die Animation in After Effects zu erstellen und als Bildsequenz zu exportieren, führte zu einem deutlich präziseren und zuverlässigeren Ergebnis.
- Responsives Design bei Animationen erfordert klare Einschränkungen.
Um die Animation über verschiedene Bildschirmgrössen hinweg stabil darzustellen, war es notwendig, mit einem fixen Container im Seitenverhältnis 16:9 zu arbeiten. Dies vereinfachte die Umsetzung und verhinderte Darstellungsprobleme.
- Audio im Web bringt technische Einschränkungen mit sich.
Die Umsetzung von Soundkulissen zeigte, dass moderne Browser – insbesondere auf Mobile-Geräten – klare Regeln für Audio-Wiedergabe haben. Eine bewusste Benutzerinteraktion zur Aktivierung des Tons war zwingend notwendig.
- Weniger Text erfordert stärkeres visuelles Storytelling.
Der bewusste Verzicht auf erklärenden Text machte deutlich, wie wichtig Bild, Bewegung, Sound und deren Zusammenspiel für das Erzählen einer Geschichte sind. Gleichzeitig wurde klar, dass visuelles Storytelling auch ein Vorwissen beim Publikum voraussetzt.


## Ressourcen
- [GSAP](https://greensock.com/gsap/)
- [ScrollTrigger](https://greensock.com/scrolltrigger/)
- [MDN Web Docs](https://developer.mozilla.org/) – Dokumentation für CSS- und JavaScript-Grundlagen
- [W3Schools](https://www.w3schools.com/) – Referenz und Tutorials für CSS und JavaScript
- [Ramon Playground](https://playground.gridonic.io/ramon-playground/version-1) – Inspirationsquelle
- [Ruba Sprites Techniques](https://playground.gridonic.io/scroll-experience-techniques/sprites-ruba) – Inspirationsquelle
- ChatGPT als Unterstützung beim Programmieren
- Adobe Creative Cloud (Photoshop, After Effects, Audition)
- XnConvert für die Umwandlung von PNG zu WEBP
- Procreate (Ipad)
- Pixabay (SFX)
- Sony A7IV Kamera
- Browser DevTools für Debugging und Performance-Analyse
- Visual Studio Code
  

## Live-Demo: 
**[La storia rossoblù – Scrollytelling](https://lukasschlegel.ch/lastoriarossoblu/index.html)**
