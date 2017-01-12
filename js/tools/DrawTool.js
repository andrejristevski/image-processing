function DrawTool(canvas) {

	this.canvas = canvas;
	var ctx = this.canvas.getContext("2d");

	var prevPoint = new Point(0, 0);
	var currPoint = new Point(0, 0);

	var strokeColor = '#ff0000';
	var lineWidth = 10; // or whatever

	function strokeLine(prevPt, curPt, ctx, lineWidth, strokeColor) {
		ctx.beginPath();
		ctx.moveTo(prevPt.x, prevPt.y);
		ctx.lineTo(curPt.x, curPt.y);
		ctx.strokeStyle = strokeColor;
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	}

	function mousemove(e) {
		if (!canvas.isDrawing) {
			return;
		}
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;

		currPoint = new Point(x, y);

		strokeLine(prevPoint, currPoint, ctx, lineWidth, strokeColor);
		prevPoint = currPoint;

	}
	function mouseup(e) {
		canvas.isDrawing = false;
	}
	function mousedown(e) {
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;
		prevPoint = new Point(x, y);
		bbp1 = new Point(x, y);
		canvas.isDrawing = true;
	}

	return {
		mousemove : mousemove,
		mouseup : mouseup,
		mousedown : mousedown
	}

}
