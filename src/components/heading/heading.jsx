import {classNames} from '../../utility';
import './heading.scss';

/**
 * Heading:
 * Builds the requested HTML heading at the specified index level.
 *
 * @param {*} param0
 * @returns
 */
function Heading({
  level = 2,
  classes = '',
  html,
  text,
  children,
}) {

  if (!children) {
    return null;
  }

  let index = parseInt(level, 10);
  index = (!index || index < 1) ? 2 : index;

  const Tag = `h${(index < 7) ? index : 2}`; // default index = 2, most common use

  if (html || text) {
    return (
      <Tag
        className={classNames({
          'heading': !classes,
          [classes]: !!classes
        })}
        dangerouslySetInnerHTML={{__html: html || text}}
      />
    );
  }
  return (
    <Tag
      className={classNames({
        'heading': !classes,
        [classes]: !!classes
      })}
    >{children}</Tag>
  );
}

export default Heading;
