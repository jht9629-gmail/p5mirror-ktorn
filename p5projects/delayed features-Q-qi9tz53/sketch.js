let start = 0;
let featuresDone = false;

  let handler = {
    get: (obj, prop) => {
      if(prop == "test2") {
        return waitForLoaded();
      }
      return obj[prop];
    }
  }

function setup() {
  noLoop();
  createCanvas(400, 400);
  background(0);

  
  start = millis();
  


  window.$fxhashFeatures = { "init" : 3,
                             test: "loading",
                             test2: "ik"
                           };

  window.$fxhashFeatures = new Proxy(window.$fxhashFeatures, handler);
  
  print(start);
  
}

function draw() {
  background(220);
  
  if(frameCount > 500) {
    loading = false;
  }
}

function waitForLoaded() {

  stroke(0);
  noFill();
  rect(100, 200, 100, 10);
  
  let d = 0;
  
  fill(0);
  
  while(d < 100000) {
    rect(100, 200, d, 10);
    d++;  
  }
  
  featuresDone = true;
  

  
  return d;
}