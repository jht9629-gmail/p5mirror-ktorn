class MultStat {
  constructor(a, b) {
    this.a = a;
    this.b = b;

    this.averageTime = 0;
    this.averageCorrectness = 100;

    this.attemptKeys = [];
    this.attempts = [];

    this.score = 0;
    this.lastAttemptTimeStamp = 0;
  }

  addAttempt(key, attempt) {
    if (!this.attemptKeys.includes[key]) {
      this.attemptKeys.push(key);
      this.attempts.push(attempt);
      
      let tCompleted = Date.parse(attempt.timeCompleted);
      
      if(tCompleted > this.lastAttemptTimeStamp) {
        this.lastAttemptTimeStamp = tCompleted;
      }
    }

    this.updateScore();
  }

  updateScore() {
    let sumTimes = 0;
    let sumInc = 0;

    for (let i = 0; i < this.attempts.length; i++) {
      let att = this.attempts[i];
      // print("calculating attempt!", att);  
      let timeStarted = Date.parse(att.timeStarted);
      let timeCompleted = Date.parse(att.timeCompleted);
      let timeElapsed = (timeCompleted - timeStarted)/1000;
      sumTimes += timeElapsed;
      sumInc += att.incorrectAttempts;
    }
    
    // print("sumTimes", sumTimes);  
    // print("sumInc", sumInc);  

    this.averageTime = sumTimes / this.attempts.length;
    
    // print("averageTime", this.averageTime);  
    this.averageCorrectness =
      (this.attempts.length / (this.attempts.length + sumInc)) * 100;
    // print("averageCorrectness", this.averageCorrectness);
    
    let cScore = 0.5 * this.averageCorrectness;
    // print("cScore", cScore);  
    let tScore = 0.5 * map(this.averageTime, 0, 60, 100, 0, true);
    // print("tScore", tScore);  
    
    this.score = cScore + tScore;
    
    // print("score", this.score);    
  }
  
  getPriority() {
    let timeSinceLastAttempt = 0;
    
    if(this.lastAttemptTimeStamp > 0) {
      timeSinceLastAttempt = new Date() - this.lastAttemptTimeStamp;
    } else {
      return 0;  // no attempt made. this is highest priority (lowest value)
    }
    
    let timePriority = map(timeSinceLastAttempt, 0, (7 * 24 * 60 * 60 * 1000), -20, 100, true);
  
    return this.score - timePriority;
  }
  
  toString() {
    return "" + this.a + "x" + this.b;
  }
}

class MultTable {
  constructor() {
    this.table = [];
    this.sortedElements = [];

    for (let na = 0; na <= SIZE; na++) {
      this.table[na] = [];
      for (let nb = 0; nb <= SIZE; nb++) {
        let m = new MultStat(na, nb);
        this.table[na][nb] = m;
        this.sortedElements.push(m);
      }
    }
  }

  addAttempt(key, attempt) {
    let nums = attempt.nums;

    this.table[nums[0]][nums[1]].addAttempt(key, attempt);
    
    this.sortedElements.sort(function(a, b) {
      return (a.getPriority() - b.getPriority());
    });
    
  }

  render() {
    let cellSize = width / (SIZE + 1);
    
    for (let na = 0; na <= SIZE; na++) {
      for (let nb = 0; nb <= SIZE; nb++) {
        let m = this.table[na][nb];
        
        // print(m.score);
        
        let h = (0, 0, 100);
        let s = 0;
        let b = 100;
        
        if(m.attempts.length > 0) {
          s = 50;
          h = map(m.score, 100, 0, 120, 0, true);
        }
        
        stroke(0, 0, 0);
        fill(h, s, b);
        rect(na * cellSize, nb * cellSize, cellSize, cellSize);
        
        noStroke();
        fill(0, 0, 0);
        text(m.toString(), na * cellSize, nb * cellSize + 20);
      }
    }
  }
}
