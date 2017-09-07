import Starship from './starship';
import Enemy from './enemy';
import { shuffle, collisionOccured } from './utility';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const starship = new Starship();
  const enemies = [];
  let score = 0;
  const firstWaveFormation = [
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

  const secondWaveFormation = [
    {"x": 50, "y": 230},
    {"x": 100, "y": 230},
    {"x": 150, "y": 230},
    {"x": 200, "y": 230},
    {"x": 250, "y": 230},
    {"x": 300, "y": 230},
    {"x": 350, "y": 230},
    {"x": 400, "y": 230},
    {"x": 50, "y": 280},
    {"x": 100, "y": 280},
    {"x": 150, "y": 280},
    {"x": 200, "y": 280},
    {"x": 250, "y": 280},
    {"x": 300, "y": 280},
    {"x": 350, "y": 280},
    {"x": 400, "y": 280},
    {"x": 50, "y": 330},
    {"x": 100, "y": 330},
    {"x": 150, "y": 330},
    {"x": 200, "y": 330},
    {"x": 250, "y": 330},
    {"x": 300, "y": 330},
    {"x": 350, "y": 330},
    {"x": 400, "y": 330},
  ];


  const createEnemyWave = (waveFormation, centerY, yCurveDirection) => {
    shuffle(waveFormation).forEach((coords, idx) => {
      setTimeout(() => {
        let enemy;
        if (idx % 2 == 0) {
          enemy = new Enemy(coords.x, coords.y, 341, centerY, 1, yCurveDirection);
        } else {
          enemy = new Enemy(coords.x, coords.y, 100, centerY, -1, yCurveDirection);
        }
        enemies.push(enemy);
      }, (idx * 200));
    });
  }

  createEnemyWave(firstWaveFormation, 200, 1);
  setTimeout(() => createEnemyWave(secondWaveFormation, 150, -1), 10000)

  const mainLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "20pt Courier New";
    ctx.fillText(
      `SCORE: ${score}`,
      310,
      25,
    );

    starship.renderStarship(canvas, ctx);
    enemies.forEach(enemy => {
      enemy.renderEnemy(canvas, ctx);
      starship.lasers.forEach(laser => {
        if (collisionOccured(enemy, laser)) {
          enemy.destroy();
          laser.dissolve();
          score += 100;
        }
      });
    });

    requestAnimationFrame(mainLoop);
  };

  mainLoop();
});
