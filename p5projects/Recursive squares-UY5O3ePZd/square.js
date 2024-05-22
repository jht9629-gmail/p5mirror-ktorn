class Square {
  constructor(newX, newY, newSize) {
    this.x = newX;
    this.y = newY;
    this.size = newSize;
  }
  
  render() {
    rect(this.x, this.y, this.size, this.size);
  }
  
  
}