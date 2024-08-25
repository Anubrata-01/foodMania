import React, { useMemo, useState, } from "react";
import RestaurantCardComponent from "../TopRestaurants/RestaurantCardComponent";
import { NavLink } from "react-router-dom";
import { OnlineFoodDeliverTitle } from "../../constant/data";
import { useAtom } from "jotai";
import { userIdAtom } from "../../storeAtom/Atom";
import FilterButtons from './FilterButtons'; 

const OnlineFoodDeliveryComponents = ({ resdata, error, isLoading }) => {
  const [, setUsersId] = useAtom(userIdAtom);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const OnlinerestaurantCards = useMemo(
    () =>
      resdata?.[4]?.card?.card?.imageGridCards?.info ||
      resdata?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [],
    [resdata]
  );
  const extractCost = (costString) => {
    const match = costString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };
  const filteredRestaurants = useMemo(() => {
    let filtered = OnlinerestaurantCards;

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item?.info?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilter) {
      filtered = filtered.filter((item) => {
        const { avgRating, costForTwo, veg,sla } = item?.info || {};
        const cost = extractCost(costForTwo);
        switch (selectedFilter) {
          case "Fast Delivery":
            return sla?.deliveryTime<=24;
          case "Ratings 4.0+":
            return avgRating >= 4.0;
          case "Offers":
            return item?.info?.aggregatedDiscountInfoV3;
          case "Pure Veg":
            return <p>No Veg Restaurants is Presents</p>;
          case "Less than Rs.300":
            return cost <= 300;
          case "Rs.300-Rs.600":
            return cost > 300 && cost <= 600;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [OnlinerestaurantCards, selectedFilter, searchQuery]);
console.log(filteredRestaurants);
  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <section className="mt-5 px-4 sm:px-6 lg:px-8 md:w-[93%] w-[100%] mx-auto">
      <h1 className="text-lg sm:text-2xl font-semibold mb-4 ml-4 md:ml-4 ">
        {OnlineFoodDeliverTitle}
      </h1>
      <FilterButtons
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className=" w-[100%] md:w-[94%] ml-2 md:ml-0 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRestaurants.map((item, index) => {
          const {
            id,
            name,
            locality,
            cuisines,
            costForTwo,
            cloudinaryImageId,
            isOpen,
            sla,
            areaName,
            avgRating,
            aggregatedDiscountInfoV3,
          } = item?.info;
          return (
            <NavLink
              to={`/online-restaurant/${id}`}
              key={`${id}-${index}`}
              onClick={() => setUsersId()}
              className="block rounded-lg overflow-hidden"
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
      </div>
    </section>
  );
};

export default OnlineFoodDeliveryComponents;


