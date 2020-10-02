const width = 16;
const positions = document.querySelectorAll('.position');
const title = document.querySelector('.title');
const snake = [2, 1, 0]; // init snake; head at index 2
let appleIndex,
  score = 0,
  speed = 700,
  direction = 1;
snake.forEach(index => positions[index].classList.add('snake'));
generateApple();
document.addEventListener('keydown', setDirection);
let interval = setInterval(gameStep, speed);

function gameStep() {
  const nextIndex = snake[0] + direction;

  if (isGameOver(nextIndex)) {
    showText(`Game over. Score: ${score}`);
    clearInterval(interval);
    return;
  }

  if (nextIndex != appleIndex) {
    positions[snake.pop()].classList.remove('snake'); //remove last
  } else {
    score++;
    positions[appleIndex].classList.remove('apple');
    showText(`Score: ${score}`);
    generateApple();
    increaseSpeed();
  }
  snake.unshift(nextIndex); // move head to next position
  positions[nextIndex].classList.add('snake');
}

function setDirection(e) {
  switch (e.key) {
    case "ArrowLeft":
      direction = -1;
      break;
    case "ArrowRight":
      direction = +1;
      break;
    case "ArrowUp":
      direction = -width;
      break;
    case "ArrowDown":
      direction = width;
      break;
  }
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * width * width);
  }
  while (snake.includes(appleIndex))
  positions[appleIndex].classList.add('apple');
}

function isGameOver(nextIndex) {
  return nextIndex < 0 ||
    nextIndex >= width * width ||
    nextIndex % width === width - 1 && direction === -1 ||
    nextIndex % width === 0 && direction === 1 ||
    snake.includes(nextIndex)
}

function increaseSpeed() {
  if (speed > 30) {
    speed = speed > 200 ? speed - 50 : speed - 10;
    clearInterval(interval);
    interval = setInterval(gameStep, speed);
  }
}

function showText(text) {
  title.innerHTML = text;
}
