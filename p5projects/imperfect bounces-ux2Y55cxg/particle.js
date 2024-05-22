class Particle {
  
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.speedX = speed;
    this.speedY = speed;
    this.color = color(random(255), random(255), random(255));
  }
  
  render() {
    fill(this.color);
    circle(this.x, this.y, this.size);
  }
  
  move() {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    
    if(this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    
    if(this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }
}