const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 32; 
const canvasSize = 608;
let score = 0;


let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };


let food = spawnFood();
function spawnFood() {
  let newFood;
  let collisionDetected;
  let attempts = 0;
  const maxAttempts = 1000;

  do {
    newFood = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
    collisionDetected = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    attempts++;
    if (attempts > maxAttempts) {
      return null;
    }
  } while (collisionDetected);

  return newFood;
}

let direction = "RIGHT";

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
  if ((key === "a" || key === "ф") && direction !== "RIGHT") {
    direction = "LEFT";
  } else if ((key === "w" || key === "ц") && direction !== "DOWN") {
    direction = "UP";
  } else if ((key === "d" || key === "в") && direction !== "LEFT") {
    direction = "RIGHT";
  } else if ((key === "s" || key === "ы") && direction !== "UP") {
    direction = "DOWN";
  }
});

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f0" : "#0b0";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }


  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  const newHead = { x: headX, y: headY };


  if (
    headX < 0 || headX > canvasSize ||
    headY < 0 || headY > canvasSize ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Игра окончена! Очки: " + score);
    location.reload();
    return; 
  }

 
  snake.unshift(newHead);


  if (headX === food.x && headY === food.y) {
    score++;
    food = spawnFood();
  } else {
    snake.pop();
  }


  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Счёт: " + score, box, box);
}


function collision(head, array) {
  return array.some(segment => segment.x === head.x && segment.y === head.y);
}

const game = setInterval(draw, 100);
