import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders movie search header', () => {
  render(<App />);
  const headerElement = screen.getByText('Movie Search');
  expect(headerElement).toBeInTheDocument();
});
