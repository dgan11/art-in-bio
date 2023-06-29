import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Album } from '../editor';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type AlbumCompProps = {
  album: Album;
}

function AlbumComp({ album }: AlbumCompProps) {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = album.links.length;

  const handleNext = () => {
    if (activeStep !== maxSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep !== 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  // newness
  const images = album.links.map(link => {
    return {
      original: link,
      thumbnail: link
    };
  });

  return (
    // <div className="relative mt-8 w-full max-w-xl mx-auto bg-black bg-opacity-90 overflow-hidden shadow-lg p-4">
    //   <h2 className="text-center text-white text-2xl mb-1">{album.name}</h2>
    //   <SwipeableViews index={activeStep} onChangeIndex={setActiveStep} enableMouseEvents>
    //     {album.links.map((item, index) => (
    //       <div key={index} className="flex justify-center items-center p-1">
    //         <img src={item} alt={`item ${index}`} className="max-w-full shadow-md" />
    //       </div>
    //     ))}
    //   </SwipeableViews>
    //   <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2">
    //     <button onClick={handleBack} disabled={activeStep === 0} className="p-2 text-white bg-gray-800 rounded-full shadow opacity-50">
    //       <FaChevronLeft />
    //     </button>
    //   </div>
    //   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2">
    //     <button onClick={handleNext} disabled={activeStep === maxSteps - 1} className="p-2 text-white bg-gray-800 rounded-full shadow opacity-50">
    //       <FaChevronRight />
    //     </button>
    //   </div>
    // </div>

    // newness
    <div className="relative mt-8 w-full max-w-xl mx-auto bg-black bg-opacity-90 overflow-hidden shadow-lg p-4">
      <h2 className="text-center text-white text-2xl mb-1">{album.name}</h2>
      <ImageGallery items={images} />
    </div>
  );
}

export default AlbumComp;