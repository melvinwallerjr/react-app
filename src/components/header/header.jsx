import React from 'react';

import GetLink from '../get-link/get-link';
import logo from '../../assets/logo.svg';
import './header.scss';

/**
 * Header
 * Generates a site header while applying Bootstrap classes.
 *
 * @param {*} params
 * @returns HTML result
 */
function Header(params) {
  const { title, list, path } = params;

  // toggle site menu on mobile
  function toggleMenu(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
      document.querySelector('header nav').classList.toggle('active');
    }
  }

  return (
    <header
      id="site-header"
      className="site-header"
      aria-label="site header"
    >
      <div><img src={logo} alt="logo" /></div>

      <div><p>{title}</p></div>

      <nav aria-label="site navigation">
        <a
          href="#site-header"
          className="burger"
          aria-label="toggle site menu"
          onClick={toggleMenu}
        ><span></span></a>
        <ol className="site-links">
          {list.map((item, index) => (item.text) && (
            <li key={`nav-${index}`}>
              {(!item.href) ? ( // not linked
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              ) : <GetLink {...item} path={path} onClick={toggleMenu} />}
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}

export default Header;
