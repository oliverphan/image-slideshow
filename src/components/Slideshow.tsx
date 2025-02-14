import { useState } from 'react';
import './Slideshow.css';
import { Image } from '../App';

type SlideshowProps = {
  images: Image[];
}

const Slideshow = ({ images }: SlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageViewCount, setImageViewCount] = useState<Record<string, number>>(
    {
      [images[0].src]: 1
    }
  );

  const updateViewCount = (imgSrc: string) => {
    setImageViewCount(previousViewCount => ({
      ...previousViewCount,
      [imgSrc]: (previousViewCount[imgSrc] || 0) + 1,
    }));
  };

  const handleNextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    handleNav(newIndex)
  };

  const handlePrevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    handleNav(newIndex)
  };

  const handleNav = (newIndex: number) => {
    setCurrentIndex(newIndex);
    updateViewCount(images[newIndex].src);
  }

  return (
    <div className="slideshowContainer">
      <div className="slideshow">
        <button onClick={handlePrevSlide} aria-label="Previous Slide">&#10094;</button>

        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="slide"
        />

        <button onClick={handleNextSlide} aria-label="Next Slide">&#10095;</button>
      </div>

      <div className="navigationBar">
        {images.map((_, index) => (
          <button
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleNav(index)}
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          ></button>
        ))}
      </div>

      <div className="viewCount">
        <h2>View Counts:</h2>
        {Object.entries(imageViewCount).map(([imgSrc, count]) => (
          <p key={imgSrc}>
            {imgSrc.split('/').pop()}: {count} views
          </p>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
