import React, { useEffect, useState } from "react";
import { Swigy_url } from "../../constant/data";

const RestaurantCard = ({ item }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imageUrl = Swigy_url + item?.imageId;
    setImageSrc(imageUrl);
    setIsLoading(false);
    // Add preload link to the document head
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = imageUrl;
    link.as = "image";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [item?.imageId]);

  return (
    <article className="p-3 w-[130px] bg-white rounded shadow-md">
      <div className="flex items-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <img
            src={imageSrc}
            alt={item?.description}
            className="w-[100%] h-auto"
            loading="lazy"
          />
        )}
      </div>
    </article>
  );
};

export default React.memo(RestaurantCard);
