function setup() {
  
  
   var output = "privacy_important  <- c(";
  
  for (var i=0; i < 50; i++) {
    
    output +=  "\"" + random(["strongly agree", "agree", "neither agree or disagree", "disagree", "strongly disagree"])  + "\"";
    output += ","
    
  }
  
  output += ")";
  
  print(output);
}

function draw() {
  background(220);
}