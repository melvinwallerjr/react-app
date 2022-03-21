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
