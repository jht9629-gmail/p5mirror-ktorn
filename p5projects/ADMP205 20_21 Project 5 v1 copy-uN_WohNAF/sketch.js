let gameStart;
let mainGuy;
let bgImg;
let fog;
let sbState;
let sbSelX;
let sbSelY;
let wallsGroup;
let wallCounter;
let walls;
let bug;


function preload() {
  bgImg = loadImage("assets/background.png");
  fog = loadImage("assets/Foreground_1.png");
  bug = loadImage("assets/bug2.png");
  
}

function setup() {
  gameStart = 0;
  createCanvas(400,400);
  walls = [];
  sbState = 0;
  wallCounter = 0;
  wallsGroup = new Group();
  mainGuy = new MainGuy(250, 250);
  // mainGuy.sprite.debug = true;
  createWalls();
  mainGuy.sprite.addImage(bug)
  mainGuy.sprite.scale = 0.6
  
  // mainGuy.sprite.setCollider("rectangle",0,0,bug.width,bug.height);
  // console.log("bug: "+ bug.width + " x " + bug.height);
}


function draw() {

  clear();
  if (gameStart == 0) {
    createCanvas(400,400);
    let s = 'PRESS ENTER TO BEGIN THE MAZE';
    text (mouseX,10,10)
    text(mouseY,10,30)
    rect(172, 173, 130, 100)
    fill(0);
    textSize(14);
    textFont('Impact');
    text(s, width / 2 , height / 2, 80);
  }

  if (gameStart == 1) {
  image(bgImg, 0, 0);
  mainGuy.sprite.collide(wallsGroup);
  drawSprites();
  
  mainGuy.sprite.velocity.x = (mouseX - mainGuy.sprite.position.x) / 20;
  mainGuy.sprite.velocity.y = (mouseY - mainGuy.sprite.position.y) / 20;
  mainGuy.sprite.velocity.x = (camera.mouseX - mainGuy.sprite.position.x) / 20;
  mainGuy.sprite.velocity.y = (camera.mouseY - mainGuy.sprite.position.y) / 20;
  
  
   camera.position.x = mainGuy.sprite.position.x;
   camera.position.y = mainGuy.sprite.position.y;

  
 if (sbState == 1) {
    fill(255, 255, 255);
    let w = mouseX - sbSelX;
    let h = mouseY - sbSelY;
    rect(sbSelX, sbSelY, w, h);
  }

   camera.off();
   image(fog, 0, 0);
  
}
}


function keyPressed(){
  if (keyCode == ENTER)
    gameStart = 1;
}

function mousePressed() {

  if (sbState == 0) {
    sbState = 1;
    sbSelX = mouseX;
    sbSelY = mouseY;

  } else if (sbState == 1) {
    sbState = 0;

    let w = mouseX - sbSelX;
    let h = mouseY - sbSelY;
    let x = sbSelX + w / 2;
    let y = sbSelY + h / 2;

    let s = createSprite(x, y, w, h);

    s.immovable = true;
    s.debug = true;

    wallsGroup.add(s);

    console.log("walls[" + wallCounter + "] = [" + x + "," + y + "," + w + "," + h + "];");

    wallCounter++;

  }

}


function createWalls() {
 walls[0] = [144,316.5,14,113]; 
walls[1] = [215.5,269,129,16]; 
walls[2] = [272.5,284.5,15,47]; 
walls[3] = [256,300.5,46,19]; 
walls[4] = [240.5,346.5,17,111]; 
walls[5] = [256.5,237,239,20]; 
walls[6] = [367.5,189,-17,-114]; 
walls[7] = [351.5,141.5,111,19]; 
walls[8] = [321,172.5,48,19]; 
walls[9] = [336.5,193.5,15,35]; 
walls[10] = [303,201.5,-80,-19]; 
walls[11] = [271.5,146,17,-92]; 
walls[12] = [341.5,108,123,16]; 
walls[13] = [217.5,139,99,18]; 
walls[14] = [176,120.5,18,45]; 
walls[15] = [206,105.5,-80,-15]; 
walls[16] = [238,74,-16,-78]; 
walls[17] = [208.5,34,21,34]; 
walls[18] = [223,44,-46,16]; 
walls[19] = [177.5,59.5,17,49]; 
walls[20] = [174.5,75,-79,-16]; 
walls[21] = [143.5,122,19,114]; 
walls[22] = [240.5,196,15,-62]; 
walls[23] = [198.5,172.5,97,17]; 
walls[24] = [192.5,204.5,49,17]; 
walls[25] = [175,213,16,36]; 
walls[26] = [128,203.5,48,19]; 
walls[27] = [112.5,220.5,15,175]; 
walls[28] = [122,140,34,20]; 
walls[29] = [92,236.5,40,19]; 
walls[30] = [62.5,267.5,-47,-17]; 
walls[31] = [64,332.5,48,17]; 
walls[32] = [78,315.5,-18,-47]; 
walls[33] = [71,299.5,96,19]; 
walls[34] = [176,292.5,16,31]; 
walls[35] = [208,316,18,50]; 
walls[36] = [159.5,332,-113,-18]; 
walls[37] = [46.5,211.5,-15,-95]; 
walls[38] = [71.5,203,33,-16]; 
walls[39] = [62.5,171.5,-47,-17]; 
walls[40] = [78.5,140,-17,-80]; 
walls[41] = [80,109,80,20]; 
walls[42] = [111.5,67.5,-17,-103]; 
walls[43] = [132,43,-38,-14]; 
walls[44] = [80.5,59.5,17,49]; 
walls[45] = [54.5,75.5,-69,-17]; 
walls[46] = [48.5,33,17,-34]; 
walls[47] = [39.5,140.5,35,19]; 
walls[48] = [71.5,363.5,97,17]; 
walls[49] = [80,387,18,30]; 
walls[50] = [48.5,395.5,15,15]; 
walls[51] = [208,395.5,14,13]; 
walls[52] = [136.5,394.5,95,15]; 
walls[53] = [174.5,380,17,50]; 
walls[54] = [204,364.5,74,19]; 
walls[55] = [261.5,394.5,33,15]; 
walls[56] = [270.5,378,-15,-46]; 
walls[57] = [288,363.5,50,17]; 
walls[58] = [320.5,396.5,47,19]; 
walls[59] = [334,361.5,-14,-79]; 
walls[60] = [303.5,333,79,18]; 
walls[61] = [304,296.5,18,73]; 
walls[62] = [327.5,269.5,35,19]; 
walls[63] = [334,287.5,-18,-41]; 
walls[64] = [271,49.5,18,67]; 
walls[65] = [319,76.5,-50,-17]; 
walls[66] = [303,51,18,-34]; 
walls[67] = [359.5,43,95,18]; 
walls[68] = [368,77,18,54]; 
walls[69] = [397,74,12,-14]; 
walls[70] = [403,286,20,238]; 
walls[71] = [367.5,328.5,17,167]; 
walls[72] = [11.5,199.5,-23,-399]; 
walls[73] = [200,10,400,20];
walls[74] = [239,202.5,18,49]; 

  for (let i = 0; i < walls.length; i++) {

    let wall = walls[i];

    let s = createSprite(wall[0], wall[1], wall[2], wall[3]);

    s.visible = false;

    s.immovable = true;
    s.debug = true;

    wallsGroup.add(s);

  }

}
