import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

render(<App />);

test('Title text', () => {
  const text = screen.getByText('React');
  expect(text).toBeInTheDocument();
});

test('Accordion link', () => {
  const text = screen.getByText('Accordion');
  expect(text).toBeInTheDocument();
});

test('Comparison link', () => {
  const text = screen.getByText('Comparison');
  expect(text).toBeInTheDocument();
});

test('Learn React link', () => {
  const text = screen.getByText('Learn React');
  expect(text).toBeInTheDocument();
});

test('React Router link', () => {
  const text = screen.getByText('React Router');
  expect(text).toBeInTheDocument();
});
