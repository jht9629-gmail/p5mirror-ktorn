
const SHAPE = {
  ELLIPSE: 0,    // TODO
  LINE: 1,       // TODO
  RECT: 2
};

const SKETCH_LEVELS = 3;
const CONSTRUCTION_OV = 30;  // construction lines multiplier

class SketchShape {
  
  constructor(shape, p1, p2, p3, p4) {
    this.shape = shape;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
    
    this.sketches = []
    
    if(this.shape == SHAPE.RECT) {
      this.generateRectSketches();
    }
    
  }
  
  
  generateRectSketches() {
    
    if(!this.p4) {
      this.p4 = this.p3
    }
    
    for(let i = 0; i < SKETCH_LEVELS; i++) {
      
      let e = i * 5;
      
      let ov = CONSTRUCTION_OV * i;
      
      let p1Vx = this.p1 + random(-e, e);
      let p1Vy = this.p2 + random(-e, e) - ov;
      let p1Hx = this.p1 + random(-e, e) - ov;
      let p1Hy = this.p2 + random(-e, e);
      let p2Hx = this.p1 + this.p3 + random(-e, e) + ov;
      let p2Hy = this.p2 + random(-e, e);
      let p2Vx = this.p1 + this.p3 + random(-e, e);
      let p2Vy = this.p2 + random(-e, e) - ov;
      let p3Vx = this.p1 + this.p3 + random(-e, e);
      let p3Vy = this.p2 + this.p4 + random(-e, e) + ov;
      let p3Hx = this.p1 + this.p3 + random(-e, e) + ov;
      let p3Hy = this.p2 + this.p4 + random(-e, e);
      let p4Hx = this.p1 + random(-e, e) - ov;
      let p4Hy = this.p2 + this.p4 + random(-e, e);
      let p4Vx = this.p1 + random(-e, e);
      let p4Vy = this.p2 + this.p4 + random(-e, e) + ov;
      
      let sketch = {level: i,
                    p1Vx: p1Vx,
                    p1Vy: p1Vy,
                    p1Hx: p1Hx,
                    p1Hy: p1Hy,
                    p2Vx: p2Vx,
                    p2Vy: p2Vy,
                    p2Hx: p2Hx,
                    p2Hy: p2Hy,
                    p3Vx: p3Vx,
                    p3Vy: p3Vy,
                    p3Hx: p3Hx,
                    p3Hy: p3Hy,
                    p4Vx: p4Vx,
                    p4Vy: p4Vy,
                    p4Hx: p4Hx,
                    p4Hy: p4Hy,
                   }
      this.sketches.push(sketch);
    }
  }
  
  render() {
    let gray = 150;
    strokeWeight(1);
    
    for(let i = this.sketches.length-1; i >= 0; i--) {

      
      
      renderLevel(i);
    }
  }
  
  renderLevel(level) {
    
    let gray = 200 - (50 * (3 - level));

    stroke(gray);
    
      if(level == 0) {
        strokeWeight(3);
      } else {
        strokeWeight(1);
      }
    
      let s = this.sketches[level];
    
      line(s.p1Hx, s.p1Hy, s.p2Hx, s.p2Hy);
      line(s.p2Vx, s.p2Vy, s.p3Vx, s.p3Vy);
      line(s.p3Hx, s.p3Hy, s.p4Hx, s.p4Hy);
      line(s.p4Vx, s.p4Vy, s.p1Vx, s.p1Vy);
  }
}