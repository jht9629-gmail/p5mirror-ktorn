/*
* SEDA debug pane
* by ktorn
*/

const PANE_MOUSE_COORDS = 1;

class SDebug {
	constructor() {
		this.debugPane;
		this.panes = [];
		this.panesIndex = {};
		this.isDebugVisible = false;

		this.createDebugPane();
		
		this.captureConsoleLog();
	}
	
	captureConsoleLog() {
		console.defaultLog = console.log.bind(console);
		console.logs = [];
		console.log = function(){
				// default &  console.log()
				console.defaultLog.apply(console, arguments);
				// new & array data
				console.logs.push("logs:  " + Array.from(arguments));
			}
		
		
		console.defaultError = console.error.bind(console);
		console.errors = [];
		console.error = function(){
				// default &  console.error()
				console.defaultError.apply(console, arguments);
				// new & array data
				console.errors.push("error: " + Array.from(arguments));
		}
		
		console.defaultWarn = console.warn.bind(console);
		console.warns = [];
		console.warn = function(){
				// default &  console.warn()
				console.defaultWarn.apply(console, arguments);
				// new & array data
				console.warns.push("warn:  " + Array.from(arguments));
		}
		
		console.defaultDebug = console.debug.bind(console);
		console.debugs = [];
		console.debug = function(){
				// default &  console.debug()
				console.defaultDebug.apply(console, arguments);
				// new & array data
				console.debugs.push("debug: " + Array.from(arguments));
		}
		
	}

	createDebugPane() {
		let col = color(0, 120);

		this.debugPane = createDiv("");

		this.debugPane.style('padding-top', '10px');
		this.debugPane.style('padding-bottom', '10px');
		this.debugPane.style('padding-left', '10px');
		this.debugPane.style('padding-right', '10px');

		this.debugPane.style('font-size', '12px');
		this.debugPane.style('font-family', 'sans-serif');
		this.debugPane.style('color', 'white');
		this.debugPane.style('background-color', col)

		this.debugPane.position(50, 50);
	}

	render() {
		if (DEBUG) {
			if (this.isDebugVisible) {
				this.debugPane.show();
				
				for (let i = 0; i < this.panes.length; i++) {
					this.panes[i].render();
				}
				
			} else {
				this.debugPane.hide();
			}
		}
	}

	toggleDebugPane() {
		if (DEBUG) {
			this.isDebugVisible = !this.isDebugVisible;
		}
	}
	
	debug(key, value) {
		let paneIndex = this.panesIndex[key];
		let pane;
		
		if(paneIndex) {
			pane = this.panes[paneIndex];
			pane.setValue(value);
		} else {
			pane = new PPane(this.debugPane, key);
			pane.setValue(value);
			this.panes.push(pane);
			this.panesIndex[key] = this.panes.length-1;
		}
	}

	addConsolePane() {
		let consolePane = new ConsolePane(this.debugPane);
		this.panes.push(consolePane);
	}
	
	addMouseCoordsPane() {
		let mousePane = new MousePane(this.debugPane);
		this.panes.push(mousePane);
	}
	
	addPane(pane) {
		this.panes.push(pane);
	}
	
	addSliderPane(name, min, max, value, step) {
		let sliderPane = new PreferenceSliderPane(this.debugPane, name, min, max, value, step);
		this.panes.push(sliderPane);
		return sliderPane;
	}
	
	addCheckboxPane(name, value) {
		let checkboxPane = new CheckboxPane(this.debugPane, name, value);
		this.panes.push(checkboxPane);
		return checkboxPane;
	}
  	
}

class PPane {
	constructor(parentDiv, name) {
		this.name = name;
		this.value;
		this.parentDiv = parentDiv;
		this.div = createDiv("");
		this.div.parent(parentDiv);
		this.content = createP("");
		this.content.parent(this.div);
	}
	
	setValue(newValue) {
		this.value = newValue;
	}
	
	render() {
		this.content.html(this.name + ": " + this.value);
	}
	
	hide() {
		this.div.hide();
	}
	
	show() {
		this.div.show();
	}
}

class ConsolePane {
	constructor(parentDiv) {
		this.name = "consolePane";
		this.parentDiv = parentDiv;
		this.containerDiv = createDiv();
		this.containerDiv.style('height', '200px');
		//this.containerDiv.attribute('overflow', 'scroll');
		this.containerDiv.parent(parentDiv);
		
		this.div = createDiv("");
		this.div.style('max-height', '100%');
		this.div.style('overflow', 'auto');
		this.div.style('border', '1px solid red');
		this.div.parent(this.containerDiv);
		this.content = createP("");
		this.content.parent(this.div);
	}
	
	render() {
		
		let stuff = "";
		for (let i = 0; i < console.logs.length; i++) {
			stuff += console.logs[i] + "<br>";
		}
		
		this.content.html(stuff);
	}
	
	hide() {
		this.div.hide();
	}
	
	show() {
		this.div.show();
	}
}

class MousePane {
	constructor(parentDiv) {
		this.name = "mousePane";
		this.parentDiv = parentDiv;
		this.div = createDiv("");
		this.div.parent(parentDiv);
		this.content = createP("");
		this.content.parent(this.div);
		// this.div.show();
	}
	
	render() {
		this.content.html("Mouse: " + mouseX + " " + mouseY);
	}
	
	hide() {
		this.div.hide();
	}
	
	show() {
		this.div.show();
	}
}

class PreferenceSliderPane {
	constructor(parentDiv, name, min, max, value, step) {
		this.name = name;
		this.parentDiv = parentDiv;
		this.div = createDiv("");
		this.div.style('display', 'inline');
		this.div.parent(parentDiv);
		this.min = min;
		this.max = max;
		this.step = step;
		this.value = value;
		this.step = step;
		this.active = true;
		
		this.sCheckbox = createCheckbox(this.name, this.active);
		this.sCheckbox.changed(this.checkBoxChanged.bind(this));
		this.slider = createSlider(this.min, this.max, this.value, this.step);
		this.slider.style('width', '80%');
		this.slider.changed(this.sliderChanged.bind(this));
		this.spValue = createSpan(this.value);
		this.spValue.style('width', '20%');

		
		this.sCheckbox.parent(this.div);
		this.slider.parent(this.div);
		this.spValue.parent(this.div);
	}
	
	checkBoxChanged() {
		this.active = this.sCheckbox.checked();
	}
	
	sliderChanged() {
		this.value = this.slider.value();
	}
	
	render() {
		this.value = this.slider.value();
		this.spValue.html(this.value);
	}
	
	hide() {
		this.div.hide();
	}
	
	show() {
		this.div.show();
	}
	
}


class CheckboxPane {
	constructor(parentDiv, name, active) {
		this.name = name;
		this.parentDiv = parentDiv;
		this.div = createDiv("");
		this.div.style('display', 'inline');
		this.div.parent(parentDiv);
		this.active = active;
		
		this.sCheckbox = createCheckbox(this.name, this.active);
		this.sCheckbox.changed(this.checkBoxChanged.bind(this));
		
		this.sCheckbox.parent(this.div);
	}
	
	checkBoxChanged() {
		this.active = this.sCheckbox.checked();
	}
	
	
	render() {
		// this.value = this.slider.value();
		// this.spValue.html(this.value);
	}
	
	hide() {
		this.div.hide();
	}
	
	show() {
		this.div.show();
	}
	
}