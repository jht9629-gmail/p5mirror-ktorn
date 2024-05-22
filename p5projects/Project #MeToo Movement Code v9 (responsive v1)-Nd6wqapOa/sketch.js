let bgImg;
let groupImg;

let fontTitle;
let font;

// variables for loading images
let hand1Img;
let hand2Img;
let hand3Img;
let hand4Img;
let hand5Img;
let hand6Img;
let hand7Img;
let hand8Img;
let hand9Img;
let hand10Img;

let mainText = "Women's Stories, Experiences & Messages from the Movement \n (click a hand to read a message)";

// variables for the actual Hand objects
// let hand1;
// let hand2;
// let hand3;
// let hand4;
// let hand5;
// let hand6;
// let hand7;
// let hand8;
// let hand9;
// let hand10;

let hands;


  let Y_AXIS = 1;
  let X_AXIS = 2;

function preload() {
  bgImg = loadImage("assets/thirdbg.jpg");

  // load all the images

  hand1Img = loadImage("assets/hand1-cropped.png");
  hand2Img = loadImage("assets/hand2-cropped.png");
  hand3Img = loadImage("assets/hand3-cropped.png");
  hand4Img = loadImage("assets/hand4-cropped.png");
  hand5Img = loadImage("assets/hand5-cropped.png");
  hand6Img = loadImage("assets/hand6-cropped.png");
  hand7Img = loadImage("assets/hand7-cropped.png");
  hand8Img = loadImage("assets/hand8-cropped.png");
  hand9Img = loadImage("assets/hand9-cropped.png");
  hand10Img = loadImage("assets/hand10-cropped.png");
  // ...

  //font = loadFont('assets/Petemoss-Regular.ttf');
  fontTitle = loadFont("assets/PlayfairDisplay-Italic-VariableFont_wght.ttf");
  font = loadFont("assets/PTSerif-Italic.ttf");
}

function setup() {
  // createCanvas(bgImg.width, 800);

  let canvasWidth = windowWidth;
  let canvasHeight = windowHeight;

  if (bgImg.width < canvasWidth) {
    canvasWidth = bgImg.width;
  }

  if (bgImg.height < canvasHeight) {
    canvasHeight = bgImg.height;
  }

  createCanvas(canvasWidth, canvasHeight);

  // create all the hand objects
  hands = [];
  //                image     x              y                   text
  hands.push(
    new Hand(
      hand1Img,
      50,
      height - hand1Img.height + 40,
      "Shares our work within the larger survivor justice movement, and invites a growing community of survivors and allies to go #BeyondTheHashtag with us."
    )
  );
  hands.push(
    new Hand(
      hand2Img,
      500,
      height - hand2Img.height + 10,
      "We embarked on a collective journey to explore the different ways healing can look and feel like. We discussed the power of our stories and introduced tools and practices to support you in navigating trauma to restore a sense of safety, joy, and agency."
    )
  );
  hands.push(
    new Hand(
      hand3Img,
      180,
      height - hand3Img.height + 10,
      "“Being abused or experiencing sexual violence does not define your entire life. It does not mean you cannot be the person you want to be. I want you to know so many survivors are healing, thriving, and living the lives they want to live! You can too, don’t give up hope!” - NIKITA MITCHELL"
    )
  );
  hands.push(
    new Hand(
      hand4Img,
      550,
      height - hand4Img.height + 200,
      "I carried around a physical body that was overwhelmed by trauma. Being hugged in certain ways made me stiffen up. I couldn’t stand walking past certain parts of my own campus because the memories would instantly come back. And I became so used to feeling so heavy that I operated as if all of it was normal. - KAIA NAADIRA"
    )
  );
  hands.push(
    new Hand(
      hand5Img,
      290,
      height - hand5Img.height + 70,
      "I carry my fears on my body because I don’t want to leave them laying around. - WARSAN SHIRE"
    )
  );
  hands.push(
    new Hand(
      hand6Img,
      160,
      height - hand6Img.height + 210,
      "Each story has a monster in it who made them tough instead of brave, so they open their legs rather than their hearts where that folded child is tucked. - TONI MORRISON"
    )
  );
  hands.push(
    new Hand(
      hand7Img,
      300,
      height - hand7Img.height + 250,
      "Vulnerability sounds like truth and feels like courage. Truth and courage aren’t always comfortable but they’re never weakness. - DR. BRENÉ BROWN"
    )
  );
  hands.push(
    new Hand(
      hand8Img,
      400,
      height - hand8Img.height + 20,
      "I couldn’t understand how I had it in me to be so much nicer and gentler to him than my own self. - KAIA NAADIRA"
    )
  );
  hands.push(
    new Hand(
      hand9Img,
      450,
      height - hand9Img.height + 230,
      "We are holding a special place in our hearts for all of the survivors who came forward, as well as those who are still holding their truths close. - Statement on R. Kelly Verdict"
    )
  );
  hands.push(
    new Hand(
      hand10Img,
      20,
      height - hand10Img.height + 230,
      "“As a survivor, it is important for me to serve as a member of the board not only because it provides me an opportunity to lend my voice and my perspective to building and operationalizing the mission of the organization,” - Dr. Yaba Blay (scholar-activist, public speaker, and cultural consultant)"
    )
  );
}

function draw() {
  background(220);

  image(bgImg, 0, 0);

  for (let i = 0; i < hands.length; i++) {
    hands[i].handleMouseOver();
    hands[i].show();
  }

  //   hand1.handleMouseOver();
  //   hand1.show();

  //   hand2.handleMouseOver();
  //   hand2.show();

  //   hand3.handleMouseOver();
  //   hand3.show();

  //   hand4.handleMouseOver();
  //   hand4.show();

  //   hand5.handleMouseOver();
  //   hand5.show();

  //   hand6.handleMouseOver();
  //   hand6.show();

  //   hand7.handleMouseOver();
  //   hand7.show();

  //   hand8.handleMouseOver();
  //   hand8.show();

  //   hand9.handleMouseOver();
  //   hand9.show();

  //   hand10.handleMouseOver();
  //   hand10.show();

  rectMode(CENTER);
  textFont(fontTitle);
  textAlign(CENTER);
  textSize(60);
  text("#ME TOO", width / 2, height / 10);

  // textFont(font);
  // textAlign(CENTER);
  // textSize(20);
  // text("Women's Stories, Experiences & Messages from the Movement", width/2, height/5);
  
    
  let c1 = color(255, 255);
  let c2 = color(255, 0);
  
  let cloudHeight = 200;
  let cloudYTop = height / 4 - cloudHeight;
  let cloudYBottom = height / 4;
  
  print(cloudHeight);
  
  setGradient(0, cloudYTop, width, cloudHeight, c2, c1, Y_AXIS);
  setGradient(0, cloudYBottom, width, cloudHeight, c1, c2, Y_AXIS);

  

  fill(0);
  noStroke(0);
  textFont(font);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(20);
  textWrap(WORD);
  text(mainText, width / 2, height / 5, width * 0.9);
  
  stroke(0);
  noFill();
  //rect(width / 2, height / 5, width * 0.9);
  //line(0, height / 5, width, height / 5);
}

function mousePressed() {
  //hand1.handleMousePressed();
  for (let i = 0; i < hands.length; i++) {
    hands[i].handleMousePressed();
  }
}


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis == Y_AXIS) {
    // Top to bottom gradient
    for (var i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == X_AXIS) {
    // Left to right gradient
    for (var i = x; i <= x + w; i++) {
      var inter = map(i, x, x + w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
