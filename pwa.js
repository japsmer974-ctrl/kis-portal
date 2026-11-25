// KIS - Progressive Web App Registration

if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker.register("./service-worker.js")

      .then((registration) => {
        console.log(
          "KIS service worker registered:",
          registration.scope
        );
      })

      .catch((error) => {
        console.error(
          "KIS service worker registration failed:",
          error
        );
      });

  });

}
