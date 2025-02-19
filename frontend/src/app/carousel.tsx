import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel: React.FC = () => {
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div>
        <img src="https://via.placeholder.com/800x400?text=Image+1" alt="Image 1" />
      </div>
      <div>
        <img src="https://via.placeholder.com/800x400?text=Image+2" alt="Image 2" />
      </div>
      <div>
        <img src="https://via.placeholder.com/800x400?text=Image+3" alt="Image 3" />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
