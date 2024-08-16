import React, { useEffect, useMemo } from "react";
import RestaurantCardComponent from "../../components/TopRestaurants/RestaurantCardComponent";
import { NavLink, useLocation } from "react-router-dom";
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

  if (!title) return <ShimmerCard/>;
  console.log(moodRescards);

  return (
    <section className=" ">
      <section className="ml-[16%] mt-[2%] md:ml-[7%]">
        <div>
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-lg text-gray-700">{description}</p>
        </div>
      </section>
      <section className="flex flex-wrap justify-center mt-[2%]">
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
            <NavLink to={`/mod-restaurant/${card?.card?.card?.info?.id}`} key={index}>
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

