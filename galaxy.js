document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const keysDown = {};

  document.addEventListener("keydown", (e) => {
  	keysDown[e.keyCode] = true;
  }, false);

  document.addEventListener("keyup", (e) => {
  	delete keysDown[e.keyCode];
  }, false);

  const starshipImg = document.getElementById("starship");
  const starship = {
    "img": starshipImg,
    "x": 223,
    "y": 540,
    "diameter": 50,
  }

  function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      starship.img,
      starship.x,
      starship.y,
      starship.diameter,
      starship.diameter
    );

    if (keysDown[37]) {
      starship.x -= 3;
    } else if (keysDown[39]) {
      starship.x += 3;
    }

    requestAnimationFrame(mainLoop);
  }

  mainLoop();

});
