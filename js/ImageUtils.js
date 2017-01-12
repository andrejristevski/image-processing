function ImageUtils() {

	function createTempCanvas(width, height) {
		var tempCanvas = document.createElement("canvas");
		var ctxv = tempCanvas.getContext("2d");
		return ctxv.createImageData(width, height);
	}

	/**
	 * Creates a 2d matrix of Pixels.
	 * 
	 * @param {Html5
	 *            canvas ImageData} pixels.
	 */
	function createImageMatrix(pixels) {

		var d = pixels.data;
		var w = pixels.width;
		var h = pixels.height;

		var rows = [];
		for (var i = 0; i < h; i++) {
			var row = [];
			for (var j = 0; j < w; j++) {
				var pixel = new Pixel(d[i * w * 4 + j * 4], d[i * w * 4 + j * 4
						+ 1], d[i * w * 4 + j * 4 + 2],
						d[i * w * 4 + j * 4 + 3])

				row.push(pixel);

			}
			rows.push(row);
		}
		return rows;
	}

	/**
	 * Creates an ImageData from 2d matrix of Pixels.
	 * 
	 * @param {Array
	 *            <Array<Pixel>>} rows. The 2d matrix that we are using to
	 *            construct ImageData
	 */
	function createPixelsfromMatrix(rows) {

		var w = rows[0].length;
		var h = rows.length;

		var imageData = createTempCanvas(w, h);
		var d = imageData.data;

		for (var i = 0; i < h; i++) {
			var row = rows[i];
			for (var j = 0; j < w; j++) {
				var pixel = row[j];

				imageData.data[((i * (imageData.width * 4)) + (j * 4))] = pixel.r;
				imageData.data[((i * (imageData.width * 4)) + (j * 4)) + 1] = pixel.g;
				imageData.data[((i * (imageData.width * 4)) + (j * 4)) + 2] = pixel.b;
				imageData.data[((i * (imageData.width * 4)) + (j * 4)) + 3] = pixel.a;
			}

		}

		return imageData;
	}

	return {
		createTempCanvas : createTempCanvas,
		createImageMatrix : createImageMatrix,
		createPixelsfromMatrix : createPixelsfromMatrix
	}

}