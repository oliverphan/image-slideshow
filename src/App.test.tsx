import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./components/Slideshow', () => ({
  default: () => <div data-testid="slideshow" />,
}));

describe('App Component', () => {
  it('renders the App without crashing', () => {
    render(<App />);
    
    expect(screen.getByText('Image Slideshow')).toBeInTheDocument();
    expect(screen.getByTestId('slideshow')).toBeInTheDocument();
  });
});
