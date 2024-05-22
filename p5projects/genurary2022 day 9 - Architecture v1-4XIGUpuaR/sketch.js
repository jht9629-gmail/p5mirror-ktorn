/*
 *  Day 9: Architecture
 *  by @ktorn
 *  for #genuary2022
 *
 *  Click/touch canvas to generate a new one
 *  Press 'S' to save a screenshot
 */
const SPACE = 0.8;

const LEVEL_DRAFT1 = 1;
const LEVEL_DRAFT2 = 2;
const LEVEL_FINAL = 3;

const TOTAL_SHAPES = 5;
const MARGIN = 50;

let lineSpacing;
let cvn;
let sizeW;
let sizeH;

let shapes;

function setup() {
  if (windowWidth < windowHeight) {
    sizeW = windowWidth * SPACE;
    sizeH = sizeW / 1.618033988;
  } else {
    sizeH = windowHeight * SPACE;
    sizeW = sizeH * 1.618033988;
  }

  cvn = createCanvas(sizeW, sizeH);

  setAttributes("antialias", true);

  init();
}

function init() {
  shapes = [];

  for (let i = 0; i < TOTAL_SHAPES; i++) {
    addShape();
  }

  frameCount = 0;
}

function draw() {
  background(200);

  for(let lv = SKETCH_LEVELS-1; lv >= 0; lv--) {
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].renderLevel(lv);
    }
  }
  
}

function addShape() {
  let sw = random(10, 300);
  let sh = random(10, 300);
  let sx = random(MARGIN, sizeW - sw - MARGIN);
  let sy = random(MARGIN, sizeH - sh - MARGIN);

  let s = new SketchShape(SHAPE.RECT, sx, sy, sw, sh);

  shapes.push(s);
}

function mousePressed() {
  init();
}

function keyPressed() {
  if (keyCode == 83) {
    saveCanvas("genuary-day-9");
  }
}
