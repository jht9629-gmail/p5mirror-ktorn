// carrousel
// coded by @ktorn
// 
// a reproduction of https://twitter.com/newrafael/status/1626389747688939521
// by @newrafael
//

const PAGE_COUNT = 6;
let pagesX = [];
let pageSpacing;
let startX;
let endX;

let insideMargin = 0.2;
let insideTopX;
let insideTopY;
let insideBottomX;
let insideBottomY;

let startColor = 270;
let endColor = 360;

function setup() {
  createCanvas(400, 400);
  
  colorMode(HSB);
  noStroke();
  
  insideTopX = width / 2;
  insideTopY = height * insideMargin;
  insideBottomX = width / 2;
  insideBottomY = height - insideTopY;
  
  print(insideTopY, insideBottomY);
  
  pageSpacing = width  / (PAGE_COUNT - 1);
  startX = -pageSpacing;
  endX = startX + (PAGE_COUNT + 2) * pageSpacing;
  
  let halfPages = floor((PAGE_COUNT + 2) / 2);
  
  for (let i = 0; i < (PAGE_COUNT + 2); i++) {
    pagesX.push(startX + (i * pageSpacing));
  }
  
  
}

function draw() {
  background(0);
  
  for(let i = pagesX.length - 1; i >= 0; i--) {
    pagesX[i]++;
    
    if (pagesX[i] > endX) {
      pagesX.splice(i, 1);
    }
  }
  
  if (pagesX.length < PAGE_COUNT + 2 && pagesX[0] >= startX + pageSpacing ) {
    pagesX.unshift(startX);
  }

  let i = 0;
  let x = pagesX[i];
  
  while (x < width / 2) {
    drawPage(x);
    i++;
    x = pagesX[i];
  }
  
  for (let k = pagesX.length - 1; k >= i; k--) {
    x = pagesX[k];
    drawPage(x);
  }
}

function drawPage(x) {
  
    let pageColor = map(x, 0, width, startColor, endColor, true);
  
    let pageSat;
    let pageBrit;
  
    if (x < width / 2) {
      pageSat = map(x, 0, width / 2, 100, 80, true);
    } else {
      pageSat = map(x, width / 2, width , 80, 100, true);
    }
  
  
    if (x < width / 2) {
      pageBrit = map(x, 0, width / 2, 100, 80, true);
    } else {
      pageBrit = map(x, width / 2, width, 80, 100, true);
    }
  
  
    fill(pageColor, pageSat, pageBrit);
    beginShape();
    vertex(x, 0);
    vertex(x, height);
    vertex(insideBottomX, insideBottomY);
    vertex(insideTopX, insideTopY);
    vertex(x, 0);
    endShape();
}