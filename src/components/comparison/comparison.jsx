import {useEffect, useRef, useState} from 'react';

import './comparison.scss';
import {GetLink} from '../';
import {
  classNames,
  htmlToText,
  passiveEvent,
  throttle,
} from '../../utility';

let comparisonSeed = 0;

function Comparison({
  stickyHeader = false,
  categories = [],
  rows = [],
}) {
  // DOM references
  const comparisonRef = useRef(null);
  const firstColumnRef = useRef(null);
  const secondColumnRef = useRef(null);

  // DOM node pointers
  const [comparison, setComparison] = useState(null);
  const [firstColumn, setFirstColumn] = useState(null);
  const [secondColumn, setSecondColumn] = useState(null);

  // set DOM object references for script access
  useEffect(() => {
    setComparison(comparisonRef.current);
    setFirstColumn(firstColumnRef.current);
    setSecondColumn(secondColumnRef.current);
  }, [comparisonRef]);

  // Sticky Header: monitor scroll
  useEffect(() => {
    if (comparison && comparison.dataset.columns && !comparison.classList.contains('hydrated')) {
      const scroller = [].slice.call(document.querySelectorAll('#root, main'));
      comparison.classList.add('hydrated');

      if (stickyHeader) {
        scroller.forEach((el) => el.addEventListener('scroll', sticky, passiveEvent));
      }

      return () => {
        if (stickyHeader) {
          scroller.forEach((el) => el.removeEventListener('scroll', sticky, passiveEvent));
        }
      };
    };
  });

  // Data: no columns
  if (categories.length < 1 || rows.length < 1) {
    return null;
  }

  // Seed: for managing multiple component instances
  comparisonSeed += 1;

  // Max Columns: design limits number of columns to render
  const maxColumns = 4;
  let columns = categories.length;
  columns = (columns.length > maxColumns) ? maxColumns : columns;

  const columnSize = (columns === 4) ? 'col-3' : ((columns === 3) ? 'col-4' : ((columns === 2) ? 'col-6' : 'col-12'));

  // Toggle: sticky header
  const sticky = throttle(() => {
    var rect = comparison.getBoundingClientRect();
    comparison.classList[(rect.top < 24 && 85 < rect.bottom) ? 'add' : 'remove']('table-sticky');
  }, 50);

  // Swap Column: visibility on mobile
  const mobileColumns = (event) => {
    const isFirst = (event.target === firstColumn);
    if (firstColumn.selectedIndex > secondColumn.selectedIndex) {
      (isFirst ? secondColumn : firstColumn).selectedIndex = isFirst ? firstColumn.selectedIndex : secondColumn.selectedIndex;
    }
    [].slice.call(comparison.querySelectorAll('[data-index]')).forEach((item) => {
      const index = item.dataset.index;
      item.classList[(
        index === firstColumn.options[firstColumn.selectedIndex].value ||
        index === secondColumn.options[secondColumn.selectedIndex].value
      ) ? 'remove' : 'add']('table-hide');
    });
  };

  // SVG: insert arrow SVG for custom form select
  const SvgArrow = () => (
    <span className="form-svg">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="13" height="13">
        <polyline
          points="4 1 9 6.5 4 12"
          transform="rotate(90) translate(0, -13)"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );

  // Mobile Header: only two headings
  const MobileHeader = () => (
    <div
      className="table-sm container d-md-none"
      aria-labelledby="comparison-mobile-title"
    >
      <div className="row">
        <div className="table-option col-6">
          <div className="table-category">
            {(columns < 3) && (
              <p
                className="d-block m-0"
                title={categories[0].name}
                dangerouslySetInnerHTML={{__html: categories[0].name}} />
            )}
            {(columns > 2) && (
              <p className="form form-select py-0">
                <select
                  ref={firstColumnRef}
                  name="first-column"
                  aria-label="first column"
                  className="form-control"
                  onChange={mobileColumns}
                >
                  {categories.map((category, index) => (index < columns - 1) && (
                    <option
                      key={`comparison-${comparisonSeed}-first-${index}`}
                      value={index}
                      defaultValue={index === 0}
                    >{htmlToText(category.name)}</option>
                  ))}
                </select>
                <SvgArrow />
              </p>
            )}
          </div>
        </div>
        <div className="table-option col-6">
          <div className="table-category">
            {(columns < 3) && (
              <p
                className="d-block m-0"
                title={categories[1].name}
              >{categories[1].name}</p>
            )}
            {(columns > 2) && (
              <p className="form form-select py-0">
                <select
                  ref={secondColumnRef}
                  name="second-column"
                  aria-label="second column"
                  className="form-control"
                  onChange={mobileColumns}
                >
                  {categories.map((category, index) => (index > 0) && (
                    <option
                      key={`comparison-${comparisonSeed}-first-${index}`}
                      value={index}
                      defaultValue={index === 1}
                    >{htmlToText(category.name)}</option>
                  ))}
                </select>
                <SvgArrow />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Header: heading row, mobile (sm) and other (lg)
  const Header = () => (
    <div className="table-header">
      <MobileHeader />

      <div className="table-lg container d-none d-md-block">
        <div className="row">
          <div className={classNames({
            'd-flex flex-row col-12 p-0': true,
            'col-lg-10 offset-lg-1' : (columns < 3),
          })}>
            {Array(columns).fill('x').map((x, index) => (categories[index]) && (
              <div
                key={`comparison-header-${comparisonSeed}-${index}`}
                className={classNames({
                  'table-option': true,
                  [columnSize]: true,
                  'table-hide' : (index > 1),
                })}
              >
                <div className="table-category">
                  <p className="d-block m-0" title={categories[index].name} dangerouslySetInnerHTML={{__html: categories[index].name}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Body: feature list rows
  const Body = () => (
    <section aria-label="comparison line item details" className="table-body container">
      {rows.map((row, index) => (
        <div
          key={`comparison-row-${comparisonSeed}-${index}`}
          className={classNames({
            'row': true,
            [row.rowClass]: !!row.rowClass,
          })}
        >
          <div className={classNames({
            'd-flex flex-row col-12 p-0': true,
            'col-lg-10 offset-lg-1': (columns < 3),
          })}>
            {Array(columns).fill('x').map((x, idx) => (
              <div
                key={`comparison-${comparisonSeed}-${idx}`}
                className={classNames({
                  'table-option flex-even': true,
                  'table-hide': (firstColumn && !(idx.toString() === firstColumn.value || idx.toString() === secondColumn.value)) || (!firstColumn && idx > 1),
                })}
                data-index={idx}
              >
                {(categories[idx]) && (
                  <div className="h-100 pt-3 pt-md-4 pb-4 pb-md-9" aria-label={`item ${index + 1} for ${htmlToText(categories[idx].name)}`}>
                    {(row.categories[idx].image) && (
                      <img src={row.categories[idx].image} width="36" height="36" alt="" className="mb-2" />
                    )}
                    {(row.categories[idx].title) && (
                      <p className="m-0"><strong>{row.categories[idx].title}</strong></p>
                    )}
                    {(row.categories[idx].description) && (
                      <div>{row.categories[idx].description}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );

  // Action: column footer action items
  const Action = ({category, index}) => (category) ? (
    <div
      className={classNames({
        'table-option flex-even': true,
        'table-hide': (firstColumn && !(index.toString() === firstColumn.value || index.toString() === secondColumn.value)) || (!firstColumn && index > 1),
      })}
      data-index={index}
      aria-label={`for ${htmlToText(category.name)}`}
    >
      <div className="pt-3 pt-md-4">
        {(category.btnText && category.btnLink) && (
          <GetLink
            href={category.btnLink}
            aria-label={`${htmlToText(category.btnText)} for ${htmlToText(category.name)}`}
            className={`btn btn-primary ${category.btnClasses}`}
            tracking={category.btnTracking}
            html={category.btnText}
          />
        )}
      </div>
    </div>
  ) : (
    <div
      className={classNames({
        'table-option flex-even': true,
        'table-hide': (firstColumn && !(index.toString() === firstColumn.value || index.toString() === secondColumn.value)) || (!firstColumn && index > 1),
      })}
      data-index={index}
    >
    </div>
  );

  // Footer: column action
  const Footer = () => (
    <div className="table-footer container">
      <div className="row">
        <div
          className={classNames({
            'd-flex flex-row col-12 p-0': true,
            'col-lg-10 offset-lg-1' : (columns < 3),
          })}
        >
          {Array(columns).fill('x').map((x, index) => (
            <Action
              key={`comparison-${comparisonSeed}-${index}`}
              {...{category: categories[index], index}}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={comparisonRef}
      className="comparison"
      data-columns={columns}
      data-sticky={stickyHeader ? 1 : 0}
    >
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default Comparison;
