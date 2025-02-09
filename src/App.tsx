import Slideshow from "./components/Slideshow";

export interface Image {
  src: string;
  alt: string;
}

export default function App() {
  const images: Image[] = [
    {
      src: "/assets/coffee-777612_640.jpg",
      alt: "A cup of coffee with a saucer and spoon"
    },
    {
      src: "/assets/coins-1523383_1920.jpg",
      alt: "A pile of coins stacked on top of each other"
    },
    {
      src: "/assets/posing-999199_1920.jpg",
      alt: "A skiier posing in front of a scenic background"
    },
    {
      src: "/assets/raspberries-1426859_1920.jpg",
      alt: "Fresh raspberries in a bowl"
    }
  ];

  return (
    <div className="App">
      <h1>Image Slideshow</h1>
      <Slideshow images={images} />
    </div>
  );
}
