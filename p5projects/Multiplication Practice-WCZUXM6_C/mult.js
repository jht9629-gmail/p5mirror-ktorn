class Mult {
  constructor() {
    this.a = floor(random(A_MAX+1));
    this.b = floor(random(B_MAX+1));
    
    this.p;
    this.i;
    
    this.isAnswered = false;
    
    this.handle = this.handleInput.bind(this)
  }
  
  isAnswer(c) {
    return this.a * this.b == c;
  }
  
  getAnswer() {
    return this.a * this.b;
  }
  
  render() {
    let t = this.a + " x " + this.b + " = ";
    
    if(!this.p) {

      this.p = createP(t);
      this.p.style('font-size', '20px');
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
  
  handleInput() {    
    let answer = parseInt(this.i.value());
    
    print(this.getAnswer());
    print(answer);

    if(this.isAnswer(answer)) {
      print("Correct!");
      this.isAnswered = true;
    } else {
      print("Incorrect!");
    }

    let currentsleep = 1000;

    print ("-----> sleeping %d seconds" % currentsleep);
  }
  
  
}