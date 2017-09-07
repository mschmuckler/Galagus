import Starship from './starship';
import Enemy from './enemy';
import { shuffle, collisionOccured } from './utility';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = "20pt Courier New";
  const starship = new Starship();
  let enemies = [];
  let killCount = 1;
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

  let starfieldColors = ["#31FFFF", "#008A00", "#931C1C", "#8C7D00", "#8B41C1"];
  starfieldColors = starfieldColors
    .concat(starfieldColors)
    .concat(starfieldColors)
    .concat(starfieldColors)
    .concat(starfieldColors)
    .concat(starfieldColors);
  const starfieldPositions = [];
  for (var i = 0; i < 60; i++) {
    let radius = Math.random() * 2 + 1.5;
    starfieldPositions.push({
      "x": canvas.width * Math.random(),
      "y": canvas.height * Math.random(),
      "radius": radius,
    });
  }

  const renderStarfield = (canvas, ctx) => {
    starfieldPositions.forEach((star, idx) => {
      ctx.fillStyle = starfieldColors[idx];
      if (star.y > 600) {
        star.y = 0;
      }
      star.y++;
      ctx.fillRect(
        star.x,
        star.y,
        star.radius,
        star.radius,
      )
    });
  };

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

  const queueEnemyWaves = () => {
    createEnemyWave(firstWaveFormation, 200, 1);
    setTimeout(() => createEnemyWave(secondWaveFormation, 150, -1), 15000)
  }

  queueEnemyWaves();
  const mainLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillText(
      `SCORE: ${score}`,
      310,
      25,
    );
    renderStarfield(canvas, ctx);

    if (killCount % 49 === 0) {
      killCount++;
      queueEnemyWaves();
    }
    starship.renderStarship(canvas, ctx);
    enemies.forEach((enemy, idx) => {
      enemy.renderEnemy(canvas, ctx);

      if (collisionOccured(enemy, starship, 16, -10, 60)) {
        starship.implode();
      }

      enemy.lasers.forEach(laser => {
        if (collisionOccured(starship, laser, 22, 17, 50)) {
          starship.implode();
          laser.dissolve();
        }
      });

      starship.lasers.forEach(laser => {
        if (collisionOccured(enemy, laser, 22, 17, 50)) {
          enemy.destroy();
          laser.dissolve();
          killCount += 1;
          score += 10;
        }
      });
    });

    requestAnimationFrame(mainLoop);
  };

  mainLoop();
});
