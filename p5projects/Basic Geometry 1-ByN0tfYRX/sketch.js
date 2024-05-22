class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
  
    setLabelBottom() {
      this.labelTop = false;
    }
  
    setLabelTop() {
      this.labelTop = true;
    }
  
    distance(p2) {
      var result = Math.sqrt( (p2.x - this.x)**2 + (p2.y - this.y)**2);
      return result;
    }
  
    draw() {
      point(this.x, this.y);
      textAlign(CENTER);

      var labelYoffset = 0;
      if (this.labelTop) {
        labelYoffset = -20;
      } else {
        labelYoffset = 20;
      }
      text("("+ this.x + ", " + this.y + ")", this.x, this.y + labelYoffset);
    }
}

class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
  
    draw() {
      line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  p1 = new Point(100,300);
  p1.draw();
  
  p2 = new Point(300,300);
  p2.draw();
  
  l1 = new Line(p1, p2);
  l1.draw();
  
  dp1p2 = dist(p1.x, p1.y, p2.x, p2.y);
  print("dist library: " + dp1p2);
  dd = p1.distance(p2);
  print("dist our    : " + dd);
  
  p3 = new Point(200, 127);
  p3.draw();
  l2 = new Line(p1, p3);
  l2.draw();
  l3 = new Line(p2,p3);
  l3.draw();

  d12 = p1.distance(p2);
  print("Dist p1 p2: " + d12);
  d13 = p1.distance(p3);
  print("Dist p1 p3: " + d13);
  d23 = p2.distance(p3);
  print("Dist p2 p3: " + d23);

}