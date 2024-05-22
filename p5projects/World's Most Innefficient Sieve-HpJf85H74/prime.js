class Prime {
    
  constructor(parent, prime, diffToParent) {
    this.parent = parent;
    this.diffToParent = diffToParent;
    this.prime = prime;
    this.pattern = [];
    this.patternSize = 1;
    this.patternCalcPointer = 1;
    this.isPatternComplete = false;
    
    if(this.parent) {
      this.patternSize = prime * parent.patternSize;
    }
  }
  
  getNextPrime() {
    let nextPrimeN = this.prime + this.pattern[0];
    let diff = nextPrimeN - this.prime;
    return new Prime(this, nextPrimeN, diff);
  }
  
  calcPattern() {
    
    let multiples = [];
    for (let i = 0; i < this.patternSize; i += this.prime) {
      multiples.push(i);
    }
    
    let prevPattern = [];
    let prevPatternSize = this.parent.patternSize;
    
    for (let i = 0; i < this.parent.pattern.length; i++) {
      prevPattern.push(this.parent.pattern[i] - this.diffToParent);
    }
        
    let iter = 0;
    
    let lastRemoved = 0;
    let diffBetweenRemoved = [];
    
    for (let i = 0; i < this.prime + 1; i++) {
      for (let j = 0; j < prevPattern.length; j++) {
        let p = prevPattern[j];
        p += iter * prevPatternSize;
        
        if (multiples.includes(p)) {
          if(lastRemoved == 0) {
            lastRemoved = p;
          } else {
            diffBetweenRemoved.push(p - lastRemoved);
            lastRemoved = p;
          }
        }
        
        if(!multiples.includes(p) && p < this.patternSize) {
          this.pattern.push(p);
        }
      }
      iter++;
    }
    
    print(this.prime, "removed", diffBetweenRemoved.length, "from pattern.");
    
    print("diffBetweenRemoved:", diffBetweenRemoved);
            
    this.isPatternComplete = true;
            
    // if(this.isPatternComplete) {
    //   this.parent.destroyPattern();
    // }
  }
  
  
    
  destroyPattern() {
    if(!this.parent.isPatternComplete) {
      this.parent.destroyPattern();
    }
    
    if(!this.isPatternComplete) {
      console.warn("WARNING: Destruction of incomplete pattern for [", this.prime, "]");
    }
    this.pattern = null;
  }
  
  toString() {
    let out = "[" + this.prime + "]";
    return out;
  }
  
}