import {Breadcrumb, Comparison, Heading} from '../components';

// temporary sample data
import comparisonData from '../data/comparison-sample.json';

function ComparisonPage() {
  const breadcrumb = {
    list: [
      {
        text: 'Home',
        href: '/react-app/',
        // tracking: '',
      },
      {
        text: 'Comparison',
        href: '/react-app/comparison',
        // tracking: '',
      },
    ],
  }

  return (
    <>
      <div className="container">
        <Breadcrumb {...breadcrumb} />

        <Heading level={1}>Comparison</Heading>
      </div>

      <Comparison {...comparisonData} />

      <div className="container">
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        deliberate white space to illustrate sticky header
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <br /><br /><br /><br />
        <br /><br /><br /><br />
      </div>
    </>
  );
}

export default ComparisonPage;
