import {classNames} from '../../utility';
import './heading.scss';

function Heading({
  level = 2,
  classes = '',
  children,
}) {

  if (!children) {
    return null;
  }

  let index = parseInt(level, 10);
  index = (!index || index < 1) ? 2 : index;

  const Tag = `h${(index < 7) ? index : 2}`; // default index = 2, most common use

  return (
    <Tag className={classNames({
      'heading': !classes,
      [classes]: !!classes
    })}>{children}</Tag>
  );
}

export default Heading;
