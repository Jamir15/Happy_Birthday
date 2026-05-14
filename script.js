const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
const celebrateBtn = document.getElementById("celebrateBtn");
const setupScreen = document.getElementById("setupScreen");
const celebrationScreen = document.getElementById("celebrationScreen");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const personName = document.getElementById("personName");

let confetti = [];
let width = 0;
let height = 0;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createConfettiPiece() {
  return {
    x: Math.random() * width,
    y: -20,
    size: Math.random() * 8 + 4,
    speedY: Math.random() * 2 + 1.5,
    speedX: Math.random() * 1.2 - 0.6,
    rotation: Math.random() * Math.PI,
    rotationSpeed: Math.random() * 0.16 - 0.08,
    color: `hsl(${Math.random() * 360}, 95%, 60%)`
  };
}

function burst(count = 140) {
  for (let i = 0; i < count; i += 1) {
    confetti.push(createConfettiPiece());
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  confetti.forEach((piece) => {
    piece.x += piece.speedX;
    piece.y += piece.speedY;
    piece.rotation += piece.rotationSpeed;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
    ctx.restore();
  });

  confetti = confetti.filter((piece) => piece.y < height + 24);
  requestAnimationFrame(draw);
}

celebrateBtn.addEventListener("click", () => burst(200));
nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredName = nameInput.value.trim();
  personName.textContent = enteredName || "Friend";
  setupScreen.classList.add("hidden");
  celebrationScreen.classList.remove("hidden");
  burst(220);
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
draw();
