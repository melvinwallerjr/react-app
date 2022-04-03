import React from 'react';

import { Breadcrumb, Heading } from '../components';

function ErrorPage() {
  const breadcrumb = {
    list: [
      {
        text: 'Home',
        href: '%PUBLIC_URL%',
        // tracking: '',
      },
    ],
  };

  return (
    <>
      <div className="container">
        <Breadcrumb {...breadcrumb} />

        <Heading level={1}>Error</Heading>
        <p>Request page not found.</p>
      </div>
    </>
  );
}

export default ErrorPage;
