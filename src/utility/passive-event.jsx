function passiveEvent() {
  let passive = false;
  try {
      const tmp = Object.defineProperty({}, 'passive', {
          get: function() {
              passive = { passive: true };
              return false;
          }
      });
      window.addEventListener('error', function() {}, tmp);
      window.removeEventListener('error', function() {}, tmp);
  } catch (error) {
      passive = false;
  }
  return passive;
}

export default passiveEvent;
