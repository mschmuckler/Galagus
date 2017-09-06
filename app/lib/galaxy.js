import Starship from './starship';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const starshipImg = document.getElementById("starship");
  const starship = new Starship(starshipImg);

  const mainLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    starship.renderMovement(canvas, ctx);

    requestAnimationFrame(mainLoop);
  };

  mainLoop();
});
