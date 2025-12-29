# La storia Rossoblù – Scrollytelling

Scrollytelling-Webprojekt mit Bildsequenz, Scrollsteuerung und Sounddesign.

## Projektbeschreibung

Dieses Projekt ist ein interaktives Scrollytelling über die Geschichte des FC Chiasso.
Die Erzählung wird über eine animierte Bildsequenz realisiert, die durch Scrollen
gesteuert wird und durch gezielte Soundatmosphären ergänzt wird.

Ziel des Projekts ist es, eine lineare historische Erzählung in eine
interaktive, visuelle Web-Erfahrung zu übersetzen.
Der Fokus liegt auf:
- visuellem Storytelling
- Scroll-basierter Interaktion
- Sounddesign als narratives Element

## Vorgehen

Zu Beginn habe ich mich darauf konzentriert, einen klaren Plan für das Projekt zu erstellen und festzulegen, welche Fotografien ich dafür in Chiasso aufnehmen musste. Nach einem ersten Shooting in Chiasso begann ich auf dem iPad in der App Procreate damit, einen Stil für meine gezeichneten Figuren zu entwickeln. Ich entschied mich dafür, die Figuren mit einem B6-Bleistift zu zeichnen und sie anschliessend mit Wasserfarben auszumalen (siehe Abb. 1).


![Animationsausschnitt](media/Zeichnung.gif)
*Abb.1: Prozess der Gestaltung der gezeichneten Figuren in Pro Create*


Danach integrierte ich das Hintergrundbild sowie die gezeichneten Figuren direkt in meine Webseite und versuchte, einen gezeichneten Ball so zu animieren, dass er mithilfe von GSAP ScrollTrigger und Positionsdaten direkt im Browser bewegt wurde. Dieser Ansatz stellte sich jedoch als äusserst aufwendig und letztlich zu ungenau heraus. Es war sehr schwierig, die exakte Position des Balls sowie dessen Flugbahn präzise zu programmieren. Zusätzlich erwies sich die Umsetzung als problematisch in Bezug auf Responsiveness, da sich die Animation auf unterschiedlichen Bildschirmgrössen nur schwer kontrollieren liess.

An einem weiteren Tag ging ich erneut in Chiasso fotografieren und hatte unter anderem die Möglichkeit, im Grotto Carlino Bilder aufzunehmen, dem ursprünglichen Grotto, in dem der FC Chiasso gegründet wurde (siehe Abb. 2). Bis auf zwei Fotografien (Historisches Bild des Campo del Gas, da der Platz nicht mehr existiert und das Foto des Fussballplatzes in Sementina, auf dem das Aufstiegsspiel in die zweite Liga stattfand), konnte ich alle Bilder selbst mit meiner Kamera aufnehmen.


![Alternativtext](img/GrottoCarlino.jpg)
*Abb.2: Grotto Carlino mit der Geburtsurkundentafel des FC Chiasso*


Nachdem ich alle Fotografien gesammelt hatte, bearbeitete ich diese einzeln in Photoshop, um sie stilistisch an die jeweilige Epoche anzupassen. Anschliessend entschied ich mich, die Bilder und Zeichnungen in After Effects zusammenzuführen und als PNG-Sequenz zu exportieren. Dieser Schritt brachte den grossen Vorteil mit sich, dass ich die Bewegung des Balls mithilfe von Keyframes in After Effects deutlich präziser animieren konnte (siehe Abb. 3).


![Alternativtext](img/AfterEffects.png)
*Abb.3: Animation im After Effects*


Für die Webseite setzte ich das responsive Verhalten so um, dass ich einen fixen Container mit einem Seitenverhältnis von 16:9 erstellte. In diesen Container integrierte ich die PNG-Sequenz und steuerte sie mithilfe von GSAP ScrollTrigger über das Scrollen der Seite.

Um das Erlebnis immersiver zu gestalten, erstellte ich zusätzlich Soundkulissen für die einzelnen Szenen mit Adobe Audition (siehe Abb. 4). Diese Sounds wurden per JavaScript anhand der jeweiligen Bildnummern passend zu den Szenen eingebunden. Zur besseren Orientierung für die Benutzer:innen integrierte ich ausserdem einen Info-Button mit Hover-Aktion, der ein Pop-up öffnet und zusätzliche Informationen über das Projekt vermittelt.

![Alternativtext](img/AdobeAudition.png)
*Abb.4: Sounddesign in Adobe Audition*

Beim Laden der Seite erscheint zudem eine kleine Loop-Animation, die die Benutzer:innen dazu auffordert, zu scrollen, um die Animation zu starten. Zusätzlich besteht die Möglichkeit, die Geräusche über ein Lautsprecher-Symbol ein- oder auszuschalten. Beim Öffnen der Seite wird ausserdem ein Ladescreen mit Ladebalken angezeigt, der visuell vermittelt, wie lange der Ladevorgang der Bildsequenz dauert. Wird die Seite auf einem mobilen Gerät im Hochformat geöffnet, erscheint eine Meldung, die darauf hinweist, dass das Gerät gedreht werden muss, damit die Animation korrekt dargestellt werden kann.


## Learnings

- 

## Schwierigkeiten

- Die vielleicht grösste Herausforderng war es, die Seite performant zu gestalten. Die ursprüngliche PNG-Sequenz fie ich aus den After effects kopeirt habe war viel zu gross (ca. 3GB) also habe ich die PNG ind WEBPs umgewandwlrt und konnte so jeweils über 90% der ursprünglichen Dateigrösse ienspraren. Ich habe mich schlussenldihc für einen Ladebildschirm entschieden, der alle WEBps lädt bevor die seite angezeigt wird, damit man dann ohne lags durch die ganze animation scrollen kann.
- Eine Herausforderung war auch, die Geschichte so zu erzählen, dass ich möglcihst auf text verzichten konnte, aber doch durch das visuelle und audiovisuelle erlebnis die geschite der FC chiasso erzählöen konnte. Hier muss ich dagen, dass es natürlicih von vroteil ist wenn man den Club schin kennt.
- Beim anmaieren des bals direkt auf der Webeite mit javascrit ahbe ich mir regelrecht die zähne daran ausgebissen. ich bin viele stunden darngsessen, musste aber shclussendlich einseehn, dass es mit meinem jetzigen kenntnissctand besser sit, wenn ich den umweg pber after effects mache um die aniamioin zu erstellen.


## Ressourcen

- GSAP: https://greensock.com/gsap/
- ScrollTrigger: https://greensock.com/scrolltrigger/
- MDN Web Docs für CSS/JS Grundlagen
- Browser DevTools für Debugging und Performance-Analyse
- Visual Studio Code

Das finale Projekt ist online verfügbar unter:
[La storia Rossoblù – Scrollytelling](https://lukasschlegel.ch/lastoriarossoblu/index.html)
