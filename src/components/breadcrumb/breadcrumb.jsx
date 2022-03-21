import {GetLink} from '../../utility';
import './breadcrumb.scss';

let breadcrumbSeed = 0;

function Breadcrumb({list = []}) {
  if (list.length < 1) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {list.map((item, index) => (item.text) && ( // for each list item
          <li key={`breadcrumb-${breadcrumbSeed}-${index}`} className="breadcrumb-item">
            {(!item.href || index === list.length - 1) ? ( // not linked or last item
              <span dangerouslySetInnerHTML={{__html: item.text}} />
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
