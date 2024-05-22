// Activate when publishing
p5.disableFriendlyErrors = false;

// **************************
// *       PARAMETERS       *
// **************************

// responsive canvas
const referenceSize = 700;
const hasMaxSize = true; // if true, then the canvas cannot be larger than the reference size
const isCentered = true; // if true the canvas will be vertically and horizontally centered

// show debug information like framerate
let isDebug = true;

// hide the source code button in the top-right
let isButtonHidden = false;

// **************************
// *    GLOBAL VARIABLES    *
// **************************

let t = 0;
let w;
let h;
var canvasSize;
let font;
let stars;
let pg;
let grain = [];
var canvas;

// **************************
// *        PRELOAD         *
// **************************

function preload() {
  font = loadFont("assets/fonts/JetBrainsMonoNL-Bold.ttf");
  // film grain source https://tinyurl.com/npew7zy3
  grain[0] = loadImage("assets/images/AU_FG_Texture-1.jpg");
  grain[1] = loadImage("assets/images/AU_FG_Texture-2.jpg");
  fadeOutLoadingScreen();
}

// **************************
// *          SETUP         *
// **************************

function setup() {
  console.log("started setup");
  frameRate(24);

  setDimensions();

  if (isCentered) {
    centerCanvas();
  }

  var p5Canvas = createCanvas(canvasSize, canvasSize);
  canvas = p5Canvas.canvas;

  stars = createGraphics(width, height);
  stars.background(0);
  pg = createGraphics(width, height);
}

// **************************
// *          DRAW          *
// **************************

function draw() {
  w = pg.width;
  h = pg.height;

  t = frameCount * 0.005;

  let anim = (sin(t * 2.5) + 1) * 0.5;

  let circleDiameter = w * 0.6;

  // stars
  let particleCount = map(anim, 0, 1, 20, 30);
  let s = w * 0.003;
  stars.push();
  stars.translate(w * 0.5, h * 0.5);
  for (let i = 0; i < particleCount; i++) {
    let a = random(TAU);
    let r = w * 0.6 * random();
    let x = cos(a) * r;
    let y = sin(a) * r;
    let c = get(x - w * 0.5, y - h * 0.5);
    let grey = map(c[0], 0, 50, 255, 0, true);
    let alpha = random(70, 255);
    stars.noStroke();
    stars.fill(grey, alpha);
    stars.circle(x, y, s); // particle
  }
  stars.pop();

  // draw black hole
  stars.push();
  stars.translate(w * 0.5, h * 0.5);
  stars.fill(0);
  stars.ellipse(0, 0, circleDiameter * 0.5, circleDiameter * 0.5);
  stars.pop();

  // flares
  pg.push();
  pg.noFill();
  pg.stroke(255);
  pg.translate(w * 0.5, h * 0.5);
  pg.rotate(QUARTER_PI);
  pg.rotate(HALF_PI);
  pg.fill(0);
  pg.strokeWeight(3);
  let dotCount = 360;
  let angleBetween = TAU / dotCount;
  for (let i = 0; i < dotCount; i++) {
    let angle = i * angleBetween;
    let r = circleDiameter * 0.25;
    let x = cos(angle) * r;
    let y = sin(angle) * r;
    let nx = x * 0.03;
    let ny = y * 0.03;
    let nz = t * 3;
    let n = noise(nx, ny, nz);
    pg.noStroke();
    pg.fill(n * n * 255);
    pg.circle(x, y, w * 0.01);
  }
  pg.pop();

  // random darkening frame
  if (random() > 0.5) {
    pg.fill(0, 10);
    pg.rect(0, 0, w, h);
  }

  // feedback loops
  applyFeedbackTo(stars, 0, -w * 0.002);
  applyFeedbackTo(pg, 1, w * 0.006);

  // draw the final result on screen
  
  
  // blendMode(BLEND);
  image(stars, 0, 0, width, height);
  // blendMode(ADD);
  // image(pg, 0, 0, width, height);

  // filmGrain(grain);

  if (isDebug) showFPS();
}

// **************************
// *       FEEDBACK         *
// **************************

function applyFeedbackTo(buffer, type, crop) {
  let cropAngle = t;
  let cropSize = crop;

  let feedbackImg;
  if (type === 1) {
    let cropRotationSpeed = 3;
    feedbackImg = buffer.get(
      cropSize + sin(cropAngle * cropRotationSpeed),
      cropSize + sin((cropAngle + PI) * cropRotationSpeed),
      buffer.width -
        (cropSize * 2 + sin((cropAngle + TWO_PI) * cropRotationSpeed)),
      buffer.height -
        (cropSize * 2 + sin((cropAngle + PI * 3) * cropRotationSpeed))
    );
  } else {
    feedbackImg = buffer.get(
      cropSize,
      cropSize,
      buffer.width - cropSize * 2,
      buffer.height - cropSize * 2
    );
  }

  buffer.background(255);
  buffer.image(feedbackImg, 0, 0, buffer.width, buffer.height);
}

// **************************
// *       FILM GRAIN       *
// **************************

function filmGrain(grain) {
  let grainIndex = frameCount % 2;
  let texture = grain[grainIndex];

  let w = texture.width;
  let h = texture.height;

  let ts = min(w, h) * 0.75;
  let sx = random(w - ts);
  let sy = random(h - ts);
  let sw = ts;
  let sh = ts;

  let dx = 0;
  let dy = 0;
  let dw = width;
  let dh = height;

  //blendMode(ADD);
  image(texture, dx, dy, dw, dh, sx, sy, sw, sh);
}

// **************************
// *        RESIZE          *
// **************************

function windowResized() {
  setDimensions();
  resizeCanvas(canvasSize, canvasSize);
  pg = resizeGraphics(pg);
  stars = resizeGraphics(stars);
}