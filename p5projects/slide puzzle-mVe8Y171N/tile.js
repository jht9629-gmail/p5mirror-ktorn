class Tile {
  
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
  
  render() {
    image(this.img, this.x * width/cols + 1, this.y * height/rows + 1);
  }
  
}