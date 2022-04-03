import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

render(<App />);

describe('App:', () => {
  test('Title text', () => {
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('Accordion link', () => {
    expect(screen.getByText('Accordion')).toBeInTheDocument();
  });

  test('Comparison link', () => {
    expect(screen.getByText('Comparison')).toBeInTheDocument();
  });

  test('Learn React link', () => {
    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });

  test('React Router link', () => {
    expect(screen.getByText('React Router')).toBeInTheDocument();
  });
});
