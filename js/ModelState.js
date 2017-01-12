function ModelState(c, c2) {

	var canvasWidth = Globals.canvasWidth || 200;
	var canvasHeight = Globals.canvasHeight || 200;
	var sliderValue = 0;
	var ctx = c.getContext("2d");
	var sctx = c2.getContext("2d");
	var savedImageData;
	var initialImg;

	function getInputCanvasImageData() {
		return ctx.getImageData(0, 0, canvasHeight, canvasWidth);
	}

	function getOutputCanvasImageData() {
		return sctx.getImageData(0, 0, canvasHeight, canvasWidth);
	}

	function putInputCanvasImageData(imgData, x, y) {
		ctx.putImageData(imgData, x, y);
	}

	function putOutputCanvasImageData(imgData, x, y) {
		sctx.putImageData(imgData, x, y);
	}

	function getSliderValue() {
		return sliderValue;
	}
	function setSliderValue(val) {

		if (typeof val === 'string') {
			sliderValue = parseInt(val);
		} else {

			sliderValue = val;
		}
	}

	function clearInputRect() {

	}
	function clearOutputRect() {
		sctx.clearRect(0, 0, canvasHeight, canvasWidth);
	}

	function saveBackupImageData() {
		savedImageData = sctx.getImageData(0, 0, canvasHeight, canvasWidth);
	}

	function restoreBackupImageData() {
		if (savedImageData && sctx) {
			sctx.clearRect(0, 0, canvasHeight, canvasWidth);
			sctx.putImageData(savedImageData, 0, 0);
		}
	}

	function getInputCanvas() {
		return c;
	}

	function getOutputCanvas() {
		return c2;
	}

	function rotateOutputCanvas() {
		sctx.save();
		sctx.clearRect(0, 0, canvasHeight, canvasWidth);
		sctx.translate(canvasHeight / 2, canvasWidth / 2);
		sctx.rotate(sliderValue * (Math.PI / 180));
		sctx.translate(-canvasHeight / 2, -canvasWidth / 2); //
		sctx.drawImage(c, 0, 0, canvasHeight, canvasWidth);
		sctx.restore();
	}

	function revertImage() {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvasHeight, canvasWidth);
		ctx.drawImage(initialImg, 0, 0, canvasHeight, canvasWidth);
	}
	function setInitialImg(img) {
		initialImg = img;
	}
	return {
		getInputCanvasImageData : getInputCanvasImageData,
		getOutputCanvasImageData : getOutputCanvasImageData,
		putInputCanvasImageData : putInputCanvasImageData,
		putOutputCanvasImageData : putOutputCanvasImageData,
		getSliderValue : getSliderValue,
		setSliderValue : setSliderValue,
		clearInputRect : clearInputRect,
		clearOutputRect : clearOutputRect,
		saveBackupImageData : saveBackupImageData,
		restoreBackupImageData : restoreBackupImageData,
		getInputCanvas : getInputCanvas,
		getOutputCanvas : getOutputCanvas,
		rotateOutputCanvas : rotateOutputCanvas,
		revertImage : revertImage,
		setInitialImg : setInitialImg
	}

}