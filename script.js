
    // Pong Game Logic
    const canvas = document.getElementById('pong');
    const ctx = canvas.getContext('2d');


    // Scroll Animation
const projectCards = document.querySelectorAll(".project-card");

function checkScroll() {
  projectCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", checkScroll);

    // Paddle and Ball properties
    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballSize = 10;

    const player = { x: 10, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
    const ai = { x: canvas.width - 20, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
    const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 3, dy: 3 };

    function drawRect(x, y, w, h, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }

    function drawCircle(x, y, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }

    function drawText(text, x, y, color) {
      ctx.fillStyle = color;
      ctx.font = '20px Arial';
      ctx.fillText(text, x, y);
    }

    function movePaddle(event) {
      const rect = canvas.getBoundingClientRect();
      player.y = event.clientY - rect.top - paddleHeight / 2;
    }

    function updateBall() {
      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.y + ballSize > canvas.height || ball.y - ballSize < 0) {
        ball.dy *= -1;
      }

      const playerPaddle = ball.x < canvas.width / 2 ? player : ai;
      if (
        ball.x + ballSize > playerPaddle.x &&
        ball.x - ballSize < playerPaddle.x + paddleWidth &&
        ball.y > playerPaddle.y &&
        ball.y < playerPaddle.y + paddleHeight
      ) {
        ball.dx *= -1;
      }

      if (ball.x + ballSize > canvas.width) {
        player.score++;
        resetBall();
      } else if (ball.x - ballSize < 0) {
        ai.score++;
        resetBall();
      }
    }

    function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx *= -1;
    }

    function update() {
      ai.y += (ball.y - (ai.y + paddleHeight / 2)) * 0.1;
      updateBall();
    }

    function render() {
      drawRect(0, 0, canvas.width, canvas.height, '#333');
      drawRect(player.x, player.y, paddleWidth, paddleHeight, 'white');
      drawRect(ai.x, ai.y, paddleWidth, paddleHeight, 'white');
      drawCircle(ball.x, ball.y, ballSize, 'white');
      drawText(player.score, canvas.width / 4, 20, 'white');
      drawText(ai.score, (canvas.width * 3) / 4, 20, 'white');
    }

    function gameLoopPong() {
      update();
      render();
      requestAnimationFrame(gameLoopPong);
    }

    canvas.addEventListener('mousemove', movePaddle);
    gameLoopPong();
  