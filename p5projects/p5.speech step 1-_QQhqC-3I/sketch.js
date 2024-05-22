function setup() {
  createCanvas(400, 400);
  
  let voice = new p5.Speech();
  voice.speak("Hello world!");
  
}

function draw() {
  background(220);
}