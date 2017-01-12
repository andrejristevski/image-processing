function Pixel(r, g, b, a) {

	this.r = getValidPixelValue(r);
	this.g = getValidPixelValue(g);
	this.b = getValidPixelValue(b);
	this.a = a;
}
/**
 * Truncates the number to the interval from 0-255
 * 
 * @param val.
 *            The input value.
 * @returns {Number}. The truncated value.
 */
function getValidPixelValue(val) {

	if (val < 0) {
		val = 0;
	}
	if (val > 255) {
		val = 255;
	}
	return val;
}