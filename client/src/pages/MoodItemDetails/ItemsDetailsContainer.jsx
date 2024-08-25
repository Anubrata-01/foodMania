import React, { useMemo } from "react";
import RestaurantCardComponent from "../../components/TopRestaurants/RestaurantCardComponent";
import { NavLink } from "react-router-dom";
import ShimmerCard from "../../utilities/ShimmerCard";

const ItemsDetailsContainer = ({ Mooddata }) => {
  const { title, description } = useMemo(() => {
    const cardData = Mooddata?.data?.cards[0]?.card?.card;
    return {
      title: cardData?.title,
      description: cardData?.description,
    };
  }, [Mooddata]);

  const moodRescards = useMemo(() => {
    const cards = Mooddata?.data?.cards || [];
    return cards.filter(
      (data) =>
        data?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    );
  }, [Mooddata]);

  if (!title) return <div className="ml-[14%] md:ml-0"><ShimmerCard /></div>;

  return (
    <section className="container mx-auto px-4 ml-[6%] md:ml-[5%]">
      <section className="mt-8 mb-6 ">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg text-gray-700 mt-2">{description}</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {moodRescards?.map((card, index) => {
          const {
            name,
            locality,
            cuisines,
            costForTwo,
            cloudinaryImageId,
            isOpen,
            sla,
            areaName,
            avgRating,
            aggregatedDiscountInfoV3
          } = card?.card?.card?.info;

          return (
            <NavLink 
              to={`/mod-restaurant/${card?.card?.card?.info?.id}`} 
              key={index}
              className="block h-full"
            >
              <RestaurantCardComponent
                name={name}
                locality={locality}
                cuisines={cuisines}
                costForTwo={costForTwo}
                imageUrl={cloudinaryImageId}
                isOpen={isOpen}
                sla={sla?.slaString}
                areaName={areaName}
                avgRating={avgRating}
                aggregatedDiscountInfoV3={aggregatedDiscountInfoV3}
              />
            </NavLink>
          );
        })}
      </section>
    </section>
  );
};

export default ItemsDetailsContainer;