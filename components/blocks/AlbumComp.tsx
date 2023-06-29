import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Album } from '../editor';
import { useState } from 'react';

type AlbumCompProps = {
  album: Album;
}

function AlbumComp({ album }: AlbumCompProps) {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = album.links.length;

  // newness
  const images = album.links.map(link => {
    return {
      original: link,
      thumbnail: link
    };
  });

  return (
    <div className="relative mt-8 w-full max-w-xl mx-auto bg-black bg-opacity-90 overflow-hidden shadow-lg p-4">
      <h2 className="text-center text-white text-2xl mb-1">{album.name}</h2>
      <ImageGallery items={images} />
    </div>
  );
}

export default AlbumComp;