class Square {
  constructor(x, y, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    let min = canvasWidth / 4;
    let max = 3 * (canvasWidth / 4);
    this.width = random(min,max);
    min = canvasHeight / 4;
    max = 3 * (canvasHeight / 4);
    this.height = random(min,max);
    this.color = color(random(hue - hueRange, hue + hueRange), random(0,100), 100);
    this.bgColor = color(random(hue - hueRange, hue + hueRange), random(0,100), 100);
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