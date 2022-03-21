// return trimmed string of class names from object, array, other
function classNames(classes) {
  let list = '';
  if (classes.constructor.name.toLowerCase() === 'object') {
    Object.entries(classes).forEach((entry) => list += (entry[1]) ? ` ${entry[0]}` : '');
  } else if (classes.constructor.name.toLowerCase() === 'array') {
    list = classes.join(' ');
  } else {
    list = classes.toString();
  }
  return list.trim().replace(/\s/g, ' ');
}

export default classNames;
