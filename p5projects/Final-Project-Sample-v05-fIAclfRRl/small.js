class Small {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.canv = createGraphics(this.w, this.h);
    this.canv.angleMode(DEGREES);
    this.angle = random(-45, 45);
    this.vSlices = random(3, 8);
    this.hSlices = this.vSlices;
    this.vGap = this.w/this.vSlices;
    this.hGap = this.h/this.hSlices;
    this.size = this.hGap * 0.8;
    this.inverted = random() < 0.2;  // invert 20% of smalls
  }

  rotate(rotAngle) {
    this.angle += rotAngle;
  }
  
  render() {
    this.canv.stroke(0);
    
    if (this.inverted) {
      this.canv.background(0);
      this.canv.fill(255);
    } else {
      this.canv.background(255);
      this.canv.fill(0);
    }
    
    this.canv.push();
    this.canv.translate(this.w / 2, this.h / 2);
    this.canv.rotate(this.angle);
    this.canv.translate(-this.w / 2, -this.h / 2);
    for (let i = -this.vGap*2; i <= this.h + this.vGap*2; i += this.vGap) {
      for (let j = -this.hGap*2; j <= this.w + this.hGap*2; j += this.hGap) {
        this.canv.circle(i, j, this.size);
      }
    }
    this.canv.pop();
    
    // draw border around canv
    this.canv.noFill();
    this.canv.stroke(100);
    this.canv.strokeWeight(2);
    this.canv.rect(0,0, this.w, this.h);
  }
}
