function BlurTool(canvas, croppingTool) {

	this.canvas = canvas;
	var ctx = this.canvas.getContext("2d");

	/**
	 * Applies blurring to a part of the canvas.
	 * 
	 * @param {Object}
	 *            filter. Object used for convolution over the image.
	 * @param {Matrix}
	 *            kernel. Kernel used for convoluting.
	 * @param {ImageUtils}
	 *            imageUtils. Used for transforming the images from ImageData to
	 *            matrix of pixels.
	 */
	function blur(filter, kernel, imageUtils) {

		var pixels = croppingTool.crop();

		var rows = imageUtils.createImageMatrix(pixels);

		var transformedRows = filter.convolute(rows, kernel);
		var imgData = imageUtils.createPixelsfromMatrix(transformedRows);

		var cropRect = croppingTool.getCroppingRect();
		ctx.putImageData(imgData, cropRect.x, cropRect.y);
	}

	function mousemove(e) {
		croppingTool.mousemove(e);
	}

	function mouseup(e) {
		croppingTool.mouseup(e);
	}

	function mousedown(e) {
		croppingTool.mousedown(e);

	}

	return {
		mousemove : mousemove,
		mouseup : mouseup,
		mousedown : mousedown,
		blur : blur
	}

}
