/**
 * classNames:
 * Processes data to obtain a string of class names.
 * Allows for the use of conditional statements to apply classes.
 * Accepts an object or array for application of conditional statements.
 * Will convert other types, like numbers and variables, to strings.
 * Returns a string of the resulting class names.
 *
 * @param {*} classes
 * @returns
 */
function classNames(classes) {
  let list = '';
  if (classes.constructor.name.toLowerCase() === 'object') {
    Object.entries(classes).forEach((entry) => {
      list += (entry[1]) ? ` ${entry[0]}` : '';
    });
  } else if (classes.constructor.name.toLowerCase() === 'array') {
    list = classes.join(' ');
  } else {
    list = classes.toString();
  }
  return list.trim().replace(/\s/g, ' ');
}

export default classNames;
