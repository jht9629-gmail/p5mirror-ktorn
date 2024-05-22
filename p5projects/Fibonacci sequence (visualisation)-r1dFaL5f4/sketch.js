var fib;

class Fib {
  constructor() {
    this.n1 = 0;
    this.n2 = 1;

    print(this.n1);
    print(this.n2);
  }

  next() {
    var oldN1 = this.n1;
    var oldN2 = this.n2;

    this.n1 = this.n2;
    this.n2 = oldN1 + oldN2;

    print(this.n2, this.n2 / this.n1);
  }

}

function setup() {
  createCanvas(400, 400);
  fib = new Fib();

  background(220);

  var mult = 10;

  translate(250, 200);

  rect(0, 0, fib.n2 * mult, fib.n2 * mult);

  for (var i = 0; i < 7; i++) {
    fib.next();
    translate(fib.n1 * mult, fib.n1 * mult + 1);
    rotate(-HALF_PI);
    rect(0, 0, fib.n2 * mult, fib.n2 * mult);
  }

}