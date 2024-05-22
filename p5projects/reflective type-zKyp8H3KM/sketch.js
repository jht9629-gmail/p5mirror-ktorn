function rec() {
  
  const Http = new XMLHttpRequest();
  const url='https://jsonplaceholder.typicode.com/posts';
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    // console.log(Http.responseText)
  }
  
  
  fs = "" + rec + "rec()";
  lines = fs.split("\n");
  output = "";
  for (line of lines) {
    output += line + "\n"
  }
  console.log(output);
}
rec()
