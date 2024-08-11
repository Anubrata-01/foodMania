
import React from "react";
import { Offer_img } from "../../constant/data";

const CardOffer = ({ RestaurantDetails }) => {
  const descriptionList = RestaurantDetails?.card?.card?.info?.aggregatedDiscountInfo?.descriptionList;

  if (!descriptionList || descriptionList.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 sm:mt-8 md:mt-10">
      <h2 className="text-sm sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 mt-6 md:ml-[1%] text-center text-neutral-500">Deals For You</h2>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 -mt-3">
        {descriptionList.map((offer, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border-2 w-full sm:w-[calc(50%-12px)] md:w-[calc(33%-16px)] lg:w-[calc(42%-18px)] p-2 sm:p-2.5 rounded-lg text-black font-semibold sm:font-bold"
          >
            <img 
              src={Offer_img} 
              alt="Offer" 
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0"
            />
            <div className="flex flex-col text-xs sm:text-sm md:text-base">
              {offer?.meta?.split(" | ").map((part, subIndex) => (
                <span key={subIndex}>{part}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default React.memo(CardOffer);
