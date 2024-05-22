/*
* Visualizing tool for the simple multiplication practice game
*
* by @ktorn
*
* reads stats from firebase persistence
*/

let database;
let multTable;

function setup() {
  createCanvas(800, 800);
  
  colorMode(HSB);
  
  multTable = new MultTable();
  
  initConfig();
  initFirebase();

}

function initTable() {
  
}


function draw() {
  
  renderConfig();
  
  multTable.render();
  
}

