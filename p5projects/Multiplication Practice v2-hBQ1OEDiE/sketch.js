/*
* Simple multiplication practice game
* for primary students
*
* by @ktorn
*
* v2 - introduces firebase persistence
* currently old version. code based on: https://editor.p5js.org/jenagosta/sketches/BJ69ITTxz
*/

let database;

const A_MAX = 10;
const B_MAX = 10;

let max = 0;

let rows = [];

let p;
let inputBox;

let m;

function setup() {
  noCanvas();
  initConfig();
  initFirebase();  
  m = new Mult();
  rows.push(m);
}


function draw() {
  
  renderConfig();
  
  for(let i = 0; i < rows.length; i++) {
    rows[i].render();
  }
  
  if (rows[rows.length-1].isAnswered) {
      m = new Mult();
      rows.push(m);
  }
}


function showDBAuth() {
  
}
