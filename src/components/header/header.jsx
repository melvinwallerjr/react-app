import {GetLink} from '../../utility';
import logo from '../../assets/logo.svg';
import './header.scss';

function Header({title, list, path}) {
  // toggle site menu on mobile
  function toggleMenu(event) {
    event.preventDefault();
    event.target.parentElement.classList.toggle('active');
  }

  // return external link
  // const ExternalLink = (item) => {
  //   const link = {...item};
  //   const html = link.text;
  //   delete link.text;
  //   link.target = '_blank';
  //   link.rel = 'noopener noreferrer';
  //   return <a {...link}
  //     dangerouslySetInnerHTML={{__html: html}}
  //   />;
  // };

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
              {(!item.href) && ( // not linked
                <span dangerouslySetInnerHTML={{__html: item.text}} />
              )}
              {(item.href) && <GetLink {...item} path={path} />}
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}

export default Header;
