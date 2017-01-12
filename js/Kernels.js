
Kernels = {}

var AverageBlur49 = [];
var r1 = [ 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49 ];
var r2 = [ 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49 ];
var r3 = [ 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49 ];
var r4 = [ 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49 ];
var r5 = [ 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49 ];
var r6 = [ 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49 ];
var r7 = [ 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49, 1 / 49 ];
AverageBlur49.push(r1);
AverageBlur49.push(r2);
AverageBlur49.push(r3);
AverageBlur49.push(r4);
AverageBlur49.push(r5);
AverageBlur49.push(r6);
AverageBlur49.push(r7);

var sharpenKernel = [];
var r1 = [ 0, -1, 0 ];
var r2 = [ -1, 5, -1 ];
var r3 = [ 0, -1, 0 ];
sharpenKernel.push(r1);
sharpenKernel.push(r2);
sharpenKernel.push(r3);

// small blur
var blur3by3 = [];
var r1 = [ 1 / 9, 1 / 9, 1 / 9 ];
var r2 = [ 1 / 9, 1 / 9, 1 / 9 ];
var r3 = [ 1 / 9, 1 / 9, 1 / 9 ];
blur3by3.push(r1);
blur3by3.push(r2);
blur3by3.push(r3);

// 7*7 average blur
Kernels.AverageBlur49 = AverageBlur49;

// SharpenKernel
Kernels.sharpenKernel = sharpenKernel;

// 3*3 blur average
Kernels.blur3by3 = blur3by3;