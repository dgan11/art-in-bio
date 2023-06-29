import React from 'react';
import SwipeableViews from 'react-swipeable-views';
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
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="relative mt-8 w-full max-w-xl mx-auto bg-black bg-opacity-90 overflow-hidden shadow-lg p-4">
      <h2 className="text-center text-white text-2xl mb-1">{album.name}</h2>
      <SwipeableViews index={activeStep} onChangeIndex={setActiveStep} enableMouseEvents>
        {album.links.map((item, index) => (
          <div key={index} className="flex justify-center items-center p-1">
            <img src={item} alt={`item ${index}`} className="max-w-full shadow-md" />
          </div>
        ))}
      </SwipeableViews>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <button onClick={handleBack} className="p-2 text-white bg-gray-800 rounded-full shadow">
          <FaChevronLeft />
        </button>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <button onClick={handleNext} className="p-2 text-white bg-gray-800 rounded-full shadow">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default AlbumComp;
