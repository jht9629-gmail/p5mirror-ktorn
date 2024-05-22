var totalBubbles;
var bubbles;

function createRandomBubble(bubbleSize) {
	return new Bubble(random(0, width),
		                random(0, height),
										bubbleSize);
}

function setup() {
	
  //createCanvas(windowWidth, windowHeight);
  background(255);
	
	var w = windowWidth;
	var h = windowHeight;
	
	if(w > h) {
		w = h;
	} else {
		h = w;
	}
	
	createCanvas(w, h);
	
	totalBubbles = 500;
	
	var bubbleSize = width / 10;
	//var bubbleSize = floor((width * height) * 0.00025);
	
	print(bubbleSize);
	
	bubbles = [];

	for (var i = 0; i < totalBubbles; i++) {
		bubbles[i] = createRandomBubble(bubbleSize);
	}
}

function draw() {
	
	var overlaps = 0;
	
  // noprotect
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].move();
    for(var j = i+1; j < bubbles.length; j++) {
      var b1 = bubbles[i];
      var b2 = bubbles[j];
      if(dist(b1.x, b1.y, b2.x, b2.y) < b1.size) {
        stroke(map(bubbles.length, 0, totalBubbles, 100, 255));
        line(b1.x, b1.y, b2.x, b2.y);
				overlaps++;
      }
    }
	}

  bubbles.pop();
	
	if(bubbles.length == 0) {
		noLoop();
	}
  
}