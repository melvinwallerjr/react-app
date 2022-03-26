import './accordion.scss';

let accordionSeed = 0;

/**
 * Accordion:
 * Builds a Bootstrap styled accordion component.
 *
 * @param {*} param0
 * @returns HTML result
 */
const Accordion = ({
  headingIndex = 2,
  headingSize = '',
  openFirst = false,
  list = [],
}) => {
  // accordion list is empty
  if (list.length < 1) {
    return null;
  }

  let heading = parseInt(headingIndex, 10);
  heading = (!heading || heading < 1) ? 2 : heading;
  accordionSeed += 1;

  return (
    <ol
      id={`accordion${accordionSeed}`}
      className="accordion"
    >
      {list.map((item, index) => (item.title && item.content) ? ( // for each list item
        <li
          key={`accordion${accordionSeed}-c${index}`}
          className="card"
        >
          <div
            id={`accordion${accordionSeed}-t${index}`}
            className="card-header"
            dangerouslySetInnerHTML={{__html:
              `<a
                href="#accordion${accordionSeed}-c${index}"
                data-toggle="collapse"
                role="button"
                aria-expanded="${!!openFirst && index === 0}"
                aria-controls="accordion${accordionSeed}-c${index}"
                ${item.tracking ? `data-tracking="${item.tracking}"` : ''}
                class="glo-link-plain ${item.customClasses}"
                ${item.additionalAttributes || ''}
              >
                <h${heading} class="${headingSize}">${item.title}</h${heading}>
                ${(item.subCopy) ? `<p>${item.subCopy}</p>` : ''}
              </a>`
            }}
          />
          <div
            id={`accordion${accordionSeed}-c${index}`}
            className={`collapse${(openFirst && index === 0) ? ' show' : ''}`}
            data-toggle="collapse"
            data-parent={`#accordion${accordionSeed}`}
            aria-labelledby={`accordion${accordionSeed}-t${index}`}
          >
            <div className={`card-body pb-5 pb-lg-6 offset-lg-2 col-lg-8' : ''}`}>{item.content}</div>
          </div>
        </li>
      ) : null)}
    </ol>
  );
};

export default Accordion;
