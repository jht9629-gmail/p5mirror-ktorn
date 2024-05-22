class FadedWord {
  constructor(word, x, y) {
    this.word = word;
    this.alpha = 0;
    this.isFadeIn = true;
    this.isDone = false;
    this.x = x;
    this.y = y;
  }
  
  render() {
    
    if(this.isFadeIn) {
      this.alpha += 2;
      if(this.alpha >= 200) {
        this.isFadeIn = false;
      }
    } else {
      this.alpha -= 2;
      if(this.alpha <= 0) {
        this.isDone = true;
      }
    }
    
    textFont('Georgia');
    textSize(60);
    noStroke();
    fill(255, this.alpha);
    text(this.word, this.x, this.y);
  }
  
}