/**
 * passiveEvent:
 * Checks browser support for passive event assignment while
 * defining event listeners.
 * Returns the proper browser assignment for a passive event.
 *
 * @returns passive event definition
 */
function passiveEvent() {
  let passive = false;
  try {
    const tmp = Object.defineProperty({}, 'passive', {
      get: () => {
        passive = { passive: true };
        return false;
      },
    });
    window.addEventListener('error', () => {}, tmp);
    window.removeEventListener('error', () => {}, tmp);
  } catch (error) {
    passive = false;
  }
  return passive;
}

export default passiveEvent;
