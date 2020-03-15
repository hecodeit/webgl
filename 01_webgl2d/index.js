const foo = () => 'hello world';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
document.body.appendChild(canvas);

let width, height, pixelRatio;

function resize () {
  width = 256;
  height = 256;
  pixelRatio = window.devicePixelRatio;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

function draw () {
  context.save();
  context.scale(pixelRatio, pixelRatio);

  context.fillStyle = 'tomato';
  context.fillRect(0, 0, width, height);
  context.fillStyle = 'orange';
  context.fillRect(50, 100, 50, 25);

  context.fillStyle = 'red';
  context.beginPath();
  context.arc(150, 150, 50, 0, Math.PI * 2);
  context.fill();

  context.restore();
}

resize();
draw();
