
const BUFFER_START_WIDTH = 400;
const BUFFER_START_HEIGHT = 400;

let bufferWidth = BUFFER_START_WIDTH;
let bufferHeight = BUFFER_START_HEIGHT;

let cnv;
let buffer;

let status = ""

let sedebug;
let consolePane;
let resPane;
let DEBUG = true;

function preload() {
	layer = loadImage("layergrid.png");
}

function setup() {
	cnv = createCanvas(window.innerWidth, window.innerHeight);
    buffer = createGraphics(bufferWidth, bufferHeight);
  
	if (DEBUG) {
		sedebug = new SDebug();
		consolePane = sedebug.addConsolePane();
        toggleDebugPane();
    }
  
      console.log("test initialised.")
}

function draw() {
	background(255);
	
	let layerWidth = bufferWidth / 3;
	let layerHeight = bufferHeight;
	
	let x = 0;
	let y = 0;
	
	buffer.background("blue");
	
	buffer.image(layer, x, y, layerWidth, layerHeight, 0, 0, layerWidth, layerHeight);
	
	x += layerWidth;
	
	buffer.image(layer, x, y, layerWidth, layerHeight, 0, 0, layerWidth, layerHeight);
	
	x += layerWidth;
	
	buffer.image(layer, x, y, layerWidth, layerHeight, 0, 0, layerWidth, layerHeight);
	
    // display buffer in main canvas
	image(buffer, 0, 0, bufferWidth, bufferHeight);
		

    buffer.loadPixels();
  
    let p = 100;
    let pix = buffer.pixels[p];
  
    if(pix == 0) {
      print("Buffer Sample Invalid!")
      sdebug("bufferSample", pix);
      noLoop();
    } else {
      sdebug("bufferSample", pix);
    }
  
    
    sdebug("frameCount", frameCount)
    sdebug("bufferWidth", bufferWidth);
    sdebug("bufferHeight", bufferHeight);
  

    bufferWidth += 2
    bufferHeight += 2
  
    buffer.remove();
    buffer = undefined;
    buffer = createGraphics(bufferWidth, bufferHeight);
  
  
    renderDebug();

}



function debug(message) {
	if(DEBUG) {
		console.log(message);
	}
}

function sdebug(key, value) {
	if(DEBUG && sedebug) {
		sedebug.debug(key, value);
	}
}

function renderDebug() {
	
	if (DEBUG && sedebug) {
		sedebug.render();
	}
	
}

function toggleDebugPane() {
	if (DEBUG && sdebug) {
		sedebug.toggleDebugPane();
	}
}



function keyPressed() {

	switch (keyCode) {

		case 68:
			// d
            print("toggling pane")
			toggleDebugPane();

			break;


		default:
			print("Unknown key code " + keyCode);
			break;
	}

}
