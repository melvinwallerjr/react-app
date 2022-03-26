/**
 * throttle:
 * Limits the frequency in which a function will be executed.
 *
 * @param {*} func - callback
 * @param {number} delay - in miliseconds
 * @returns
 */
function throttle(func, delay) {
  let last = 0;
  delay = (delay || 200);
  return (...args) => {
    const now = (new Date()).getTime();
    if (now - last < delay) {
      return;
    }
    last = now;
    return func(...args);
  }
}

export default throttle;
