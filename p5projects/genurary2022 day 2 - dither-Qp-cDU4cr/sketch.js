let img;

function preload() {
  img = loadImage("assets/10000-chords.png");
}

function setup() {
  createCanvas(img.width, img.height);
  dither(img);
}

function draw() {
  background(220);
  
  image(img, 0, 0);
}

function dither(image) {
  img.loadPixels();
  
  let r;
  
  for(let i = 0; i < img.pixels.length; i += 4) {
    if (img.pixels[i] > 0) {
      r = random(1, 255);
      if (img.pixels[i] < r) {
        img.pixels[i] = 0;
        img.pixels[i+1] = 0;
        img.pixels[i+2] = 0;
      } else {
        img.pixels[i] = 255;
        img.pixels[i+1] = 255;
        img.pixels[i+2] = 255;
      }
      img.updatePixels();
    }
  }
}

function keyPressed() {
  saveCanvas('genuary-dither');
}