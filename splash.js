// KIS - Official Logo Splash Screen

(function () {

  const splash = document.getElementById("kis-splash-screen");

  if (!splash) {
    console.error("KIS splash screen was not found.");
    return;
  }

  function startKISSplash() {

    // Phase 1: Show the official school emblem immediately.
    splash.classList.add("show-identity");

    // Phase 2: Transition to the school motto and loading bar.
    setTimeout(() => {
      splash.classList.remove("show-identity");
      splash.classList.add("show-loading");
    }, 2800);

    // Phase 3: Reveal the homepage after the loading animation.
    setTimeout(() => {
      splash.classList.add("hide-splash");
    }, 6400);

    // Remove the splash screen after fading.
    setTimeout(() => {
      splash.remove();
    }, 7500);

  }

  if (document.readyState === "complete") {
    startKISSplash();
  } else {
    window.addEventListener("load", startKISSplash, { once: true });
  }

})();
