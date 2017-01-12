function Tools(canvas) {

	this.canvas = canvas;
	var ctx = this.canvas.getContext("2d");

	var drawTool = new DrawTool(this.canvas);
	var croppingTool = new CroppingTool(this.canvas);
	var blurTool = new BlurTool(this.canvas, croppingTool);

	this.canvas.onmousemove = function(e) {
		if (Globals.selectedTool == ToolsPalette.DrawTool) {
			drawTool.mousemove(e);
		}
		if (Globals.selectedTool == ToolsPalette.CroppingTool) {
			croppingTool.mousemove(e);
		}
		if (Globals.selectedTool == ToolsPalette.BlurTool) {
			blurTool.mousemove(e);
		}
	};

	this.canvas.onmousedown = function(e) {

		if (Globals.selectedTool == ToolsPalette.DrawTool) {
			drawTool.mousedown(e);
		}
		if (Globals.selectedTool == ToolsPalette.CroppingTool) {
			croppingTool.mousedown(e);
		}
		if (Globals.selectedTool == ToolsPalette.BlurTool) {
			blurTool.mousedown(e);
		}
	};

	this.canvas.onmouseup = function(e) {
		if (Globals.selectedTool == ToolsPalette.DrawTool) {
			drawTool.mouseup(e);
		}
		if (Globals.selectedTool == ToolsPalette.CroppingTool) {
			croppingTool.mouseup(e);
		}
		if (Globals.selectedTool == ToolsPalette.BlurTool) {
			blurTool.mouseup(e);
		}
	};

	function applyCropping() {
		return croppingTool.crop();
	}
	
	function cropAndUpdate() {
		croppingTool.cropAndUpdate();
	}

	function applyBlurring(filter, kernel, imageUtils) {
		blurTool.blur(filter, kernel, imageUtils);
	}

	return {
		applyCropping : applyCropping,
		applyBlurring : applyBlurring,
		cropAndUpdate : cropAndUpdate
	}
}
