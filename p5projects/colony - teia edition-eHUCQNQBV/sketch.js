/* inspired in bubble-intercepting concept by Casey Reas
*   
*  code by ktorn
*
*  strokes start white, and gain darker colour over time
*  creating the effect of depth
*  bubbles decrease over time, until none are left
*
* TODO: * make it fully responsive (ditch square for golden ratio)
*         (add bubbles until right 'ratio' achieved before running simulation)
*       * make it light/dark theme responsive
*       * Immediately remove bubbles whose centers fall within hidden TEIA type
          (or which are entirely contained within such type, or make them bounce off of the type boundaries)
          (possibly try only with 'T')
*/


var totalBubbles;
var bubbles;

function setup() {
  totalBubbles = 500;
  var w = windowWidth;
	var h = windowHeight;
	
  var virtSize;
	
  // take smaller screen dimension
  // create a square 'virtual' canvas based on it
  w > h ? virtSize = h : virtSize = w;

  // actual canvas takes up all screen
	createCanvas(windowWidth, windowHeight);
  
    background(255);
	
	var bubbleSize = virtSize / 10;
	
	bubbles = [];
  
  var wPad = floor((w - virtSize)/2);
  var hPad = floor((h - virtSize)/2);

	for (var i = 0; i < totalBubbles; i++) {
    // create bubbles, randomly positioned within virtual canvas
		bubbles[i] = createRandomBubble(bubbleSize, wPad, hPad, virtSize);
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
	
  // stop looping when no more bubbles
	if(bubbles.length == 0) {
		noLoop();
	}
  
}

function createRandomBubble(bubbleSize, wPad, hPad, virtSize) {
  
	return new Bubble(random(wPad, virtSize + wPad),
		                random(hPad, virtSize + hPad),
										bubbleSize);
}