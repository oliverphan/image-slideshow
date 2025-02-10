import { render, fireEvent, screen } from '@testing-library/react';
import Slideshow from './Slideshow';

const images = [
  { src: '/assets/image1.jpg', alt: 'Image 1' },
  { src: '/assets/image2.jpg', alt: 'Image 2' },
  { src: '/assets/image3.jpg', alt: 'Image 3' },
];

describe('Slideshow component', () => {
  test('renders the first image', () => {
    render(<Slideshow images={images} />);
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
  });

  test('buttons have proper accessibility roles and labels', () => {
    render(<Slideshow images={images} />);

    const nextButton = screen.getByLabelText('Next Slide');
    const prevButton = screen.getByLabelText('Previous Slide');

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
  });

  test('navigates to the next image', () => {
    render(<Slideshow images={images} />);
    fireEvent.click(screen.getByLabelText('Next Slide'));
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
  });

  test('wraps to the last image when previous button is clicked on the first image', () => {
    render(<Slideshow images={images} />);
    fireEvent.click(screen.getByLabelText('Previous Slide'));
    expect(screen.getByAltText('Image 3')).toBeInTheDocument();
  });

  test('wraps to the first image when next button is clicked on the last image', () => {
    render(<Slideshow images={images} />);
    const nextButton = screen.getByLabelText('Next Slide');

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
  });

  test('updates the view count when images change', () => {
    render(<Slideshow images={images} />);

    const nextButton = screen.getByLabelText('Next Slide');

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(screen.getByText('image1.jpg: 1 views')).toBeInTheDocument();
    expect(screen.getByText('image2.jpg: 1 views')).toBeInTheDocument();
    expect(screen.getByText('image3.jpg: 1 views')).toBeInTheDocument();
  });
});