import React from 'react';
import { Swigy_url } from '../../constant/data';

const SearchedComponentCard = ({ restaurant }) => {
  const {
    name,
    cloudinaryImageId,
    areaName,
    imageId,
    description,
    accessibility,
    action
  } = restaurant?.info || restaurant;

  const defaultImgUrl = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/";

  const imageUrl = cloudinaryImageId 
    ? `${Swigy_url}${cloudinaryImageId}` 
    : imageId 
      ? `${defaultImgUrl}${imageId}` 
      : `${defaultImgUrl}default_image.jpg`;

  return (
    <section>
      <div className='flex justify-between mt-2 border-b border-gray-400'>
        <div className='text-stone-600'>
          <p>{name || description}</p>
          <p>{areaName}</p>
        </div>
        {/* <a href={action?.link} target="_blank" rel="noopener noreferrer"> */}
          <img 
            src={imageUrl} 
            alt={accessibility?.altText || name || 'Restaurant'} 
            className='w-[50px] h-[50px] rounded-md object-cover' 
          />
        {/* </a> */}
      </div>
    </section>
  );
}

export default SearchedComponentCard;
