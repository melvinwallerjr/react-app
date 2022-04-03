/**
 * plainText:
 * Converts content rendered as HTML to plain text.
 * Removes HTML markup and encoding.
 *
 * @param {*} html
 * @returns
 */
function plainText(html) {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Create a new div element
  const el = document.createElement('div');

  // Set the HTML content with the given value
  el.innerHTML = html;

  // Retrieve the text property of the element
  return el.textContent || el.innerText || '';
}

export default plainText;
