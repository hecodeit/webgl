//https://generativeartistry.com/tutorials/tiled-lines/

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

var size = 640;
var step = 20;

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

resize ();

// function draw(x, y, width, height){
//   context.moveTo(x, y);
//   context.lineTo(x + width, y + height);
//   context.stroke();
// }

function draw(x, y, width, height) {
  var leftToRight = Math.random() >= 0.5;

  if(leftToRight) {
    context.moveTo(x, y);
    context.lineTo(x + width, y + height);
  } else {
    context.moveTo(x + width, y);
    context.lineTo(x, y + height);
  }

  context.stroke();
}
// draw(0, 0, size, size);


for(var x = 0; x < size; x += step) {
  for(var y = 0; y < size; y+= step) {
    draw(x, y, step, step);
  }
}
