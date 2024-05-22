const MAX_BUCKETS = 100;
let buckets = [];
let bucketWidth;

function setup() {
  createCanvas(400, 400);
  
  bucketWidth = width / MAX_BUCKETS;
  
  for (let i = 0; i < MAX_BUCKETS; i++) {
    buckets[i] = {count: 0};
  }
  
  stroke(0);
  fill(0);
}

function draw() {
  background(220);
  
  let pick = random(0, MAX_BUCKETS);
  pick = floor(Math.pow(pick, 2) / MAX_BUCKETS);
  let bucket = buckets[pick];
  
  bucket.count++;
  
  for (let i = 0; i < buckets.length; i++) {
    bucket = buckets[i];
    for(let k = 0; k < bucket.count; k++) {
      rect(i * bucketWidth, k * 2, bucketWidth, 2);
    }
  }
  
}