let particles = [];


function setup() {
  createCanvas(400, 400);
  
  for(let i = 0; i < 10; i++) {
    let p = new Particle(width /2 , height / 3 + (i * 10), (1 + i));
    particles.push(p);
  }
}

function draw() {
  background(0, 5);
  
  for(let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.render();
  }
}