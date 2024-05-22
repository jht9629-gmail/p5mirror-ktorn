function love() {
function r() {
return Math.random();
}
fs = "" + love + "love()";
lines = fs.split( "\n" ); 
for ( line of lines ) { 
adorned = ""; 
bits = line.split( "\u0020" ); 
for ( bit of bits ) { 
care = r();
if ( care < 0.25 ) { 
adorned += "/*🄸 🄻🄾🅅🄴 🅈🄾🅄*/"; 
} else if ( care > 0.75 ) { 
adorned += "/*\u2661*/" 
} else { 
adorned += "/*\u2665*/" 
}
adorned += bit + "\u0020"; 
} 
console.log (adorned); 
} 
} 
love(); 
