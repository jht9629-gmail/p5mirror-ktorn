class Mult {
    
  constructor(a, b) {
    
    this.a;
    this.b;
    
    if ((a || a === 0) && (b || b === 0)) {
      this.a = a;
      this.b = b;
    } else {
      this.a = floor(random(A_MAX+1));
      this.b = floor(random(B_MAX+1));
    }

    this.parentDiv;
    
    this.p;
    this.i;
    
    this.timeStarted = new Date();
    this.timeCompleted;
    
    this.incorrectAttempts = 0;
    this.isAnswered = false;
    
    this.score = 0;
    
    this.handle = this.handleInput.bind(this);
  }
  
  isAnswer(c) {
    return this.a * this.b == c;
  }
  
  getAnswer() {
    return this.a * this.b;
  }
  
  relocateParent(newParentDiv) {
    newParentDiv.child(this.p);
    let t = this.a + " x " + this.b + " = ";
    this.i.remove();
    this.p.style('font-size', '15px');
    this.p.html(t + this.getAnswer());
    
    let h = 0;
    let s = 100;
    let b = 100;

    h = map(this.score, 100, 0, 120, 20, true);
    
    print("score", this.score);
    
    let c = color(h,s,b);
    
    let rgbString = 'rgb(' + red(c) + ', ' + green(c) + ', ' + blue(c) + ')';
    
    // print("color", rgbString);
    newParentDiv.style('background-color', rgbString);
    
  }
  
  render(parentDiv) {
    this.parentDiv  = parentDiv;
    let t = this.a + " x " + this.b + " = ";
    
    if(!this.p) {
      this.p = createP(t);
      this.p.style('font-size', '20px');
      parentDiv.child(this.p);
    }
  
    if(!this.isAnswered) {
      if(!this.i) {
        this.i = createInput('', "number");
        this.i.style('font-size', '20px');
        this.i.size(30);
        this.p.child(this.i);
        this.i.changed(this.handle);
        this.i.elt.focus();
      }
    } else {
      this.i.remove();
      this.p.html(t + this.getAnswer());
    }
    
  }
  
  updateScore() {
    let sumTimes = 0;
    let sumInc = 0;
    
    let timeToComplete = (this.timeCompleted - this.timeStarted)/1000;
    let correctness = (1 / (this.incorrectAttempts + 1)) * 100;
    
    // print("correctness", correctness);
    
    let cScore = 0.5 * correctness;
    let tScore = 0.5 * map(timeToComplete, 0, 30, 100, 0, true);
     
    this.score = cScore + tScore;
    
    // print("score", this.score);    
  }
  
  handleInput() {    
    let answer = parseInt(this.i.value());

    if(this.isAnswer(answer)) {
      print("Correct!");
      soundCorrect.play();
      this.isAnswered = true;
      this.timeCompleted = new Date();
      this.updateScore();
      handleCorrectAnswer();
      submitAttempt(this.getData());
    } else {
      print("Incorrect!");
      this.i.value("");
      soundWrong.play();
      shakeDiv(this.parentDiv);
      this.incorrectAttempts++;
    }

    let currentsleep = 1000;
  }
  
  getData() {
    let data = { nums: [this.a, this.b],
                 timeStarted: toISOLocal(this.timeStarted),
                 timeCompleted: toISOLocal(this.timeCompleted),
                 incorrectAttempts: this.incorrectAttempts
               };
    
    return data;
  }
  
  toString() {
    return "" + this.a + "x" + this.b;
  }
    
}