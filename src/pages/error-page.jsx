import {Breadcrumb, Heading} from '../components';

function ErrorPage() {
  const breadcrumb = {
    list: [
      {
        text: 'Home',
        href: '/',
        // tracking: '',
      },
    ],
  }

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
