import {GetLink} from '../';
import './footer.scss';

/**
 * Footer:
 * Generates a site footer while applying Bootstrap classes.
 *
 * @param {*} param0
 * @returns HTML result
 */
function Footer({title, list, path}) {
  return (
    <footer className="site-footer" aria-label="site footer">
      <ol className="site-links">
        {list.map((item, index) => (item.text) && (
          <li key={`nav-${index}`}>
            {(!item.href) ? ( // not linked
              <span dangerouslySetInnerHTML={{__html: item.text}} />
            ) : <GetLink {...item} path={path} />}
          </li>
        ))}
      </ol>
    </footer>
  );
}

export default Footer;
