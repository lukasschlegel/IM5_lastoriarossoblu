gsap.registerPlugin(ScrollTrigger);

/* ===========================
   PARAMETER
   =========================== */
const INTRO = {
  fadeInTitleDur: 0.6,   // Titel einblenden
  holdTitleDur:  0.4,    // kurz stehen lassen
  cloudsFlyDur:  1.4,    // Wolken nach aussen fliegen
  titleFadeOut:  0.5,    // Titel ausblenden
  fadeOutIntro:  0.6,    // Intro ausblenden
  cloudFactor:   2.0,    // optional
};

// Viewport-Helfer
const vh = p => window.innerHeight * (p / 100);

/* =========================================================
   INTRO-TIMELINE (Clouds + Titel)
   ========================================================= */
const introTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    pin: ".intro-stage",
    anticipatePin: 1
  }
});

window.addEventListener("load", () => {
  /* ---------- INTRO ---------- */
  const introStage = document.querySelector(".intro-stage");
  const clouds     = gsap.utils.toArray(".intro-stage .cloud");
  const titleImg   = document.querySelector(".intro-stage .title-img");
  const titleBall  = document.querySelector(".intro-stage .title-ball");
  const bg2        = document.querySelector(".intro-stage .bg2");
  const player  = document.querySelector(".intro-stage .player");
  const player2 = document.querySelector(".intro-stage .player2");

  // Startzustände
gsap.set([titleImg, titleBall], { opacity: 0 });
gsap.set(clouds, { x: 0, y: 0, opacity: 1 });

// NEU: bg2, spieler1 (.player) und spieler2 (.player2) sicher auf 0
gsap.set([bg2, player, player2].filter(Boolean), { opacity: 0 });

  // Startzustände
  gsap.set([titleImg, titleBall], { opacity: 0 });
  gsap.set(clouds, { x: 0, y: 0, opacity: 1 });
  if (bg2) gsap.set(bg2, { opacity: 0 });

  // 1) Titel + Ball erscheinen
  introTL.to([titleImg, titleBall], {
    opacity: 1,
    ease: "none",
    duration: INTRO.fadeInTitleDur
  }, 0);

  // 2) kurz halten
  introTL.to({}, { duration: INTRO.holdTitleDur }, ">");

  // 3) Clouds fliegen in feste Richtungen (symmetrisch verteilt)
  const directions = [
    { x: -600, y:  400 }, // Cloud1: unten links
    { x:  600, y:  400 }, // Cloud2: unten rechts
    { x: -600, y: -400 }, // Cloud3: oben links
    { x:  600, y: -400 }, // Cloud4: oben rechts
    { x:    0, y: -600 }, // Cloud5: oben
    { x:    0, y:  600 }, // Cloud6: unten
    { x:    0, y: -800 }  // Cloud7: weiter nach oben
  ];

  clouds.forEach((el, i) => {
    const dir = directions[i % directions.length];
    introTL.to(el, {
      x: dir.x,
      y: dir.y,
      opacity: 0,
      ease: "power2.out",
      duration: INTRO.cloudsFlyDur
    }, "<"); // parallel starten
  });
// 3b) Hintergrund2 + Spieler gleichzeitig einblenden


if (bg2)   gsap.set(bg2,    { opacity: 0 });
if (player) gsap.set(player, { opacity: 0 });

if (bg2 || player) {
  introTL.to([bg2, player].filter(Boolean), {
    opacity: 1,
    ease: "none",
    duration: 0.6
  }, "<"); // parallel zu den Cloud-Fades starten
}

  // 4) Titel ausblenden (Ball bleibt sichtbar!)
  introTL.to(titleImg, {
    opacity: 0,
    ease: "none",
    duration: INTRO.titleFadeOut
  }, "<");


// === BALL-TIMELINE: erscheint mit Titel -> kurzer Halt -> langsamer Fall ===
const ballTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro",
    start: "top top",
    // LÄNGERER Scrollweg = langsameres Scrubben
    end: "+=3000",      // bei Bedarf auf +=4000/5000 erhöhen
    scrub: true
  }
});

// Ball erscheint bereits mit dem Titel (passiert in introTL).
// Hier nur: kurzer Halt auf der Startposition …
ballTL.to({}, { duration: 0.1 }); // 0.3 = kurzer Stopp; bei Bedarf anpassen

// … dann langsam nach unten fallen (einziger Fall-Tween!)
ballTL.to(".title-ball", {
  y: vh(3750),            // <-- HIER pro Keyframe deine Falltiefe festlegen (siehe Punkt 2)
  ease: "power2.in",
  duration: 1.2
}, "startFall");

// Spielerwechsel (harter Cut) nach 0.1s ab Start des Falls:
const switchAt = "startFall+=0.24";
ballTL
  .to(player,  { opacity: 0, duration: 0 }, switchAt)          // sofort unsichtbar
  .set(player, { display: "none" },           switchAt)        // komplett aus dem Layout
  .set(player2,{ display: "block" },          switchAt)        // sicherstellen, dass er sichtbar sein darf
  .to(player2, { opacity: 1, duration: 0 },   switchAt);       // sofort sichtbar

});

/* Hinweis: Alle Dogana-Animationen wurden entfernt */