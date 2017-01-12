function Filters() {

	/**
	 * Returns a pixel with values for the r,g and b channels as the average
	 * from the surrounding pixels.
	 * 
	 * @param {Array
	 *            <Array<Pixel>>}. The image as 2d matrix of pixels
	 * @param {Integer}
	 *            i. The position of the pixel in the image
	 * @param {Integer}
	 *            j. The position of the pixel in the image
	 * @param {Array
	 *            <Array<Number>>} kernel. The kernel used for convoluting the
	 *            image.
	 */
	function getAverageFromPixels(img, i, j, kernel) {

		var imgheight = img.length;
		var imgWidth = img[0].length;

		var kernelHeight = kernel.length;
		var kernelWidth = kernel[0].length;

		var conMatCenter = Math.floor(kernelHeight / 2);

		var r = 0;
		var g = 0;
		var b = 0;
		var a = 0;

		for (var k = 0; k < kernelHeight; k++) {
			for (var z = 0; z < kernelWidth; z++) {

				if (i - conMatCenter >= 0 && j - conMatCenter >= 0
						&& i + conMatCenter <= imgheight
						&& j + conMatCenter <= imgWidth) {

					var w = kernel[k][z];
					r += w * img[i - conMatCenter + k][j - conMatCenter + z].r;
					g += w * img[i - conMatCenter + k][j - conMatCenter + z].g;
					b += w * img[i - conMatCenter + k][j - conMatCenter + z].b;
					a += w * img[i - conMatCenter + k][j - conMatCenter + z].a;
				} else {
					return img[i][j];
				}
			}
		}

		var pixel = new Pixel(r, g, b, a);

		var bp = 0;
		return pixel;
	}
	/**
	 * Negates a pixel.
	 * 
	 * @param {Pixel}
	 *            pixel.
	 */
	function negatePixel(pixel) {

		return new Pixel(255 - pixel.r, 255 - pixel.g, 255 - pixel.b, pixel.a);

	}

	function negate(img) {

		var imgheight = img.length;
		var imgWidth = img[0].length;

		var rows = [];
		for (var i = 0; i < imgheight; i++) {

			var row = [];
			for (var j = 0; j < imgWidth; j++) {
				var pixel = negatePixel(img[i][j]);
				row.push(pixel);
			}
			rows.push(row);
		}
		return rows;
	}

	/**
	 * Applies a convolution on an image
	 * 
	 * @param {Array
	 *            <Array<Pixel>>} img. The image used that we are applying
	 *            kernel on to.
	 * @param {Array
	 *            <Array<Number>>} kernel. The kernel used for the convolution.
	 */
	function convolute(img, kernel) {

		var imgheight = img.length;
		var imgWidth = img[0].length;

		var kernelHeight = kernel.length;
		var kernelWidth = kernel[0].length;
		var conMatCenter = Math.floor(kernelHeight / 2);

		var rows = [];
		for (var i = 0; i < imgheight - conMatCenter; i++) {
			var row = [];
			for (var j = 0; j < imgWidth - conMatCenter; j++) {
				var pixel = getAverageFromPixels(img, i, j, kernel);
				row.push(pixel);
			}
			rows.push(row);
		}
		return rows;
	}
	/**
	 * Returns greyScale image.
	 * 
	 * @param {Array
	 *            <Array<Pixel>>} img. The image that we are graying out.
	 */
	function greyScaleImage(img) {
		var imgheight = img.length;
		var imgWidth = img[0].length;

		var rows = [];
		for (var i = 0; i < imgheight; i++) {

			var row = [];
			for (var j = 0; j < imgWidth; j++) {
				var pixel = getGreyPixel(img[i][j]);
				row.push(pixel);
			}
			rows.push(row);
		}
		return rows;

	}
	/**
	 * Returns gray pixel
	 * 
	 * @param {Pixel}
	 *            pixel.
	 */
	function getGreyPixel(pixel) {
		var v = 0.2126 * pixel.r + 0.7152 * pixel.g + 0.0722 * pixel.b;
		return new Pixel(v, v, v, pixel.a);
	}

	/**
	 * Returns contrasted image.
	 * 
	 * @param {Array
	 *            <Array<Pixel>>} img. The image that we are applying contrast
	 *            onto.
	 * @param {Number}
	 *            c . The value of the contrast.
	 */
	function contrastImage(img, c) {
		var imgheight = img.length;
		var imgWidth = img[0].length;

		// TODO just trial and error
		c = c / 1.3;

		var f = (259 * (c + 255)) / (255 * (259 - c));

		var rows = [];
		for (var i = 0; i < imgheight; i++) {

			var row = [];
			for (var j = 0; j < imgWidth; j++) {
				var pixel = getContrastedPixel(img[i][j], f);
				row.push(pixel);
			}
			rows.push(row);
		}
		return rows;
	}

	/**
	 * Returns new pixel with applyied contrast.
	 */
	function getContrastedPixel(pixel, f) {

		var r = f * (pixel.r - 128) + 128;
		var g = f * (pixel.g - 128) + 128;
		var b = f * (pixel.b - 128) + 128;
		var a = pixel.a;

		return new Pixel(r, g, b, a);
	}

	/**
	 * Changes the brightness of a pixel.
	 */
	function getChangedBrightnessPixel(pixel, val) {
		var r = pixel.r + val;
		var g = pixel.g + val;
		var b = pixel.b + val;
		var a = pixel.a;

		return new Pixel(r, g, b, a);
	}
	/**
	 * Changes the brightness of an image.
	 */
	function changeBrighntness(img, val) {

		var imgheight = img.length;
		var imgWidth = img[0].length;

		var rows = [];
		for (var i = 0; i < imgheight; i++) {

			var row = [];
			for (var j = 0; j < imgWidth; j++) {
				var pixel = getChangedBrightnessPixel(img[i][j], val);
				row.push(pixel);
			}
			rows.push(row);
		}
		return rows;

	}

	/**
	 * Decreases brightness of an image
	 */
	function decreaseBrightness(img, val) {
		return changeBrighntness(img, val * -1);
	}

	/**
	 * Increases brightness of an image
	 */
	function increaseBrightness(img, val) {
		return changeBrighntness(img, val);
	}

	return {
		convolute : convolute,
		negateImage : negate,
		greyScaleImage : greyScaleImage,
		contrastImage : contrastImage,
		increaseBrightness : increaseBrightness,
		decreaseBrightness : decreaseBrightness
	}

}
