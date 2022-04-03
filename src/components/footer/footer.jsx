import React from 'react';

import GetLink from '../get-link/get-link';
import Header from '../header/header';
import './footer.scss';

/**
 * Footer:
 * Generates a site footer while applying Bootstrap classes.
 *
 * @param {*} params
 * @returns HTML result
 */
function Footer(params) {
  const { title, list, path } = params;

  return (
    <footer className="site-footer" aria-label="site footer">
      {title && <Header title={title} />}
      <ol className="site-links">
        {list.map((item, index) => (item.text) && (
          <li key={`nav-${index}`}>
            {(!item.href) ? ( // not linked
              <span dangerouslySetInnerHTML={{ __html: item.text }} />
            ) : <GetLink {...item} path={path} />}
          </li>
        ))}
      </ol>
    </footer>
  );
}

export default Footer;
