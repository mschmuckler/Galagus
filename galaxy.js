document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const starship = document.getElementById("starship");
  ctx.drawImage(starship, 223, 540, 50, 50);
});
