class Square {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vel = createVector(0, 0);
    this.targetVel = createVector(random(-maxVel, maxVel), random(-maxVel,maxVel));
    this.angle = 0;
    this.rotVel = 0;
    this.targetRotVel = random(-maxVel, maxVel);
    this.hue = hue;
    this.targetHue = random(hue - 20, hue + 20);
  }
  
  render() {
    push();
      stroke(this.hue, sat, bri);
      fill(this.hue, sat, bri);
      translate(this.x , this.y);
      rotate(this.angle);
      square(0, 0, this.size);
    pop();
  }
  
  move(iteration) {
    let d = map(iteration, 0, 100000, 0, 1, true);
    
    p5.Vector.lerp(this.vel, this.targetVel, d, this.vel);
        
    this.x += this.vel.x;
    this.y += this.vel.y;
    
    this.rotVel = lerp (this.rotVel, this.targetRotVel, d);
    this.angle += this.rotVel;
    
    this.hue = lerp(this.hue, this.targetHue, d);
  }
}