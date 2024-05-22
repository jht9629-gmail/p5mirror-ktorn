class Particle {
  
  constructor() {
    this.x = width / 2;
    this.y = height / 3;
    this.a = random(TWO_PI);
    this.speed = random(1, 2);
    this.vx = cos(this.a) * this.speed;
    this.vy = sin(this.a) * this.speed;
    
  }

  display() {
    noStroke();
    let pointillize = map(x, 0, width, littlePoint, bigPoint);
    let pix = img.get(int(this.x), int(this.y));
   fill(pix[0], pix[1], pix[2],45);
    ellipse(this.x, this.y, pointillize, pointillize);
  }


  move() {
    this.x = this.x + this.vx; //random (-5, 5);
    this.y = this.y + this.vy; // random (-5,5)
    if (this.y < 0) {
      this.y = height;
    }

    if (this.y > height) {
      this.y = 0;
    }

    if (this.x < 0) {
      this.x = width;
    }

    if (this.x > width) {
      this.x = 0;
    }
  }
}