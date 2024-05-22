function rec() {
/* adapted from @fraguada's https://typed.art/3406 */ 
fs = "" + rec + "rec()";
lines = fs.split("\n");
linesT = lines.length
freq = 4
max = 30
period = freq * Math.PI
unit = period / linesT
output = "";
a = 0;
for ( let i = 0; i < period || a < linesT; i += unit ) {
let ii = ( Math.sin( i ) + 1 ) * max
if ( ii < 1 ) ii = 1
let s = ''
for ( let j = 0; j < ii; j ++ ) {
s += '█'
}
output += ( "/*" + s + "*/" )
if (i < linesT) {
output += lines[a++] + "\n";
}
}
console.log(output);
}
rec()
