class Laser {
  constructor(x, y) {
    this.img = document.getElementById("laser");
    this.x = x + 23;
    this.y = y;
    this.size = 25;
  }

  renderLaser(canvas, ctx) {
    this.y -= 5;

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      5,
      this.size
    );
  }
}

export default Laser;
