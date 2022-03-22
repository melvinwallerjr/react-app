import {Accordion, Breadcrumb, Heading} from '../components';

// temporary sample data
import accordionData from '../data/accordion-sample.json';

function AccordionPage() {
  const breadcrumb = {
    list: [
      {
        text: 'Home',
        href: '%PUBLIC_URL%',
        // tracking: '',
      },
      {
        text: 'Accordion',
        href: '%PUBLIC_URL%accordion',
        // tracking: '',
      },
    ],
  }

  return (
    <>
      <div className="container">
        <Breadcrumb {...breadcrumb} />

        <Heading level={1}>Accordion</Heading>
        <Accordion {...accordionData} />
      </div>
    </>
  );
}

export default AccordionPage;
