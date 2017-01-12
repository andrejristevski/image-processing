var imageUtils;
var filters;
var imgImageData;
var tools;
var actionsController;
var modelState;

function init() {

	var img = new Image();

	img.src = "images/desert.png";
	img.id = 'main';

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	var c2 = document.getElementById("secondCanvas");
	var sctx = c2.getContext("2d");

	tools = new Tools(c2);
	imageUtils = new ImageUtils();
	filters = new Filters();

	modelState = new ModelState(c, c2);
	actionsController = new ActionsController(modelState);

	img.onload = function() {
		ctx.drawImage(img, 0, 0, Globals.canvasHeight, Globals.canvasWidth);
		imgImageData = ctx.getImageData(0, 0, Globals.canvasHeight,
				Globals.canvasWidth);
		modelState.setInitialImg(img);
	}

}

function blurImage() {
	actionsController.transformCanvasContex(filters.convolute,
			Kernels.AverageBlur49);
}

function negateImage() {
	actionsController.transformCanvasContex(filters.negateImage);
}

function greyScaleImage() {
	actionsController.transformCanvasContex(filters.greyScaleImage);
}

function changedRad() {
	actionsController.changedRad();
}

function revertImage() {
	actionsController.revertImage();
}

function saveLocaly() {
	actionsController.saveLocaly();
}

function sliderChanged(val) {
	actionsController.sliderChanged(val);
}

function initRotation() {
	actionsController.initRotation();
}

function redrawFirst() {
	actionsController.redrawFirst();
}

function saveCanvas() {
	actionsController.saveCanvas();
}

function restoreCanvas() {
	actionsController.restoreCanvas();
}

function contrastImage() {
	actionsController.transformCanvasContex(filters.contrastImage, modelState
			.getSliderValue());
}

function increaseBrightness() {
	actionsController.transformCanvasContex(filters.increaseBrightness,
			modelState.getSliderValue());
}

function decreaseBrightness() {
	actionsController.transformCanvasContex(filters.decreaseBrightness,
			modelState.getSliderValue());
}

function sharpenImage() {
	actionsController.transformCanvasContex(filters.convolute,
			Kernels.sharpenKernel);

}

function applyTool() {
	if (Globals.selectedTool == ToolsPalette.CroppingTool) {
		actionsController.crop();
	}
	if (Globals.selectedTool == ToolsPalette.BlurTool) {
		actionsController
				.blurRegion(filters, Kernels.AverageBlur49, imageUtils);
	}
}

function twoArgumentFunc() {
	actionsController.transformCanvasContex(two, "asd","asdasd");
}

function oneArgumentFunc() {
	actionsController.transformCanvasContex(one, "eden");
}

function one(first) {
	console.log(first);

}

function two(args) {
	console.log(args);
}
