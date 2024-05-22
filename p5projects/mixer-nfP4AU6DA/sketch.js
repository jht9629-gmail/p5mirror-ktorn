let img;
let w;
let h;

let mixSize = 10;
let mixAmount = 2;

let currentImg;

let hist = [];

const STEP_V = 1;
const STEP_H = 2;


let mixing = true;

class CopyHist {
  
  constructor(srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.dstX = dstX;
    this.dstY = dstY;
    this.dstW = dstW;
    this.dstH = dstH;
  }
}

function preload() {
  img = loadImage("assets/portrait.png");
}

function setup() {
  pixelDensity(1);
  w = img.width;
  h = img.height;
  
  createCanvas(w, h);
  
  currentImg = img;
  
  image(currentImg, 0, 0);
}


function vMix(src) {

  let imgOut = createImage(src.width, src.height);
  
  let sliceW = mixSize;
  
  
  srcW = sliceW;
  srcH = src.height;
  
  dstW = sliceW;
  dstH = src.height;
  
  
  for(let i = 0; i < src.width; i += sliceW) {
    
    if(i + srcW > src.width) {
      srcW -= (i + sliceW) - src.width;
      dstW -= (i + sliceW) - src.width;
    }
    
    let move = int(random(-mixAmount, mixAmount));
    
    let copyHist = new CopyHist(i, 0, srcW, srcH, i, move, dstW, dstH);
    
    hist.push(copyHist);
    doCopy(src, imgOut, copyHist);
  }
  
  return imgOut;
}


function hMix(src) {

  let imgOut = createImage(src.width, src.height);
  
  let sliceH = mixSize;
  
  
  srcW = src.width;
  srcH = sliceH;
  
  dstW = src.width;
  dstH = sliceH;
  
  
  for(let i = 0; i < src.height; i += sliceH) {
    
    if(i + srcH > src.height) {
      srcH -= (i + sliceH) - src.height;
      dstH -= (i + sliceH) - src.height;
    }
    
    let move = int(random(-mixAmount, mixAmount));
    
    let copyHist = new CopyHist(0, i, srcW, srcH, move, i, dstW, dstH);
    
    hist.push(copyHist);
    doCopy(src, imgOut, copyHist);
  }
  
  return imgOut;
}



function doCopy(src, dst, data) {
  dst.copy(src, data.srcX, data.srcY, data.srcW, data.srcH, data.dstX, data.dstY, data.dstW, data.dstH);
  
  let yOverflowUp = getYOverflowUp(src, dst, data);
  let yOverflowDown = getYOverflowDown(src, dst, data);
  
  
  let xOverflowLeft = getXOverflowLeft(src, dst, data);
  let xOverflowRight = getXOverflowRight(src, dst, data);
  
  if(yOverflowUp > 0) {
    dst.copy(src, data.srcX, data.srcY, data.srcW, yOverflowUp, data.dstX, dst.height - yOverflowUp, data.dstW, yOverflowUp);
  }
  
  if(yOverflowDown > 0) {
    dst.copy(src, data.srcX, src.height - yOverflowDown, data.srcW, yOverflowDown, data.dstX, 0, data.dstW, yOverflowDown)
  }
  
  if(xOverflowLeft > 0) {
   dst.copy(src, 0, data.dstY, xOverflowLeft, data.dstH, src.width - xOverflowLeft, data.srcY, xOverflowLeft, data.srcH);
  }

  if(xOverflowRight > 0) {
     dst.copy(src, dst.width - xOverflowRight, data.dstY, xOverflowRight, data.dstH, data.srcX, data.srcY, xOverflowRight, data.srcH);
  }

  
}

function undoCopy(src, data) {
  
  let buffer = createImage(data.dstW, data.dstH);
  
  buffer.copy(src, data.dstX, data.dstY, data.dstW, data.dstH, 0, 0, data.dstW, data.dstH);
  
  // dst.copy(src, 0, 0, src.width, src.height, 0, 0, dst.width, dst.height);
    
  // dst.copy(src, data.dstX, data.dstY, data.dstW, data.dstH, data.srcX, data.srcY, data.srcW, data.srcH);
  
  src.copy(src, data.dstX, data.dstY, data.dstW, data.dstH, data.srcX, data.srcY, data.srcW, data.srcH);
  
  let yOverflowUp = getYOverflowUp(src, src, data);
  let yOverflowDown = getYOverflowDown(src, src, data);
  
  let xOverflowLeft = getXOverflowLeft(src, src, data);
  let xOverflowRight = getXOverflowRight(src, src, data);

  
  if(yOverflowUp > 0) {
   src.copy(src, 0, buffer.height - yOverflowUp, data.dstW, yOverflowUp, data.srcX, data.srcY, data.srcW, yOverflowUp);
  }
  
    if(yOverflowDown > 0) {
    src.copy(src, 0, 0, data.dstW, yOverflowDown, 0, src.height - yOverflowDown, data.srcW, yOverflowDown)
  }
  
  if(xOverflowLeft > 0) {
   src.copy(src, src.width - xOverflowLeft, 0, xOverflowLeft, data.srcH, 0, data.dstY, xOverflowLeft, data.dstH);
  }

  if(xOverflowRight > 0) {
     src.copy(src, data.srcX, 0, xOverflowRight, data.srcH, src.width - xOverflowRight, data.dstY, xOverflowRight, data.dstH);
  }

  
}


function getYOverflowUp(src, dst, data) {
  return data.dstY < 0 ? - data.dstY : 0;
}

function getYOverflowDown(src, dst, data) {
  let yBottom = data.dstY + data.dstH;
  return dst.height - yBottom < 0 ? -(dst.height - yBottom) : 0;
}


function getXOverflowLeft(src, dst, data) {
  return data.dstX < 0 ? - data.dstX : 0;
}

function getXOverflowRight(src, dst, data) {
  let xRight = (data.dstX + data.dstW);
  return dst.width - xRight < 0 ? - (dst.width - xRight) : 0;
}


function processNextImage() {
  
  if(mixing) {
    let nextImg = vMix(currentImg);
    nextImg = hMix(nextImg);

    currentImg = nextImg;
  } else {
    if (hist.length > 0) {
      for(let i = 0; i < 100; i++) {
        if(hist.length > 0) {
          let data = hist.pop();
          let nextImg = createImage(currentImg.width, currentImg.height);
          undoCopy(currentImg, data);
          // currentImg = nextImg;
        }
      }
    }
  }
}

function draw() {
  background(0);
  
  processNextImage();
  
  image(currentImg, 0, 0);
}


function mousePressed() {
    
   mixing = !mixing;
}