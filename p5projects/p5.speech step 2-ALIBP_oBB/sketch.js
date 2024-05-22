let speech;

function setup() {
  createCanvas(400, 400);
  
  speech = new p5.Speech();
  speech.onLoad = voicesReady;  
}

function voicesReady() {
  console.log("Voices loaded");
  let voices = speech.voices;
  console.log(voices)
}

function mousePressed() {
  console.log("Mouse pressed.");
  speech.setVoice("Alice")
  speech.speak("Hello world!");
}

function draw() {
  background(220);
}