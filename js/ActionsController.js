function ActionsController(modelState) {

	function changedRad() {

		if (document.getElementById('drawRad').checked) {
			Globals.selectedTool = ToolsPalette.DrawTool;
		}

		if (document.getElementById('cropRad').checked) {
			Globals.selectedTool = ToolsPalette.CroppingTool;
		}

		if (document.getElementById('neitherRad').checked) {
			Globals.selectedTool = ToolsPalette.NoTool;
		}

		if (document.getElementById('blurRad').checked) {
			Globals.selectedTool = ToolsPalette.BlurTool;
		}

	}

	function saveLocaly() {

		var canvas = modelState.getOutputCanvas();
		var dataURL = canvas.toDataURL('image/png').replace("image/png",
				"image/octet-stream");
		;
		window.location.href = dataURL;

	}

	function sliderChanged(val) {

		var sliderValueLabel = document.getElementById('sliderValueLabel');
		sliderValueLabel.value = val;
		modelState.setSliderValue(val);
	}

	function initRotation() {
		modelState.rotateOutputCanvas();
	}

	function redrawFirst() {
		var outputImageData = modelState.getOutputCanvasImageData();
		modelState.putInputCanvasImageData(outputImageData, 0, 0);
	}

	function saveCanvas() {
		modelState.saveBackupImageData();
	}

	function restoreCanvas() {
		modelState.restoreBackupImageData();
	}

	function transformCanvasContex(transformation, args) {

		var inputImageData = modelState.getInputCanvasImageData();
		var rows = imageUtils.createImageMatrix(inputImageData);

		var transformedRows = transformation.call(null,rows, args);

		var imgData = imageUtils.createPixelsfromMatrix(transformedRows);
		modelState.putOutputCanvasImageData(imgData, 0, 0);

	}

	function revertImage() {
		modelState.revertImage();
	}
	function crop() {
		tools.cropAndUpdate();
	}
	function blurRegion(filter, kernel, imageUtils) {
		tools.applyBlurring(filter, kernel, imageUtils);
	}

	return {
		restoreCanvas : restoreCanvas,
		saveCanvas : saveCanvas,
		redrawFirst : redrawFirst,
		initRotation : initRotation,
		sliderChanged : sliderChanged,
		saveLocaly : saveLocaly,
		revertImage : revertImage,
		changedRad : changedRad,
		blurImage : blurImage,
		transformCanvasContex : transformCanvasContex,
		crop : crop,
		blurRegion : blurRegion
	}

}