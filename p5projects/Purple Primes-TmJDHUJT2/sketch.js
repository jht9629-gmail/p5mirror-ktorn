function setup() {
  pixelDensity(14);
  createCanvas(971, 600);
  background(0)
  // colorMode(HSB);
  
  primes = calculatePrimes(10000);
  
  print(primes);
  
  noFill();
  strokeWeight(1)
  // smooth();
  
  for (let i = 0; i < primes.length; i++) {
    let size = primes[i];
    size = int(size / PI);
    chooseColour(size);
    circle(width/2, height - size/2, size);
    // if(size > height) {
    //   break;
    // }
  }
}

function chooseColour(n) {

  switch(n % 10) {
    case 1:
      stroke("#EBA5F3");
      break;
    case 3:
      stroke("#E892F2");
      break;
    case 5:
      stroke("#DB7CF3");
      break;
    case 7:
      stroke("#BD72E9");
      break;
    case 9:
      stroke("#B054F2");
    break;
  }

}

function draw() {


}

function calculatePrimes(n) {
    // Eratosthenes algorithm to find all primes under n
    var array = [], upperLimit = Math.sqrt(n), output = [];

    // Make an array from 2 to (n - 1)
    for (var i = 0; i < n; i++) {
        array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }

    // All array[i] set to true are primes
    for (var i = 2; i < n; i++) {
        if(array[i]) {
            output.push(i);
        }
    }

    return output;
};