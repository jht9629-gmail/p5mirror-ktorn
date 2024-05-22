let primes = [];

let iter = 7;

function setup() {
  
  let one = new Prime(null, 1);
  one.isPatternComplete = true;
  
  primes.push(one);
  
  let two = new Prime(one, 2, 1);
  two.pattern = [1];
  two.isPatternComplete = true;
  primes.push(two);
  
  let next = two.getNextPrime();
  primes.push(next);
  
  let p = next;
  
  for(let i = 2; i < iter; i++) {
    p.calcPattern();
    p = p.getNextPrime();
    primes.push(p);
  }
  
  
  for (let i = 0; i < iter; i++) {
    print(primes[i].pattern.length);
  }
  
  print(primes);
    
  noLoop();
}