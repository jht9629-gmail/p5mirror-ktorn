function fadeOutLoadingScreen() {
  // grab the loader element from the DOM
  let loadingScreen = document.getElementById("loading-screen");

  // fade out the loader
  loadingScreen.classList.add("fade-out");

  // optional: remove loader from DOM via event listener
  loadingScreen.addEventListener("transitionend", () => {
    const element = event.target;
    element.remove();
  });
}
