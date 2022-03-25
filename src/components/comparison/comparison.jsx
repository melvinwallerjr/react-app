import {useEffect, useRef, useState} from 'react';

import './comparison.scss';
import {GetLink} from '../';
import {
  classNames,
  htmlToText,
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
  const [firstColumnVal, setFirstColumnVal] = useState();
  const [secondColumnVal, setSecondColumnVal] = useState();

  // DOM node pointers
  const [comparison, setComparison] = useState(null);

  // set DOM object references for script access
  useEffect(() => {
    setComparison(comparisonRef.current);
    setFirstColumnVal(firstColumnRef.current.selectedIndex);
    setSecondColumnVal(secondColumnRef.current.selectedIndex + 1);
  }, [comparisonRef]);

  // activate mobile column switching
  useEffect(() => {
    if (comparison && parseInt(comparison.dataset.columns, 10) > 1 && !comparison.classList.contains('hydrated')) {
      comparison.classList.add('hydrated');
      mobileColumns();
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

  // Swap Column: visibility on mobile
  const mobileColumns = (event) => {
    const isFirst = (!event || event.target.getAttribute('name') === 'first-column');
    let firstVal = firstColumnVal;
    let secondVal = secondColumnVal;
    console.log(firstVal, secondVal);
    if (isFirst) {
      firstVal = event ? event.target.selectedIndex : 0;
    } else {
      secondVal = event.target.selectedIndex + 1;
    }
    if (firstVal >= secondVal) {
      if (isFirst) {
        secondVal = firstVal + 1;
      } else {
        firstVal = secondVal - 1;
      }
    }
    console.log(firstVal, secondVal);
    setFirstColumnVal(firstVal);
    setSecondColumnVal(secondVal);
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
        <div className="table-option col-6 pt-2">
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
                  value={firstColumnVal}
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
        <div className="table-option col-6 pt-2">
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
                  value={secondColumnVal}
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
                  'table-hide': idx !== firstColumnVal && idx !== secondColumnVal,
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
        'table-hide': index !== firstColumnVal && index !== secondColumnVal,
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
        'table-hide': index !== firstColumnVal && index !== secondColumnVal,
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
      className={classNames({
        'comparison': true,
        'sticky': stickyHeader,
      })}
      data-columns={columns}
    >
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default Comparison;
