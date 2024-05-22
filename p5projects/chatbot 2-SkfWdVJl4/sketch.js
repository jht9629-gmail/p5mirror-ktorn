function setup() {
  noCanvas();

  let speech = new p5.Speech();
  let speechRec = new p5.SpeechRec('en-US', gotSpeech);
  let continuous = true;
  let interim = false;
  speechRec.start(continuous, interim);
  let bot = new RiveScript();
  bot.loadFile("brain.txt").then(function() {
    console.log("Chatbot ready!");
    bot.sortReplies();
  }).catch(function(err, filename, lineno) {
    console.error("An error occurred!");
  });


  function gotSpeech() {
    print("got speech!");
  }
}

function draw() {
  background(220);
}