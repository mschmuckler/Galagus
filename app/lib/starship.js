class Starship {
  constructor(starshipImg) {
    this.img = starshipImg;
    this.x = 223;
    this.y = 540;
    this.diameter = 50;
    this.keysDown = {};

    document.addEventListener("keydown", (e) => {
      this.keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", (e) => {
      delete this.keysDown[e.keyCode];
    }, false);
  }

  renderMovement(canvas, ctx) {
    if (this.keysDown[37] && this.x > 10) {
      this.x -= 3;
    } else if (this.keysDown[39] && this.x < 440) {
      this.x += 3;
    }

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.diameter,
      this.diameter
    );
  };
}

export default Starship;
