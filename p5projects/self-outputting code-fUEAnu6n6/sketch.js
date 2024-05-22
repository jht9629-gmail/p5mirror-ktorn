function rec() {
  fs = "" + rec + "rec()";
  lines = fs.split("\n");
  output = "";
  for (line of lines) {
    output += line + "\n"
  }
  console.log(output);
}
rec()
