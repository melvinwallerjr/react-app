import './footer.scss';

/**
 * Footer:
 * Generates a site footer while applying Bootstrap classes.
 *
 * @returns HTML result
 */
function Footer() {
  return (
    <footer className="site-footer" aria-label="site footer">
      <p>
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </p>
    </footer>
  );
}

export default Footer;
