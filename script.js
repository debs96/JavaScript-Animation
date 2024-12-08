let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

let settingsButtons = document.getElementsByClassName("settings-buttons");
let text = document.getElementById("welcomeText");
let balls = [];

/* Make buttons disappear */
for (let i = 0; i <= 2; i++) {
  if (settingsButtons[i]) {
    settingsButtons[i].style.opacity = 0;
  }
}

function buttons() {
  for (let i = 0; i <= 2; i++) {
    if (settingsButtons[i]) {
      settingsButtons[i].style.opacity = 1;
    }
  }
}

/* Make text disappear */
function textDisappear() {
  text.style.opacity = 0;
}

/* Create ball */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.speedX = -ball.speedX;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.speedY = -ball.speedY;
    }
  }

  requestAnimationFrame(draw);
}

let ballButton = document.getElementById("addBall");

ballButton.addEventListener("click", function () {
  buttons();
  textDisappear();
  addBall();
});

/* Add Ball Button */
function addBall() {
  let ballX = Math.random() * (canvas.width - 500) + 500;
  let ballY = Math.random() * (canvas.height - 500) + 500;
  let speed = 2;

  if (ballX >= canvas.width - 150) {
    ballX -= canvas.width / 2;
  }
  if (ballX <= 0) {
    ballX += canvas.width / 2;
  }

  if (ballY >= canvas.height - 150) {
    ballY -= canvas.height / 2;
  }
  if (ballY <= 0) {
    ballY += canvas.height / 2;
  }

  let speedX;
  if (Math.random() < 0.5) {
    speedX = -speed;
  } else {
    speedX = speed;
  }

  let speedY;
  if (Math.random() < 0.5) {
    speedY = -speed;
  } else {
    speedY = speed;
  }

  let radius = 25;
  let color = getRandomColor();

  balls.push({
    x: ballX,
    y: ballY,
    speedX: speedX,
    speedY: speedY,
    radius: radius,
    color: color,
  });

  if (balls.length === 1) {
    draw();
  }
}

// Generate a random color
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

/* Change Speed */
let increaseSpeed = document.getElementById("increaseSpeed");
let decreaseSpeed = document.getElementById("decreaseSpeed");

increaseSpeed.addEventListener("click", function () {
  for (let i = 0; i < balls.length; i++) {
    balls[i].speedX *= 2;
    balls[i].speedY *= 2;
  }
});

decreaseSpeed.addEventListener("click", function () {
  for (let i = 0; i < balls.length; i++) {
    balls[i].speedX /= 2;
    balls[i].speedY /= 2;
  }
});

/* Change Size */
let increaseSize = document.getElementById("increaseSize");
let decreaseSize = document.getElementById("decreaseSize");

increaseSize.addEventListener("click", function () {
  for (let i = 0; i < balls.length; i++) {
    balls[i].radius += 5;
  }
});

decreaseSize.addEventListener("click", function () {
  for (let i = 0; i < balls.length; i++) {
    balls[i].radius -= 5;
  }
});

/* Reset Button */
let resetButton = document.getElementById("reset");

resetButton.addEventListener("click", function () {
  resetCanvas();
});

function resetCanvas() {
  balls = [];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
