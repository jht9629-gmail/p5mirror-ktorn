let malcolmImage;

let myFont;
let audioFiles;
let quotes;
let currentText ="";
let newText =""


function preload() {
  myFont = loadFont("assets/BebasNeue-Regular.ttf");

  malcolmImage = loadImage("assets/malcolm-x.png");

  // load all the audio into a temporary array
  
  audioFiles = [];

  audioFiles.push(loadSound("assets/audio00.mp3"));      // 0
  audioFiles.push(loadSound('assets/audio01.mp3'));      // 1
  audioFiles.push(loadSound('assets/audio02.mp3'));      // 2
  // audioFiles.push(loadSound('assets/audio03.mp3'));      // 3
  // audioFiles.push(loadSound('assets/audio03.mp3'));      // 4

}

function setup() {
  createCanvas(600, 600);

  quotes = [];
  newText = [];
  
 // create quotes with audio and text

  quotes.push(new Quote(audioFiles[0], "But I do believe that the black man in the United States, and any human being, anywhere, is well within his right, to do whatever is necessary, by any means necessary, to protect his life and property."));
  quotes.push(new Quote(audioFiles[1], "In fact I think we'd be fooling ourselves if we had an audience this large and didn't realise that there were some enemies present."));
 quotes.push(new Quote(audioFiles[2], "At present I'm the minister of newly founded Muslims mosque incorporated , which has its offices  in the Teresa hotel right in the heart of Harlem that's the black belt in New York  city. And when we realised thet Adam Clayton Powell is a Christian minister, he's the heads of Abyssinian Baptist Church,but at the same time he's more famous for his political struggling   2"));
  // quotes.push(new Quote(audioFiles[3], "the quoted text 3"));
  // quotes.push(new Quote(audioFiles[4], "the quoted text 4"));

}

function draw() {
  background(255);

  image(malcolmImage, width - malcolmImage.width, height - malcolmImage.height);

  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(20);
  textWrap(WORD);
  textFont(myFont);
  text(currentText, width / 2, (height - malcolmImage.height) / 2, width - 100);
}

function mousePressed() {
  print("mouse was pressed!");

  // loop all quotes and stop their audio
  for (let i = 0; i < quotes.length; i++) {
    quotes[i].audio.stop();
  }

  let randomQuote = random(quotes);

  // set the quote that the draw function will show
  currentText = randomQuote.text;

  randomQuote.audio.play();
}
