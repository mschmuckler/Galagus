import Starship from './starship';
import Enemy from './enemy';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const shuffle = (arr) => arr.sort(() => (Math.random() - 0.5));
  const starship = new Starship();
  const enemies = [];
  const formationSpaces = [
    {"x": 50, "y": 80},
    {"x": 100, "y": 80},
    {"x": 150, "y": 80},
    {"x": 200, "y": 80},
    {"x": 250, "y": 80},
    {"x": 300, "y": 80},
    {"x": 350, "y": 80},
    {"x": 400, "y": 80},
    {"x": 50, "y": 130},
    {"x": 100, "y": 130},
    {"x": 150, "y": 130},
    {"x": 200, "y": 130},
    {"x": 250, "y": 130},
    {"x": 300, "y": 130},
    {"x": 350, "y": 130},
    {"x": 400, "y": 130},
    {"x": 50, "y": 180},
    {"x": 100, "y": 180},
    {"x": 150, "y": 180},
    {"x": 200, "y": 180},
    {"x": 250, "y": 180},
    {"x": 300, "y": 180},
    {"x": 350, "y": 180},
    {"x": 400, "y": 180},
  ];


  const createEnemyWave = () => {
    shuffle(formationSpaces).forEach((coords, idx) => {
      setTimeout(() => {
        let enemy;
        if (idx % 2 == 0) {
          enemy = new Enemy(coords.x, coords.y, 341, 200, 1);
        } else {
          enemy = new Enemy(coords.x, coords.y, 100, 200, -1);
        }
        enemies.push(enemy);
      }, (idx * 200));
    });
  }

  let x = 1;
  const mainLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    starship.renderStarship(canvas, ctx);

    if (x === 1) {
      createEnemyWave();
      x++;
    }

    enemies.forEach(enemy => enemy.renderEnemy(canvas, ctx));

    requestAnimationFrame(mainLoop);
  };

  mainLoop();
});
