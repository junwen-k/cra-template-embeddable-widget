import { render, screen } from '@testing-library/react';
import Widget from './Widget';

test('renders learn react link', () => {
  render(<Widget />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders message', () => {
  render(<Widget message="Hello World" />);
  const messageElement = screen.getByText(/Hello World/i);
  expect(messageElement).toBeInTheDocument();
});
