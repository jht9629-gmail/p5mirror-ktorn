class Hand {
  
  constructor(image, x, y, text) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.text = text;
    this.handIsRaised = false;
  }
  

  show() {
    
      if (this.handIsRaised) {
              image(this.image, this.x, this.y-50);
      } else {
              image(this.image, this.x, this.y);
      }
    
      // ellipse(this.x + this.image.width / 2 + 20, this.y + this.image.height / 2 - 75, 150, 150);
  }
  
  
  
  handleMouseOver() {
    let hitBoxX = this.x + this.image.width / 2 + 20;
    let hitBoxY = this.y + this.image.height / 2 - 75;
    let hitBoxRadius = 150/2;
    
    let d = dist(mouseX, mouseY, hitBoxX, hitBoxY);
    
    if (d < hitBoxRadius) {
      // mouse is over hand
      this.handIsRaised = true;
      
    } else {
      // mouse is away from the hand
      this.handIsRaised = false;
    }
   
  }
  
  handleMousePressed(){
    
    if (this.handIsRaised) {
      console.log("I was clicked! " + this.text);
      mainText = this.text;
    }
  }
}