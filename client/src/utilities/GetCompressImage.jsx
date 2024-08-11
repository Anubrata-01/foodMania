// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import imageCompression from 'browser-image-compression';
// import { Card } from 'react-bootstrap';



const getImageAsBlob = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return blob;
};

const compressBlobImage = async (blob) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  const compressedFile = await imageCompression(blob, options);
  return compressedFile;
};

const  GetCompressedImg = ({ imageUrl }) => {
  const [compressedImage, setCompressedImage] = useState(null);

  useEffect(() => {
    let blobUrl = null;

    const processImage = async () => {
      try {
        const blob = await getImageAsBlob(imageUrl);
        const compressedFile = await compressBlobImage(blob);
        blobUrl = URL.createObjectURL(compressedFile);
        setCompressedImage(blobUrl);
      } catch (error) {
        console.log('Image processing failed:', error);
      }
    };

    processImage();
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, []);

  return (
    <section>
      {compressedImage ? (
        <img height={'500px'} className="w-full h-40 object-cover"  src={compressedImage} alt={'compressed'} />
      ) : (
        <div style={{ height: '170px' }}>
          Loading...
        </div>

      )}
    </section>
  );
};

export default GetCompressedImg;