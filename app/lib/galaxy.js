import Starship from './starship';
import Enemy from './enemy';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const starship = new Starship();
  const enemy1 = new Enemy(1, 1, 50, 80);
  const enemy2 = new Enemy(1, 1, 100, 80);
  const enemy3 = new Enemy(1, 1, 150, 80);
  const enemy4 = new Enemy(1, 1, 200, 80);
  const enemy5 = new Enemy(1, 1, 250, 80);
  const enemy6 = new Enemy(1, 1, 300, 80);
  const enemy7 = new Enemy(1, 1, 350, 80);
  const enemy8 = new Enemy(1, 1, 400, 80);
  const enemy9 = new Enemy(1, 1, 50, 130);
  const enemy10 = new Enemy(1, 1, 100, 130);
  const enemy11 = new Enemy(1, 1, 150, 130);

  const mainLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    starship.renderStarship(canvas, ctx);
    enemy1.renderEnemy(canvas, ctx);
    enemy2.renderEnemy(canvas, ctx);
    enemy3.renderEnemy(canvas, ctx);
    enemy4.renderEnemy(canvas, ctx);
    enemy5.renderEnemy(canvas, ctx);
    enemy6.renderEnemy(canvas, ctx);
    enemy7.renderEnemy(canvas, ctx);
    enemy8.renderEnemy(canvas, ctx);
    enemy9.renderEnemy(canvas, ctx);
    enemy10.renderEnemy(canvas, ctx);
    enemy11.renderEnemy(canvas, ctx);

    requestAnimationFrame(mainLoop);
  };

  mainLoop();
});
