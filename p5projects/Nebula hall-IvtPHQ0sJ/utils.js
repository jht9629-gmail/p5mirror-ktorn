function showFPS() {
  let w = 110;
  let h = 20;
  let fps = frameRate();
  let x = w / 2;
  let y = height;
  rectMode(CENTER);
  fill(255);
  textSize(16);
  textFont(font);
  fill("black");
  noStroke();
  rect(x + 5, y - (h / 2 + 5), w, h);
  strokeWeight(20);
  fill("white");
  text("FPS: " + fps.toFixed(2), x - w / 2 + 10, y - 10);
}

function toggleButtonVisible(isButtonHidden) {
  let button = document.querySelector("button");
  if (isButtonHidden) {
    button.style.display = "none";
  } else {
    button.style.display = "block";
  }
}

function setDimensions() {
  // This is how we constrain the canvas to the smallest dimension of the window
  canvasSize = min(windowWidth, windowHeight);
  if (hasMaxSize) {
    canvasSize = min(referenceSize, canvasSize);
  }
  // windowScale goes from 0.0 to 1.0 as canvasSize goes from 0.0 to referenceSize
  // if hasMaxSize is set to true, it will be clamped to 1.0 otherwise it keeps growing over 1.0
  windowScale = map(canvasSize, 0, referenceSize, 0, 1, hasMaxSize);
}

function centerCanvas() {
  var s = document.body.style;
  s.display = "flex";
  s.overflow = "hidden";
  s.height = "100vh";
  s.alignItems = "center";
  s.justifyContent = "center";
}

function distSquared(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return dx * dx + dy * dy;
}

function resizeGraphics(pg) {
  let newPG = createGraphics(pg.width, pg.height);
  pg.canvas.remove();
  newPG.image(pg, 0, 0, newPG.width, newPG.height);
  return newPG;
}

// **************************
// *         INPUT          *
// **************************

// http://keycode.info/

function keyPressed() {
  if (mouseIsPressed) {
    if (keyCode === 68) {
      if (!isDebug) {
        isDebug = true;
        console.log("debug mode ON");
      } else {
        isDebug = false;
        console.log("debug mode OFF");
      }
    }
    if (keyCode === 66) {
      if (!isButtonHidden) {
        isButtonHidden = true;
        toggleButtonVisible(isButtonHidden);
        console.log("hiding the button");
      } else {
        isButtonHidden = false;
        toggleButtonVisible(isButtonHidden);
        console.log("showing the button");
      }
    }
    if (keyCode === 83) {
      saveCanvas();
    }
  }
}
