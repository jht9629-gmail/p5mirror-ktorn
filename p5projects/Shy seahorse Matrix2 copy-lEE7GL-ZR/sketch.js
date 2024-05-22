// Original: https://editor.p5js.org/Shynif/sketches/pLj4a9KrL

let marg, TV, GS, pg, capture,SL,CR,NO,ps;
let animation = 1;
let jump = 0; // Animation 1
let t=0;
let CRpos=[]; // Cracks'  position
let Spos =[]; // Screens' position
let tt=60;

function preload() {
  TV = loadImage('OldTv.png');
  GS = loadImage('InsideGreenScreen.png'); // Green Screen but rgb(221,123,129)
  SL = loadImage('scanlines3.png'); // Scan Lines
  CR = loadImage('crack.png');      // Crack png
  NO = loadImage('https://c.tenor.com/g6SE3mueJt0AAAAC/static-noise.gif');      // Noise GIF
}

function setup() {
  createCanvas(800, 800);
  marg = height/5; // Margin
  jump = (height-marg*2)/5;
  pg = createGraphics(height,height,P2D);
  pg.noStroke();
  capture = createCapture(VIDEO);
  capture.size(height,height);
  for (let i=0; i<12;i++){
    CRpos.push([random(marg,height-marg),random(marg,height-marg)]);
  }
}

function draw() {
  
  switch(animation) {
    case 1:
      if (!t) { // Initialisation
        background(255);
        for (let x=marg;x<height-marg;x+=jump) {
          for (let y=marg;y<height-marg;y+=jump) {
            const rX = random(30);
            image(TV,x-20+rX,y,jump+20,jump+20);
            image(GS,x-30+rX,y-0.5,jump+20,jump+20);
            if (rX<20) Spos.push([x+rX,y]);
          }
        }
        // get all the pixels that aren't "green" screen
        loadPixels();
        pg.loadPixels();
        for (let x=0;x<height;x++) {
          for (let y=0;y<height;y++) {
            const i=(x+y*width)*4;
            if (pixels[i]!=221) {
              pg.set(x,y,[pixels[i],pixels[i+1],pixels[i+2],255]);
            }
          }
        }
        pg.updatePixels();
        updatePixels();
      }
      
      image(capture,marg,marg,height-marg*2,height-marg*2);
      filter(POSTERIZE,5);
      
      for (let pos of CRpos) {
        image(CR,pos[0],pos[1],jump/1.5,jump/1.5);
      }
      image(SL,0,0);
      
      if(t%tt==0) {
        ps=random(Spos);
        tt=round(random(30,200));
        if (random()<0.3) ps=[0,0]; // Out of the TVs
      }
      image(NO,ps[0]-10,ps[1],jump-10,jump);
      
      image(pg,0,0); // Front screens
    break;
  }
  
  
  //noLoop();
  t++;
}