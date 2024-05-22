let fadingwords = []


function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  
  if (frameCount % 300 == 0) {
    fadingwords.push(new FadedWord(random(words), random(0, width-100), random(100, height-100)));
  }
  
  for (let i = fadingwords.length-1; i >=0; i--) {
    let word = fadingwords[i];
    word.render();
    if (word.isDone) {
      fadingwords.splice(i, 1);
    }
  }
}