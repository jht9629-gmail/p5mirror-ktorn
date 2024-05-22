/**
 * NOTE:
 * Please read the README.md file provided in this template.
 */

// If you want to create OBJKT's with different seeds, you can access the creator and viewer wallet ids. This values will only be injected once the piece has been minted
// they will not work locally.
// if the user is not sync, the viewer comes in as false
const creator = new URLSearchParams(window.location.search).get("creator");
const viewer = new URLSearchParams(window.location.search).get("viewer");

console.log("NFT created by", creator);
console.log("NFT viewed by", viewer);

// Dont forget to add your own resize handler. hicetnunc expects to get content in the whole width and heght
// const resize = () => {
//     console.log('resize')
// }
// window.addEventListener('resize', resize);

function toggleCode() {
  let viewer = document.getElementById("code-container");
  let button = document.querySelector("button");

  if (viewer.classList.contains("show")) {
    viewer.classList.replace("show", "hide");
    button.firstChild.data = "<>";
  } else {
    viewer.classList.replace("hide", "show");
    button.firstChild.data = "><";
  }
}

// the keyboardNav class is used to show
// accessibility highlights only if tabbing is detected
function detectKeyboardUser(e) {
  if (e.keyCode === 9) {
    document.body.classList.add("keyboardNav");
    window.removeEventListener("keydown", detectKeyboardUser);
  }
}
window.addEventListener("keydown", detectKeyboardUser);
