/*
* Simple multiplication practice game
* for primary students
*
* by @ktorn
*/

const A_MAX = 10;
const B_MAX = 10;

let max = 0;

let rows = [];

let p;
let inputBox;

let m;

function setup() {
  noCanvas();
  m = new Mult();
  rows.push(m);
}


function draw() {
  for(let i = 0; i < rows.length; i++) {
    rows[i].render();
  }
  
  if (rows[rows.length-1].isAnswered) {
      m = new Mult();
      rows.push(m);
  }
}