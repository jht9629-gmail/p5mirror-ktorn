/*
 *  Inspired by @mandybrigwell OBJKT https://hicetnunc.art/objkt/572269
 *  
 *  p5js code by @gestadieu and @ktorn
 *
 *  Live coding during session #10 of ADAT103_CM
 *  Mathematics and Computing module - University of Saint Joseph
 */

let hSlices;
let vSlices;
let hGap;
let vGap;
let size;
let angle;
let small;
let smallWorlds = [];
let angleMotion;
let angleRecorded;
let totalFrames;
let frames;
let frameIdx;

let isInit;
let isSmallWorldsInit;

function setup() {
  createCanvas(600, 600);
  hSlices = 8;
  vSlices = hSlices;
  hGap = width / hSlices;
  vGap = height / vSlices;
  size = hGap * 0.9;
  angleMotion = 1;
  angleRecorded = 0;

  totalFrames = floor(360 / angleMotion);
  isSmallWorldsInit = false;
  frames = [];
  isInit = false;

  frameIdx = 0;
}

function initFrames() {
  
  if (!isSmallWorldsInit) {
    for (let k = 0; k <= hSlices * vSlices; k++) {
      let smallWorld = new Small(hGap, vGap);
      smallWorlds.push(smallWorld);
    }
    isSmallWorldsInit = true;
  }

  let frame;

  // print loading progress bar
  background(0);
  noStroke();
  fill(255);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(
    "Generating frames..." + frameIdx + "/" + totalFrames,
    width / 2,
    height / 2
  );

  frame = createGraphics(width, height);
  frame.background(220);

  let idx = 0;
  for (let i = 0; i < height; i += vGap) {
    for (let j = 0; j < width; j += hGap) {
      smallWorlds[idx].rotate(angleMotion);
      smallWorlds[idx].render();
      frame.image(smallWorlds[idx].canv, i, j, hGap, vGap);
      idx++;
    }
  }

  frames.push(frame);
  frameIdx++;

  if (frameIdx == totalFrames - 1) {
    isInit = true;
  }
}

function draw() {

  if (!isInit) {
    initFrames();
  } else {
    background(220);

    if (frameIdx > frames.length - 1) {
      frameIdx = 0;
    }

    image(frames[frameIdx], 0, 0);

    frameIdx++;
  }
}
