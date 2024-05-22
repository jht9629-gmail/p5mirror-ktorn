let source;
let frag;
let sourceBase;

function preload() {
  source = loadImage("assets/grid.png");
}

function setup() {
  createCanvas(100, 200);
  frag = createGraphics(width, height);
  getFragment();
}

function draw() {
  
  image(frag, 0, 0);
}

function getFragment() {
		
  		let mirror = {
			x: random([-1, 1]),
			y: random([-1, 1])
		};
  
        let rot = random([0, 1]) * (PI / 2);
  
  		offset = {
			x: floor(random(0, source.width - width)),
			y: floor(random(0, source.height - height))
		}
  
		let sourceBase = createGraphics(source.width, source.height);

		sourceBase.push();
		sourceBase.translate(sourceBase.width / 2, sourceBase.height / 2);
		sourceBase.scale(mirror.x, mirror.y);
		sourceBase.rotate(rot);
		
		// if (this.base.tintOverride) {
		// 	sourceBase.tint(this.base.tintOverride);
		// } else {
		// 	sourceBase.tint(this.base.tint);
		// }
		
		sourceBase.imageMode(CENTER);
		sourceBase.image(source, 0, 0);
		sourceBase.pop();
		
		frag.image(sourceBase, 0, 0, width, height, offset.x, offset.y, width, height);
		// frag.image(sourceBase, 0, 0);
  
}

function mousePressed() {
  getFragment();
}