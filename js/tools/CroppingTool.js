function CroppingTool(canvas) {

	this.canvas = canvas;
	var ctx = this.canvas.getContext("2d");

	var prevPoint = new Point(0, 0);
	var currPoint = new Point(0, 0);

	var bbp1 = new Point(0, 0);

	var boundingBox = null;
	var boundingBoxColor = '#ff0000';
	var backgroundImage = null;
	var croppingRect;

	/**
	 * Draws a bounding box given start and end point.
	 */
	function drawBoundingBox(p1, p2) {

		boundingBox.remove();

		var w = p2.x - p1.x;
		var h = p2.y - p1.y;

		boundingBox = new paper.Path.Rectangle(p1.x, p1.y, w, h);
		croppingRect = new paper.Path.Rectangle(p1.x, p1.y, w, h);
		boundingBox.strokeColor = boundingBoxColor;

	}

	/**
	 * Adds an image to canvas. This image is used as background image .
	 */
	function addImageToCanvas() {

		if (backgroundImage == null) {

			backgroundImage = new Image(Globals.canvasHeight,
					Globals.canvasWidth);
			backgroundImage.src = canvas.toDataURL('image/png').replace(
					"image/png", "image/octet-stream");
			backgroundImage.onload = function() {
				var raster = new paper.Raster(backgroundImage, new paper.Point(
						canvas.width / 2, canvas.height / 2));
			}
		} else {
			var raster = new paper.Raster(backgroundImage, new paper.Point(
					canvas.width / 2, canvas.height / 2));
		}

	}

	/**
	 * Crops the part that is encapsulated by the cropping rectangle and draws
	 * it on the canvas
	 */
	function cropAndUpdate() {

		var bounds = croppingRect.bounds;
		ctx.drawImage(backgroundImage, bounds.x, bounds.y, bounds.width,
				bounds.height, 0, 0, canvas.width, canvas.height);
		backgroundImage = null;

	}
	/**
	 * Crops the part that is encapsulated by the cropping rectangle and returns
	 * the data.
	 */
	function crop() {

		var bounds = croppingRect.bounds;
		nullifyImage();
		return ctx
				.getImageData(bounds.x, bounds.y, bounds.width, bounds.height);

	}

	/**
	 * Nullifies the background image.
	 */
	function nullifyImage() {
		backgroundImage = null;
	}

	function mousemove(e) {
		if (!canvas.isDrawing) {
			return;
		}
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;

		currPoint = new Point(x, y);
		drawBoundingBox(bbp1, currPoint);

	}

	function mouseup(e) {
		canvas.isDrawing = false;
		var bp = 0;
	}

	function mousedown(e) {

		canvas.isDrawing = true;
		if (boundingBox) {
			boundingBox.remove();
		}
		addImageToCanvas();

		boundingBox = new paper.Path.Rectangle(0, 0, 0, 0);
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;
		prevPoint = new Point(x, y);
		bbp1 = new Point(x, y);
	}

	/**
	 * Returns the cropping rectangle information
	 */
	function getCroppingRect() {
		var bounds = croppingRect.bounds;

		return {
			x : bounds.x,
			y : bounds.y,
			w : bounds.width,
			h : bounds.height
		};
	}

	return {
		mousemove : mousemove,
		mouseup : mouseup,
		mousedown : mousedown,
		crop : crop,
		cropAndUpdate : cropAndUpdate,
		getCroppingRect : getCroppingRect,
		nullifyImage : nullifyImage
	}

}
