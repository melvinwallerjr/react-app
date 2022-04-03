import React, { Link, NavLink } from 'react-router-dom';

/**
 * GetLink: adjust attributes to match JSX requirements
 * Returns JSX object reduced to an HTML Anchor
 * Generate link using: <NavLink /> or <Link /> of <a></a>
 * <NavLink /> requires the url 'path' to determine the 'active' link
 *
 * @param {*} params
 * @returns HTML result
 */
function GetLink(params) {
  const link = { ...params }; // no not mutate source data
  let anchorType = 'link'; // Types: link:Link, nav:NavLink, a:anchor

  // use href from data
  if (link.href) {
    link.to = link.href;
    delete link.href;
  }

  // use .env value for project root path
  if (link.to) {
    link.to = link.to.replace('%PUBLIC_URL%', `${process.env.PUBLIC_URL}/`);
  }

  // NavLink: requires path, set current link active for home or other
  if (typeof link.path === 'string') {
    anchorType = 'nav';
    link['aria-current'] = (link.to === '/' && link.path === '/')
      || (link.to.length > 1 && link.path.indexOf(link.to) === 0);
    delete link.path;
  }

  // Anchor: external link treatment, use 'href' (not 'to')
  if (!link.target && link.to.indexOf('://') > 0) {
    anchorType = 'a';
    link.href = link.to;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    delete link.to;
    delete link['aria-current']; // external links cannot be active
  }

  // used by click tracking script
  if (link.tracking) {
    link['data-tracking'] = link.tracking;
    delete link.tracking;
  }

  // provide for HTML markup inside the link
  if (link.html || link.text) {
    link.dangerouslySetInnerHTML = { __html: link.html || link.text };
    delete link.html;
    delete link.text;
    delete link.children;
  }

  // return the appropriate link type
  if (anchorType === 'a') { // Anchor
    return <a {...link}>{link.children}</a>;
  }
  if (anchorType === 'nav') { // NavLink
    return <NavLink {...link} />;
  }
  return <Link {...link} />; // Link
}

export default GetLink;
