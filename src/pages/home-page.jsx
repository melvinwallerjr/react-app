import {Breadcrumb, Heading} from '../components';
import {GetLink} from '../utility';

function HomePage() {
  const breadcrumbList = [
    {
      text: 'Home',
      href: '/',
      // tracking: '',
    },
  ];

  const breadcrumb = {
    list: breadcrumbList,
  }

  return (
    <>
      <div className="container">
        <Breadcrumb {...breadcrumb} />

        <Heading level={1}>Components</Heading>
        <ul>
          <li><GetLink to="/accordion">Accordion</GetLink></li>
          <li><GetLink to="/comparison">Comparison</GetLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default HomePage;
