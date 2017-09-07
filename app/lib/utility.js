export const shuffle = (arr) => arr.sort(() => (Math.random() - 0.5));

export const collisionOccured = (obj1, obj2) => {
  const dx = obj1.x - obj2.x + 22;
  const dy = obj1.y - obj2.y + 17;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < obj1.size + obj2.size - 50) {
      return true;
  }
  return false;
};
