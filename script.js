gsap.registerPlugin(ScrollTrigger);

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const SEQUENCE = {
  frameCount: 1137,
  path: "sequence/",
  prefix: "lastoriarossoblu_",
  pad: 5,
  startIndex: 0,
  ext: ".webp",
  scrollLength: 8000
};

const ORIENTATION = {
  breakpoint: 1150,
  warningClass: "show-orientation-warning"
};

const LOADER = { minTime: 3000 };

const SOUND_REGIONS = [
  { src: "sound/wolken.mp3", startFrame: 0, endFrame: 30, fadeInFrames: 0, fadeOutFrames: 5, maxVolume: 0.6 },
  { src: "sound/park.mp3", startFrame: 30, endFrame: 110, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 1.0 },
  { src: "sound/cafe_ambiente.mp3", startFrame: 110, endFrame: 185, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 0.9 },
  { src: "sound/street_ambiance.mp3", startFrame: 186, endFrame: 248, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 0.9 },
  { src: "sound/campodelgas.mp3", startFrame: 249, endFrame: 321, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 0.7 },
  { src: "sound/radiovoice.mp3", startFrame: 322, endFrame: 391, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 1.1 },
  { src: "sound/dogana.mp3", startFrame: 392, endFrame: 450, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 0.9 },
  { src: "sound/dogana2.mp3", startFrame: 451, endFrame: 508, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 0.9 },
  { src: "sound/piazza.mp3", startFrame: 509, endFrame: 591, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 0.9 },
  { src: "sound/cantiere.mp3", startFrame: 592, endFrame: 677, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 0.9 },
  { src: "sound/stadion_vorplatz.mp3", startFrame: 678, endFrame: 773, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 0.9 },
  { src: "sound/gacs.mp3", startFrame: 774, endFrame: 865, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 0.9 },
  { src: "sound/zirpen.mp3", startFrame: 866, endFrame: 954, fadeInFrames: 5, fadeOutFrames: 5, maxVolume: 0.9 },
  { src: "sound/playoff.mp3", startFrame: 955, endFrame: 1068, fadeInFrames: 5, fadeOutFrames: 2, maxVolume: 0.8 },
  { src: "sound/viadachiasso.mp3", startFrame: 1069, endFrame: 1137, fadeInFrames: 8, fadeOutFrames: 0, maxVolume: 0.9 }
];

const KICK_SFX = {
  src: "sound/fussball_kick.mp3",
  triggerFrames: [51, 274, 896, 921, 945]
};

const padNumber = (num, size) => String(num).padStart(size, "0");

const getFrameFile = (index) => {
  const padded = padNumber(SEQUENCE.startIndex + index, SEQUENCE.pad);
  return `${SEQUENCE.path}${SEQUENCE.prefix}${padded}${SEQUENCE.ext}`;
};

const isPortrait = () => window.matchMedia("(orientation: portrait)").matches;

let lastPortraitState = isPortrait();

function toggleOrientationNotice() {
  const narrow = window.innerWidth < ORIENTATION.breakpoint;
  document.body.classList.toggle(ORIENTATION.warningClass, isPortrait() && narrow);
}

function handleOrientationChange() {
  toggleOrientationNotice();
  ScrollTrigger.refresh(true);

  const nowPortrait = isPortrait();
  if (lastPortraitState && !nowPortrait) {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  lastPortraitState = nowPortrait;
}

function preloadSequence(onLoaded) {
  const images = new Array(SEQUENCE.frameCount);
  window._preloadedImgs = images;

  const loaderFill = document.querySelector(".loader-bar-fill");
  const loaderBall = document.querySelector(".loader-ball");
  const bar = document.querySelector(".loader-bar");

  let loadedCount = 0;
  const startTime = performance.now();

  const MAX_CONCURRENT = 8;
  let nextIndex = 0;
  let active = 0;

  let displayedProgress = 0;
  let rafUi = null;

  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  function setUI(progress01) {
    if (!loaderFill || !loaderBall || !bar) return;

    const p = Math.max(0, Math.min(1, progress01));
    const barW = bar.clientWidth;

    const ballW = loaderBall.clientWidth || 38;
    const minX = ballW / 2;
    const maxX = barW - ballW / 2;

    const x = minX + (maxX - minX) * p;

    loaderFill.style.transform = `scaleX(${x / barW})`;

    const turns = 3;
    const deg = p * 360 * turns;
    loaderBall.style.transform =
      `translate3d(${x}px, -50%, 0) translate3d(-50%, 0, 0) rotate(${deg}deg)`;
  }

  function tickUI() {
    const now = performance.now();
    const targetProgress = loadedCount / SEQUENCE.frameCount;
    const timeProgress = Math.min(1, (now - startTime) / LOADER.minTime);
    const timeCapped = easeInOut(timeProgress);

    const desired = Math.min(targetProgress, timeCapped);
    displayedProgress += (desired - displayedProgress) * 0.08;
    setUI(displayedProgress);

    const doneReal = loadedCount >= SEQUENCE.frameCount;
    const doneTime = (now - startTime) >= LOADER.minTime;

    if (doneReal && doneTime && Math.abs(1 - displayedProgress) < 0.01) {
      setUI(1);
      if (rafUi) cancelAnimationFrame(rafUi);
      onLoaded?.();
      return;
    }

    rafUi = requestAnimationFrame(tickUI);
  }

  function loadOne(i) {
    active++;
    const img = new Image();
    img.src = getFrameFile(i);
    images[i] = img;

    const done = () => {
      loadedCount++;
      active--;
      pump();
    };

    img.onload = done;
    img.onerror = done;
  }

  function pump() {
    while (active < MAX_CONCURRENT && nextIndex < SEQUENCE.frameCount) {
      loadOne(nextIndex++);
    }
  }

  tickUI();
  pump();
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  toggleOrientationNotice();

  const frameImg = document.querySelector(".sequence-frame");
  const scrollHint = document.querySelector(".scroll-hint");
  const loaderOverlay = document.querySelector(".loader-overlay");
  const infoBtnWrapper = document.querySelector(".info-btn-wrapper");
  const infoBoxImg = document.querySelector(".info-box");
  const infoText = document.querySelector(".info-text");
  const infoClose = document.querySelector(".info-close");
  const soundBtnWrapper = document.querySelector(".sound-btn-wrapper");
  const soundBtnImage = document.querySelector(".sound-btn");

  if (!frameImg) return;

  let scrollHintTL;
  let rafId = null;
  let currentFrame = -1;

  const soundRegions = SOUND_REGIONS.map(cfg => {
    const audio = new Audio(cfg.src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    return { ...cfg, audio };
  });

  const kickAudio = new Audio(KICK_SFX.src);
  kickAudio.preload = "auto";
  kickAudio.volume = 1;

  let soundEnabled = false;

  const ua = navigator.userAgent || navigator.vendor || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua));

  let audioUnlocked = !isIOS;

  function unlockAudioIfNeeded() {
    if (!isIOS || audioUnlocked) return;

    soundRegions.forEach(r => {
      const a = r.audio;
      a.muted = true;
      a.volume = 0;
      a.play()
        .then(() => {
          a.pause();
          a.currentTime = 0;
          a.muted = false;
        })
        .catch(() => { });
    });

    kickAudio.muted = true;
    kickAudio.volume = 0;
    kickAudio.play()
      .then(() => {
        kickAudio.pause();
        kickAudio.currentTime = 0;
        kickAudio.muted = false;
      })
      .catch(() => { });

    audioUnlocked = true;
  }

  function stopAllLoops() {
    soundRegions.forEach(r => {
      const a = r.audio;
      if (!a.paused) {
        a.volume = 0;
        a.pause();
        a.currentTime = 0;
      }
    });
  }

  preloadSequence(() => {
    loaderOverlay?.classList.add("hide");

    currentFrame = -1;
    renderFrame(0);

    ScrollTrigger.refresh(true);
  });

  if (scrollHint) {
    scrollHintTL = gsap.timeline({ repeat: -1, yoyo: true });
    scrollHintTL.to(scrollHint, { y: -10, duration: 0.9, ease: "sine.inOut" });
  }

  function hideScrollHint() {
    if (!scrollHint || scrollHint.dataset.hidden === "true") return;
    scrollHint.dataset.hidden = "true";
    scrollHintTL?.pause(0);
    gsap.to(scrollHint, { opacity: 0, duration: 0.25 });
  }

  const infoOpenClass = "visible";

  function closeInfo() {
    infoBoxImg?.classList.remove(infoOpenClass);
    infoText?.classList.remove(infoOpenClass);
    infoClose?.classList.remove(infoOpenClass);
  }

  function openInfo() {
    infoBoxImg?.classList.add(infoOpenClass);
    infoText?.classList.add(infoOpenClass);
    infoClose?.classList.add(infoOpenClass);
  }

  function toggleInfo() {
    const isOpen = infoBoxImg?.classList.contains(infoOpenClass);
    if (isOpen) closeInfo();
    else openInfo();
  }

  if (infoBtnWrapper) {
    infoBtnWrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleInfo();
    });
  }

  if (infoClose) {
    infoClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeInfo();
    });
  }

  document.addEventListener("click", (e) => {
    if (!infoBoxImg?.classList.contains(infoOpenClass)) return;

    const insideInfo =
      infoBtnWrapper?.contains(e.target) ||
      infoBoxImg?.contains(e.target) ||
      infoText?.contains(e.target) ||
      infoClose?.contains(e.target);

    if (!insideInfo) closeInfo();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeInfo();
  });

  ScrollTrigger.addEventListener("scrollStart", () => {
    closeInfo();
    hideScrollHint();
  });

  if (soundBtnWrapper && soundBtnImage) {
    soundBtnImage.src = "img/ton_aus.webp";

    soundBtnWrapper.addEventListener("click", () => {
      if (!soundEnabled) {
        unlockAudioIfNeeded();
        soundEnabled = true;
        soundBtnImage.src = "img/ton_an.webp";
      } else {
        soundEnabled = false;
        soundBtnImage.src = "img/ton_aus.webp";
        stopAllLoops();
      }
    });
  }

  function playKickIfTriggered(prev, now) {
    if (!soundEnabled || !audioUnlocked) return;

    for (const t of KICK_SFX.triggerFrames) {
      if (prev < t && now >= t) {
        kickAudio.currentTime = 0;
        kickAudio.play().catch(() => { });
        break;
      }
    }
  }

  function renderFrame(index) {
    if (index === currentFrame) return;

    const prevFrame = currentFrame;
    currentFrame = index;

    const img = window._preloadedImgs?.[index];
    if (img) frameImg.src = img.src;

    if (prevFrame >= 0) playKickIfTriggered(prevFrame, index);

    if (!soundEnabled) {
      stopAllLoops();
      return;
    }
    if (!audioUnlocked) return;

    soundRegions.forEach(region => {
      const { startFrame, endFrame, fadeInFrames, fadeOutFrames, maxVolume, audio } = region;
      const inRange = index >= startFrame && index <= endFrame;

      if (inRange) {
        if (audio.paused) audio.play().catch(() => { });

        let volume = maxVolume;

        if (fadeInFrames > 0 && index < startFrame + fadeInFrames) {
          const t = (index - startFrame) / fadeInFrames;
          volume = maxVolume * Math.max(0, Math.min(1, t));
        } else if (fadeOutFrames > 0 && index > endFrame - fadeOutFrames) {
          const t = (endFrame - index) / fadeOutFrames;
          volume = maxVolume * Math.max(0, Math.min(1, t));
        }

        audio.volume = volume;
      } else {
        if (!audio.paused) {
          audio.volume = 0;
          audio.pause();
          audio.currentTime = 0;
        }
      }
    });
  }

  function updateFrameOnScroll(self) {
    const idx = Math.round(self.progress * (SEQUENCE.frameCount - 1));
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => renderFrame(idx));
  }

  ScrollTrigger.create({
    trigger: ".intro",
    start: "top top",
    end: `+=${SEQUENCE.scrollLength}`,
    scrub: true,
    pin: ".intro-frame",
    anticipatePin: 1,
    onUpdate: updateFrameOnScroll
  });
});

window.addEventListener("resize", handleOrientationChange);
window.addEventListener("orientationchange", handleOrientationChange);
