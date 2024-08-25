import React, { useMemo, useRef } from "react";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { NavLink } from "react-router-dom";
import RestaurantCardComponent from "./RestaurantCardComponent";
import useHandleArrow from "../../hooks/useHandleArrow";

const TopRestaurantInKolkata = ({ resdata, error, isLoading }) => {
  const restaurantChainKolkataTitle = useMemo(
    () =>
      resdata?.[1]?.card?.card?.header?.title ||
      "Top restaurant chains in Kolkata",
    [resdata]
  );

  const restaurantChainKolkataCards = useMemo(
    () =>
      resdata?.[1]?.card?.card?.imageGridCards?.info ||
      resdata?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
    [resdata]
  );

  const scrollRef = useRef(null);

  if (error) return <p>There is a problem: {error.message}</p>;

  return (
    <section className="mt-5 md:ml-[3%] w-full md:w-[95%]">
      <section className="ml-[8.5%] md:ml-[3%] flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-semibold">
          {restaurantChainKolkataTitle}
        </h1>
        <aside className="mr-[.5%] md:mr-[4%] flex gap-1.5 md:gap-3 hidden md:block">
          <button aria-label="leftButton" onClick={() => useHandleArrow(scrollRef, -600)}>
            <ArrowCircleLeftRoundedIcon style={{ fontSize: 32 }} />
          </button>
          <button aria-label="rightButton" onClick={() => useHandleArrow(scrollRef, 700)}>
            <ArrowCircleRightRoundedIcon style={{ fontSize: 32 }} />
          </button>
        </aside>
      </section>
      
      <section
        ref={scrollRef}
        className="w-full md:w-[95%] p-1 flex gap-4 overflow-x-scroll ml-4 md:ml-7 mt-2 scroll-smooth no-scrollbar"
      >
        {restaurantChainKolkataCards?.map((item, index) => {
          let entityId = item?.cta?.link;
          if (
            typeof entityId === "string" &&
            entityId.startsWith("https://www.swiggy.com/restaurants")
          ) {
            const collectionId = entityId.match(/collection_id=(\d+)/);
            entityId = collectionId ? collectionId[1] : entityId;
          }
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
          } = item?.info;
          
          return (
            <NavLink
              to={`/top-res/${item?.info?.id}`}
              key={item.id || index}
              className="flex-shrink-0 w-64 md:w-72"
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

export default TopRestaurantInKolkata;