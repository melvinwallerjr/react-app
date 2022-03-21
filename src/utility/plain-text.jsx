function plainText(html) {
    if (!html || typeof html !== 'string') {
        return '';
    }

    var el = document.createElement('div');
    el.innerHTML = html;
    return el.textContent || el.innerText || '';
}

export default plainText;
