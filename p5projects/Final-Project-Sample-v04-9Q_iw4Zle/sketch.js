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

function setup() {
  createCanvas(600, 600);
  hSlices = 8;
  vSlices = hSlices;
  hGap = width / hSlices;
  vGap = height / vSlices;
  size = hGap * 0.9;
  
  for(let k=0; k <= hSlices * vSlices; k++){
    let smallWorld = new Small(hGap, vGap);
    smallWorld.render();
    smallWorlds.push(smallWorld);
  }
  
  background(220);
  let idx = 0;
  smooth();
  for(let i=0; i< height; i+= vGap){
    for (let j=0; j< width; j+= hGap){
      image(smallWorlds[idx].canv, i, j, hGap, vGap);    
      idx++;
    }
  }
  
  noLoop();
}