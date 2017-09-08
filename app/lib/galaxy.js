import Starship from './starship';
import Enemy from './enemy';
import { shuffle, collisionOccured } from './utility';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = "20pt Courier New";

  const gameOverText = document.getElementById("game-over");
  const theme = new Audio("./assets/audio/galaga_theme.mp3");
  let starship = new Starship();
  let enemies = [];
  let killCount = 1;
  let score = 0;
  let waveTimers = [];
  let gameAnimation;
  let gameOver = false;
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

  const starfieldPositions = [];
  let starfieldColors = ["#31FFFF", "#008A00", "#931C1C", "#8C7D00", "#8B41C1"];
  starfieldColors = starfieldColors
    .concat(starfieldColors)
    .concat(starfieldColors)
    .concat(starfieldColors)
    .concat(starfieldColors)
    .concat(starfieldColors);

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

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderStarfield(canvas, ctx);
  }, 1000/60);

  const createEnemyWave = (waveFormation, centerY, yCurveDirection) => {
    shuffle(waveFormation).forEach((coords, idx) => {
      waveTimers.push(
        setTimeout(() => {
          let enemy;
          if (idx % 2 == 0) {
            enemy = new Enemy(coords.x, coords.y, 177, 341, centerY, 1, yCurveDirection);
          } else {
            enemy = new Enemy(coords.x, coords.y, 154, 100, centerY, -1, yCurveDirection);
          }
          enemies.push(enemy);
        }, (idx * 200))
      );
    });
  }

  const queueEnemyWaves = () => {
    createEnemyWave(firstWaveFormation, 200, 1);
    waveTimers.push(
      setTimeout(() => createEnemyWave(secondWaveFormation, 150, -1), 20000)
    );
  }

  const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillText(
      `SCORE: ${score}`,
      310,
      25,
    );

    if (gameOver) {
      ctx.drawImage(gameOverText, 120, 150);
    }

    renderStarfield(canvas, ctx);

    if (killCount % 49 === 0) {
      killCount++;
      queueEnemyWaves();
    }
    starship.renderStarship(canvas, ctx);
    enemies.forEach((enemy, idx) => {
      enemy.renderEnemy(canvas, ctx);

      if (enemy.alive) {
        if (collisionOccured(enemy, starship, 12, -10, 65)) {
          starship.implode();
          gameOver = true;
        }

        enemy.lasers.forEach(laser => {
          if (collisionOccured(starship, laser, 12, 17, 50)) {
            starship.implode();
            laser.dissolve();
            gameOver = true;
          }
        });

        starship.lasers.forEach(laser => {
          if (collisionOccured(enemy, laser, 22, 17, 50)) {
            enemy.destroy(canvas, ctx);
            laser.dissolve();
            killCount += 1;
            score += 15;
          }
        });
      }
    });

    gameAnimation = requestAnimationFrame(gameLoop);
  };

  const resetGame = () => {
    waveTimers.forEach(wave => clearTimeout(wave));
    enemies.forEach(enemy => enemy.alive = false);
    starship.alive = false;
    waveTimers = [];
    enemies = [];
    starship = new Starship();
    gameOver = false;
    killCount = 1;
    score = 0;
  };

  const clickToPlay = () => {
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => {
      resetGame();
      cancelAnimationFrame(gameAnimation);
      theme.currentTime = 0;
      theme.play();
      waveTimers.push(

        setTimeout(() => {
          gameLoop();
          queueEnemyWaves();
        }, 6500)
      );

    });
  }

  clickToPlay();
});
