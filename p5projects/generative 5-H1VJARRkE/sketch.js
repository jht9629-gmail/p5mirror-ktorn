var totalBubbles;
var bubbles;

function createRandomBubble() {
	return new Bubble(random(0, width),
		                random(0, height),
										40);
}

function setup() {
  createCanvas(400, 400);
  background(255);
	
	totalBubbles = 500;
	bubbles = [];

	for (var i = 0; i < totalBubbles; i++) {
		bubbles[i] = createRandomBubble();
	}
}

function draw() {
	
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].move();
    for(var j = i+1; j < bubbles.length; j++) {
      var b1 = bubbles[i];
      var b2 = bubbles[j];
      if(dist(b1.x, b1.y, b2.x, b2.y) < b1.size) {
        stroke(map(bubbles.length, 0, totalBubbles, 100, 255));
        line(b1.x, b1.y, b2.x, b2.y);
      }
    }
	}

  bubbles.pop();
  
}