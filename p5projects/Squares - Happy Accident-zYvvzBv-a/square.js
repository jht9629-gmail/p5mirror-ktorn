class Square {
  constructor(x, y, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = random(100,300);
    this.height = random(100,300);
    this.color = color(random(255), random(255), random(255));
    this.bgColor = color(random(255), random(255), random(255));
  }
  
  render() {
    noStroke();
    push();
    translate(this.x, this.y);
    fill(this.bgColor);
    rectMode(CORNER);
    rect(0, 0, this.canvasWidth, this.canvasHeight);
    translate(this.canvasWidth / 2, this.canvasHeight / 2);
    rectMode(CENTER);
    fill(this.color);
    rect(0, 0, this.width, this.height);
    pop();
  }
  
}