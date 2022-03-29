import {GetLink} from '../';
import logo from '../../assets/logo.svg';
import './header.scss';

/**
 * Header
 * Generates a site header while applying Bootstrap classes.
 *
 * @param {*} param0
 * @returns HTML result
 */
function Header({title, list, path}) {
  // toggle site menu on mobile
  function toggleMenu(event) {
    event.preventDefault();
    event.target.parentElement.classList.toggle('active');
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
                <span dangerouslySetInnerHTML={{__html: item.text}} />
              ) : <GetLink {...item} path={path} />}
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}

export default Header;
