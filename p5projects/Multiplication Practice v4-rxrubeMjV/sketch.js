/*
* Simple multiplication practice game
* for primary students
*
* by @ktorn
*
* v3
*/

let database;

const STATE = {
  START: 0,
  ROUND: 1,
  END: 2
}

const SIZE = 12;

const A_MAX = SIZE;
const B_MAX = SIZE;

let max = 0;

let rows = [];

let p;
let inputBox;
let multTable;

let m;

let state = STATE.START;

let start_div;
let start_button;

let roundDiv;
let roundStartTime = 0;
let roundGuess = 0;
let roundGuessMult;
let roundMMs = [];

let roundMultDivs;

var w = window.innerWidth;
var h = window.innerHeight;

let soundCorrect;
let soindWrong;

let isShakingDiv = false;
let shakingDiv;
let shakingCount;

function preload() {
  soundCorrect = loadSound("/assets/chime-correct.mp3");
  soundWrong = loadSound("/assets/chime-wrong.mp3");
}

function setup() {
  noCanvas();
  
  let cookies = document.cookie;
  print("cookies", cookies);
  
  colorMode(HSB);
  
  multTable = new MultTable();
  initConfig();
  initFirebase(); 
  
  m = getNextMult();
  rows.push(m);
}


function draw() {
  
  renderConfig();
  
  switch(state) {
      
    case STATE.START:
      renderStart();
      break;
      
    case STATE.ROUND:
      renderRound();  
      break;
      
    case STATE.END:
      renderEnd();
      break;
  }
  
  if(isShakingDiv && frameCount % 3 === 0) {
    doShakeDiv();
  }

}

function doShakeDiv() {
  let sp = shakingDiv.position();
  
  if (shakingCount % 2 === 0) {
    shakingDiv.position(sp.x + 10, sp.y);
  } else {
    shakingDiv.position(sp.x - 10, sp.y);
  }
  
  shakingCount--;
  
  if(shakingCount <= 0) {
    isShakingDiv = false;
    shakingDiv = undefined;
  }
}

function shakeDiv(div) {
  isShakingDiv = true;
  shakingDiv = div;
  shakingCount = 4;
}


function renderStart() {
    
  if(!start_button) {
    start_button = createButton("Start Round");
    start_button.style("font-size", "20px");
    start_button.style("background-color: green; color: white; border-radius: 8px; text-decoration: none;");
    start_button.size(200, 100);
    start_button.mousePressed(startRound);
    // start_button.parent(start_div);
    start_button.hide();
  }
  
  if(state == STATE.START) {
    start_button.show();
    start_button.position(w/2 - 200/2, h/2 - 100/2);
  } else {
    start_button.hide();
  }
  
}


function renderRound() {

  if(!roundMultDivs) {
    roundMultDivs = [];
    
    let xOffset = 50;
    let yOffset = 50;

    let multWidth = (w - 100 - 5*20) / 5;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 5; j++) {
        let div = createDiv();
        div.size(multWidth, 50);
        div.style('background-color', '#CDCDCD');
        div.style('text-align: center; top: 50%; left: 1%; right: 1%')
        div.position(xOffset + j * multWidth + j * 20,  yOffset + i * 50 + i * 20);
        roundMultDivs.push(div);
      }
    }
    
    roundGuess = 1;
    roundGuessMult = getNextMult();
  }
  
  if(!roundDiv) {
    let dW = 200;
    let dH = 75;
    roundDiv = createDiv();
    roundDiv.style('text-align: center; top: 50%; left: 1%; right: 1%')
    roundDiv.size(dW, dH);
    roundDiv.position(w/2 - dW/2, h/2 - dH/2)
    roundDiv.style('background-color', '#cfd8e8');
  }
  
  if (roundGuess <= 10) {
    roundGuessMult.render(roundDiv);
    // roundGuessMult.i.elt.focus();
  } else {
    state = STATE.END;
  }
  
}

function renderEnd() {
  roundDiv.hide();
  state = STATE.START;
}

function handleCorrectAnswer() { 
  roundGuessMult.relocateParent(roundMultDivs[roundGuess-1]);
  roundGuessMult = getNextMult();
  roundGuess++;
}


function getNextMult() {
  
  let focus = [];
  
  let mm;
  let mult;
  let pick;
  let done = false;
  
  while(!done) {
    
    // biased die (parabolic random pick)
    let itemTotal = multTable.sortedElements.length/5;
    pick = random(0, itemTotal);
    pick = floor(Math.pow(pick, 2) / itemTotal);
    
    mm = multTable.sortedElements[pick];

    
    if( !(roundMMs.includes(mm.toString())) && ( !focus || focus.length == 0 || focus.includes(mm.a) || focus.includes(mm.b))) {
      done = true;
    }  
  }
  
  // we don't want to repeat same, or inverse mult on same round
  roundMMs.push(mm.toString());
  roundMMs.push((new Mult(mm.b, mm.a)).toString());
  
  print(roundMMs);
  
   print("picking #", pick, mm.toString(), "priority", mm.getPriority(),  "from ", multTable.sortedElements.length);
  
  print(multTable.sortedElements);
  
  mult = new Mult(mm.a, mm.b);
  
  return mult;
}

window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight; 
}

function startRound() {
  start_button.hide();
  state = STATE.ROUND;
  roundStartTime = millis();
  roundMultDivs = undefined;
  if(roundDiv) {
    roundDiv.show();
  }
}


