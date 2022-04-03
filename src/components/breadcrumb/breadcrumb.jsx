import React from 'react';

import GetLink from '../get-link/get-link';
import './breadcrumb.scss';

let breadcrumbSeed = 0;

/**
 * Breadcrumb:
 * Builds a Bootstrap styled breadcrumb list of links.
 *
 * @param {*} params
 * @returns HTML result
 */
function Breadcrumb(params) {
  const { list = [] } = params;
  if (list.length < 1) {
    return null;
  }
  breadcrumbSeed += 1;

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {list.map((item, index) => (item.text) && ( // for each list item
          <li key={`breadcrumb-${breadcrumbSeed}-${index}`} className="breadcrumb-item">
            {(!item.href || index === list.length - 1) ? ( // not linked or last item
              <span dangerouslySetInnerHTML={{ __html: item.text }} />
            ) : ( // links
              <GetLink {...item} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
