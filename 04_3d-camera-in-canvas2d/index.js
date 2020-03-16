//https://mattdesl.svbtle.com/bellwoods

// Third-party dependencies
const project = require("camera-project");
const { mat4 } = require("gl-matrix");

// Setup our 2D canvas
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

// Size properties
let width, height, pixelRatio;

// Animation properties
let raf;
let playing = false;
let lastTime;
let time = 0;

// 3D Camera properties
const fieldOfView = Math.PI / 4;
const up = [0, -1, 0];

// Our 3D vertex data, a 2D square
const vertices = [
  [-0.5, 0, -0.5],
  [0.5, 0, -0.5],
  [0.5, 0, 0.5],
  [-0.5, 0, 0.5]
];

// Resizing the canvas
function resize() {
  pixelRatio = window.devicePixelRatio;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
}

// Animation loop
function animate() {
  if (!playing) return;
  raf = requestAnimationFrame(animate);
  const now = Date.now();
  const delta = (now - lastTime) / 1000;
  time += delta;
  lastTime = now;
  render(time);
}

// Render the frame with retina scaling
function render(time = 0) {
  context.save();
  context.scale(pixelRatio, pixelRatio);
  draw(time);
  context.restore();
}

// Submit the Canvas2D draw calls
function draw(time = 0) {
  // Clear buffer
  context.clearRect(0, 0, width, height);

  // Fill with background color
  context.fillStyle = "#E09992";
  context.fillRect(0, 0, width, height);
  context.fillStyle = context.strokeStyle = "white";

  // Orbit around the center with some variance
  const angle = time * 0.5 + Math.PI / 4;
  const orbitDistance = 2 + Math.sin(time * 0.5) * 0.25;
  const cx = Math.cos(angle) * orbitDistance;
  const cz = Math.sin(angle) * orbitDistance;
  const cy = 2 + Math.sin(time) * 1;

  // 3D Camera position
  const position = [cx, cy, cz];

  // Camera always looks toward world center
  const target = [0, 0, 0];

  // Create a projection matrix for perspective
  const projection = mat4.perspective(
    [],
    fieldOfView,
    width / height,
    0.001,
    100
  );

  // Define a viewport of the window
  const viewport = [0, 0, width, height];

  // Create a view matrix from the camera transformation
  const view = mat4.lookAt([], position, target, up);

  // Combine these for 3D to 2D conversion
  const projView = mat4.multiply([], projection, view);

  // Convert 3D vertices to 2D screen space points
  const points = vertices.map(p => {
    return project([], p, viewport, projView);
  });

  // Draw an outline around the points
  context.beginPath();
  points.forEach(([x, y]) => context.lineTo(x, y));
  context.closePath();
  context.stroke();

  // Render circles at each vertex
  points.forEach(point => {
    const [x, y] = point;
    context.beginPath();
    context.arc(x, y, 2, 0, Math.PI * 2, false);
    context.fill();
  });

  // Project a little "dot" floating above the center
  const [x, y] = project([], [0, 0.35, 0], viewport, projView);
  context.beginPath();
  context.arc(x, y, 4, 0, Math.PI * 2, false);
  context.fill();
}

// Resize initially and draw first frame
resize();
render();

// Handle interactions
const el = document.querySelector("#text");
const cover = document.querySelector("#cover");

const update = () => {
  cover.style.display = playing ? "none" : "";
  el.style.display = playing ? "none" : "";
};

const start = ev => {
  // ev.preventDefault();
  if (!playing) {
    playing = true;
    lastTime = Date.now();
    animate();
  }
  update();
};

const stop = ev => {
  // ev.preventDefault();
  if (playing) {
    playing = false;
    cancelAnimationFrame(raf);
  }
  update();
};

update();

window.addEventListener("mousedown", start, { passive: false });
window.addEventListener("touchstart", start, { passive: false });
window.addEventListener("mouseup", stop, { passive: false });
window.addEventListener("touchend", stop, { passive: false });

// Avoid iOS drag events
// document.addEventListener("touchmove", ev => ev.preventDefault(), {
//   passive: false
// });
