/*
*  #genuary29 - Maximalism : a collab by generativelight and ktorn
*  #genuaryTogether, #genuary, #genuary29
*
* https://twitter.com/generativelight
* https://twitter.com/ktorn
*
* you can scroll and pan with the mouse
* press 's' to save as image
*/

let g;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 360, 100, 100, 100);
  pixelDensity(5);
  g = createGraphics(width, height);
  renderPiece();
  noSmooth();
  
  canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e))
}

function renderPiece() {
  
  g.colorMode(HSL, 360, 100, 100, 100);
  
  g.background("white");
  
  g.strokeWeight(0.2);
  g.noSmooth();

  //frame around canvas
  let frame = 25;
  
  //size of high level cells
  let spacing = 25;

  for (let x = frame; x <= width - frame - spacing; x += spacing) {
    for (let y = frame; y <= height - frame - spacing; y += spacing) {

      //space between subcells
      let frame2 = 5;
      //size of subcells
      let spacing2 = random(1, 10);

      for (let xx = x + frame2; xx <= x + spacing - frame2; xx += spacing2) {
        for (let yy = y + frame2; yy <= y + spacing - frame2; yy += spacing2) {

          //size of individual rects
          rectmorphlow = 0.5;
          rectmorphhigh = 1.5;

          g.fill(
            random([
              "#0e0e0e",
              "#f3bc17",
              "#d54b0c",
              "#154255",
              "#dcdcdc",
              "#c0504f",
              "#68b9b0",
              "#ecbe2c",
              "#2763ab",
              "#ce4241",
            ])
          );

          g.rect(
            xx,
            yy,
            spacing2 * random(rectmorphlow, rectmorphhigh),
            spacing2 * random(rectmorphlow, rectmorphhigh)
          );
          
        }
      }
    }
  }
}

function draw() {
  
  background("white");
  
  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom)
  
  image(g, 0, 0);

}

function keyPressed() {
  if (key == "s") {	
    saveCanvas("outputSave", "png");
  }
}
