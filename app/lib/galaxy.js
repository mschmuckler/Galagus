import Starship from './starship';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const starship = new Starship();

  const mainLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    starship.renderStarship(canvas, ctx);

    requestAnimationFrame(mainLoop);
  };

  mainLoop();
});
