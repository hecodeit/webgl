// https://generativeartistry.com/tutorials/joy-division/
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

var size = 640;
var width, height, pixelRatio;

function resize () {
  width = size;
  height = size;
  pixelRatio = window.devicePixelRatio;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = width+'px';
  canvas.style.height = height+'px';
}

resize();

var step = 30;
var lines = [];
context.lineWidth = 2;
for(var i=0; i< canvas.width; i+=step){
  var line = [];
  for(var j=0; j<canvas.height; j+=step){
    var distanceToCenter = Math.abs(j - canvas.height / 2);
    var variance = Math.max(canvas.height / 2 - 50 - distanceToCenter, 0);
    var random = Math.random() * variance / 6 * -1;
    var point = {x: j, y: i + random};
    line.push(point);
  }
  lines.push(line);
}

// Do the drawing
for(var i = 5; i < lines.length; i++) {

  context.beginPath();
  context.moveTo(lines[i][0].x, lines[i][0].y);

  for(var j = 0; j < lines[i].length - 2; j++) {
    var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
    var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
    context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
  }

  context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.fill();
  context.restore();
  context.stroke();
}
