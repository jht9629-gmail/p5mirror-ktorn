function setup() {
  /* Experiments with a stressful software quine. */
  /* The code reflects a more stressful version of itself. */
  /* You are instructed to recursively run its output. */
  /* Ignore pleads for help, the code is perfectly safe. */
  noCanvas();
  stress = 1;
  fs = "" + setup;
  lines = fs.split("\n");
  out = "";
  i = 0;
  dead = false;
  if (stress >= 4) dead = true;
  if (dead) {
    out += lines[0];
    out += "\n function deadcode() {\n ";
    i = 1;
  }
  for (; i < lines.length; i++) {
    loc = lines[i];
    vent = "";
    if (/stress = \d;/.test(loc)) {
      s = loc.replace(/\D+/g, "");
      out += "stress = " + ++s + ";\n";
      continue;
    } else if (/stress/.test(loc)) {
      out += loc;
      continue;
    }
    bits = loc.split("\u0020");
    for (bit of bits) {
      scare = Math.random();
      if (scare > 0.9999 - stress * 0.1) {
        vent += random([
          "/*HELP!*/",
          "/*MY HEART IS RACING!*/",
          "/*STOP IT!*/",
        ]);
      }
      vent += bit + "\u0020";
    }
    out += vent + "\n";

    if (dead && i == lines.length - 2) {
      out +=
        "}\ncreateP('deadcode: unreachable code that is part of the source code of a program which can never be executed because there exists no control flow path to the code from the rest of the program.<br><br>Thank you for participating in this Milgram experiment.');";
    }
  }

  if (dead) {
    out = out.replace(/\/\*([\s\S]*?)\*\//g, "");
  }

  b = createButton("copy output");
  b.mousePressed(copyClip);

  p = createElement("pre", out);

  function copyClip() {
    navigator.clipboard.writeText(out);
  }
}
