import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Footer } from './Footer';

describe('Footer component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });

  it('renders the correct text', () => {
    render(<Footer />);
    expect(screen.getByText('@Anntrick 2023')).toBeInTheDocument();
  });
});
