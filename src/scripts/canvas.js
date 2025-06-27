const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particelsArray;

export let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

window.addEventListener("mousemove", (dets) => {
  mouse.x = dets.x;
  mouse.y = dets.y;
});

// Create particles
class Particles {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // method to draw individual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }

  // check particle position , check mouse position, move the particle, draw the particle
  update() {
    // if particle is still within canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // check collision detection  - mouse position / particle position
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + this.size) {
      // Prevent particles from leaving the canvas
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;

    //  draw
    this.draw();
  }
}

function init() {
  particelsArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = "#ffffff";

    particelsArray.push(
      new Particles(x, y, directionX, directionY, size, color)
    );
  }
}

function connect() {
  let opacityvalue = 1;
  for (let a = 0; a < particelsArray.length; a++) {
    for (let b = a; b < particelsArray.length; b++) {
      let distance =
        (particelsArray[a].x - particelsArray[b].x) *
          (particelsArray[a].x - particelsArray[b].x) +
        (particelsArray[a].y - particelsArray[b].y) *
          (particelsArray[a].y - particelsArray[b].y);
      if (distance < (canvas.width / 8) * (canvas.height / 8)) {
        opacityvalue = 1 - distance / 20000;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacityvalue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particelsArray[a].x, particelsArray[a].y);
        ctx.lineTo(particelsArray[b].x, particelsArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particelsArray.length; i++) {
    particelsArray[i].update();
  }
  connect();
}

window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});

init();
animate();

// Fractal

let canvas2 = document.querySelector("#canvas2");
let ctx2 = canvas2.getContext("2d");
let flowAnimation;
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

class Fractal {
  #ctx;
  #width;
  #height;
  #size;
  #maxLevel;
  #branches;
  #sides;
  #spread;
  #scale;
  #color;
  #lineWidth;
  #length;
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#height = height;
    this.#width = width;
    this.#ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    this.#ctx.shadowOffsetX = 10; // Horizontal shadow offset
    this.#ctx.shadowOffsetY = 5; // Vertical shadow offset
    this.#ctx.shadowBlur = 20; // Add shadow blur for a glowing effect
    // Initialize animation properties
    this.lastTime = 0;
    this.timer = 0;
    this.interval = 1000 / 60; // ~60 FPS
    this.#initializeDefault();
    this.valueSpread = 0.01;
    this.valueScale = 0.01;
    this.valuelineWidth = 0.2; // Set to a small non-zero value for smooth animation
    this.#drawFractal();
  
    
  }

  #initializeDefault() {
    this.#size =
      canvas2.width < canvas2.height
        ? canvas2.width * 0.3
        : canvas2.height * 0.3;
    this.#maxLevel = 3;
    this.#branches = 2;
    this.#sides = 5;
    this.#spread = 0.5;
    this.#scale = 0.5;
    this.#color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.#lineWidth = Math.random() * 30 + 5;
    this.#ctx.strokeStyle = this.#color;
    this.#length = 10;
  }

  #drawBranch(level) {
    if (level > this.#maxLevel) return;
    this.#ctx.beginPath();
    this.#ctx.moveTo(0, 0);
    this.#ctx.lineTo(this.#size, 0);
    this.#ctx.stroke();

    for (let i = 0; i < this.#branches; i++) {
      this.#ctx.save();
      this.#ctx.translate(this.#size - (this.#size / this.#branches) * i, 0);
      this.#ctx.scale(this.#scale, this.#scale);

      this.#ctx.save();
      this.#ctx.rotate(this.#spread);
      this.#drawBranch(level + 1);
      this.#ctx.restore();

      this.#ctx.save();
      this.#ctx.rotate(-this.#spread);
      this.#drawBranch(level + 1);
      this.#ctx.restore();

      this.#ctx.restore();
    }
  }

  #drawFractal() {
    this.#ctx.save();
    this.#ctx.lineWidth = this.#lineWidth;
    this.#ctx.length = this.#length;
    this.#ctx.translate(this.#width / 2, this.#height / 2);
    for (let i = 0; i < this.#sides; i++) {
      this.#ctx.rotate((Math.PI * 2) / this.#sides);
      this.#drawBranch(0);
    }
    this.#ctx.restore();
  }

  /**
   * Animates the fractal by updating its properties and redrawing it at each animation frame.
   * @param {number} timestamp - The current time in milliseconds provided by requestAnimationFrame.
   */
  animate(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.timer += deltaTime;
    let needsRedraw = false;
    while (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      this.#spread += this.valueSpread;
      // this.#lineWidth += this.valuelineWidth;
      // Smoothly increase or decrease scale within [0.3, 0.6] at a consistent speed
      this.#scale += this.valueScale;
      if (this.#scale >= 0.6) {
        this.#scale = 0.6;
        this.valueScale *= -.5;
        needsRedraw = true;
      }
      if (this.#scale <= 0.3) {
        this.#scale = 0.3;
        this.valueScale *= -.5;
        needsRedraw = true;
      }
      needsRedraw = true;
      this.timer -= this.interval;
    }
    if (needsRedraw) {
      this.#drawFractal();
    }
    flowAnimation = requestAnimationFrame(this.animate.bind(this));
  }

  // Getter for spread
  get getSpread() {
    return this.#spread;
  }

  // Getter for sides
  get getSides() {
    return this.#sides;
  }
  // Getter for lineWisth
  get getLineWidth() {
    return this.#lineWidth;
  }


  setRandomFractal() {
    if (typeof flowAnimation !== "undefined") {
      cancelAnimationFrame(flowAnimation);
    }
    this.#sides = Math.floor(Math.random() * 7 + 2);
    this.#spread = Math.random() - 0.5;
    this.#scale = Math.random() * 2.9 + 0.1;
    this.#color = `hsl(${Math.random() * 360}, 100%, 50%)`;
     this.#ctx.strokeStyle = this.#color;
    this.#length = Math.random() * 30 + 5;
    this.#drawFractal();
    this.animate(0);
  }

  reset() {
    if (typeof flowAnimation !== "undefined") {
      cancelAnimationFrame(flowAnimation);
    }
    this.#initializeDefault();
    this.#drawFractal();
    this.animate(0);
  }
  

  spread(value) {
    this.#spread = value;
    this.#drawFractal();
  }
  sides(value) {
    this.#sides = value;
    this.#drawFractal();
  }
  maxLevel(value) {
    this.#maxLevel = value;
    this.#drawFractal();
  }
  branches(value) {
    this.#branches = value;
    this.#drawFractal();
  }
  lineWidth(value) {
    this.#lineWidth = value;
    this.#drawFractal();
  }
}

let fractal;
// DOM Elements
const randomBtn = document.querySelector(".random-btn");
const slideSpread = document.querySelector("#spread");
const labelSpread = document.querySelector('[for="spread"]');
const slideSide = document.querySelector("#sides");
const labelSide = document.querySelector('[for="sides"]');
const slideLineWidth = document.querySelector("#lineWidth");
const labelLineWidth = document.querySelector('[for="lineWidth"]');
const resetBtn = document.querySelector(".reset-btn");

window.onload = function () {
  fractal = new Fractal(ctx2, canvas2.width, canvas2.height);
  fractal.animate(0);
  updateSliders();
};

// Update Sliders and Labels
function updateSliders() {
  console.log("im working");

  slideSpread.value = fractal.spread;
  labelSpread.innerHTML = `Spread: ${Number(fractal.getSpread).toFixed(1)}`;

  slideSide.value = fractal.sides; // Access through the getter
  labelSide.innerHTML = `Sides: ${fractal.getSides}`;
  slideLineWidth.value = fractal.lineWidth; // Access through the getter
  labelLineWidth.innerHTML = `Line Width: ${(fractal.getLineWidth).toFixed(0)}`;

  console.log("range values", {
    input: slideSide.value,
    sideLabel: labelSide.innerHTML,
    input2: slideSpread.value,
    spreadLabel: labelSpread.innerHTML,
  });
}

slideSpread.addEventListener("change", (e) => {
  fractal.spread(Number(e.target.value));
  updateSliders();
});

slideSide.addEventListener("change", (e) => {
  fractal.sides(Number(e.target.value));
  updateSliders();
});
slideLineWidth.addEventListener("change", (e) => {
  fractal.lineWidth(Number(e.target.value));
  updateSliders();
});


randomBtn.addEventListener("click", () => {
  fractal.setRandomFractal();
  updateSliders();
});

resetBtn.addEventListener("click", () => {
  fractal.reset();
  updateSliders();
});

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.height / 80);
  init();
  fractal = new Fractal(ctx2, canvas2.width, canvas2.height);
  fractal.animate(0);
});


