import React from 'react';

import { Breadcrumb, GetLink, Heading } from '../components';

function HomePage() {
  const breadcrumbList = [
    {
      text: 'Home',
      href: '%PUBLIC_URL%',
      // tracking: '',
    },
  ];

  const breadcrumb = {
    list: breadcrumbList,
  };

  return (
    <>
      <div className="container">
        <Breadcrumb {...breadcrumb} />

        <Heading level={1}>Components</Heading>
        <ul>
          <li><GetLink to="%PUBLIC_URL%accordion">Accordion</GetLink></li>
          <li><GetLink to="%PUBLIC_URL%comparison">Comparison</GetLink></li>
        </ul>
      </div>
    </>
  );
}

export default HomePage;
