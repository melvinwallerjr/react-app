/**
 * throttle:
 * Limits the frequency in which a function will be executed.
 *
 * @param {*} func - callback
 * @param {number} delay - in miliseconds
 * @returns
 */
function throttle(func, delay = 200) {
  let last = 0;
  return (...args) => {
    const now = (new Date()).getTime();
    if (now - last < delay) {
      return;
    }
    last = now;
    func(...args);
  };
}

export default throttle;
