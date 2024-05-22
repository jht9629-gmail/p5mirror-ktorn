class Bubble {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
	}
	
	show() {
		fill(0, 50);
		ellipse(this.x, this.y, this.size, this.size);
	}
	
	move() {
		this.x = this.x + random(-2, 2);
		this.y = this.y + random(-2, 2);
	}
}