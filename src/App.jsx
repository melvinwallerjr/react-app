import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './pages/home-page';
import AccordionPage from './pages/accordion-page';
import ComparisonPage from './pages/comparison-page';
import ErrorPage from './pages/error-page';

import {Footer, Header} from './components'
import headerData from './data/header-sample.json';
import './App.scss';

/**
 * NOTE: "container"
 * Class is often repeated in a page to allow for components that should not be wrapped in a breakpoint.
 * Using this approach allows components to span the full width of the browser, like "comparison" does.
 */

function App() {
  const path = window ? window.location.pathname : '';

  return (
    <Router>
      <Header {...headerData} path={path} />
      <main>
        <Routes>
          <Route path={process.env.PUBLIC_URL} exact element={<HomePage />} />
          <Route path={`${process.env.PUBLIC_URL}/accordion`} element={<AccordionPage />} />
          <Route path={`${process.env.PUBLIC_URL}/comparison`} element={<ComparisonPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
