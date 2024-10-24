const canvas = document.getElementById('snakeGame');
const context = canvas.getContext('2d');

const box = 32; // Tamanho de cada quadrado
canvas.width = 16 * box;
canvas.height = 16 * box;

let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

let direction = 'RIGHT';

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};

function drawGame() {
  // Desenha o fundo do jogo
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobrinha
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = (i === 0) ? 'green' : 'lime';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Desenha a comida
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);

  // Posição da cabeça da cobra
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Movendo a cobrinha
  if (direction === 'LEFT') snakeX -= box;
  if (direction === 'UP') snakeY -= box;
  if (direction === 'RIGHT') snakeX += box;
  if (direction === 'DOWN') snakeY += box;

  // Se a cobrinha comer a comida
  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 15 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box
    };
  } else {
    // Remove a última parte da cobra
    snake.pop();
  }

  // Nova cabeça da cobra
  let newHead = { x: snakeX, y: snakeY };

  // Game over: se a cobra bater nas paredes ou nela mesma
  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= canvas.width || snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  // Adiciona a nova cabeça à cobra
  snake.unshift(newHead);
}

// Função que verifica colisão com o próprio corpo
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Controle da cobrinha
document.addEventListener('keydown', event => {
  if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
  if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
  if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
  if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
});

// Atualiza o jogo a cada 100ms
let game = setInterval(drawGame, 100);