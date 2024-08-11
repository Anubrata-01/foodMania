import React from "react";
import ShimmerCard from "../../utilities/ShimmerCard";

const RestaurantCardInterface = ({ RestaurantDetails }) => {
  const {
    name,
    areaName,
    avgRating,
    cuisines,
    costForTwoMessage,
    totalRatingsString,
    sla,
    feeDetails,
  } = RestaurantDetails?.card?.card?.info || {};

  // Check if feeDetails and feeDetails.message are defined before using replace
  const feemsg = feeDetails?.message ? feeDetails.message.replace(/<[^>]*>/g, "") : "";

  if (!name) return <ShimmerCard />;

  return (
    <div className="max-w-[90%] mx-auto mt-16 md:mt-16 bg-gradient-to-t px-4 pb-4 from-slate-200/70 rounded-[30px] shadow-md overflow-hidden md:max-w-xl">
      <div className="md:flex border border-slate-200/70 rounded-[30px] bg-white">
        <div className="p-6">
          <div className="relative top-0 uppercase tracking-wide text-2xl text-black font-bold">
            {name}
          </div>
          <div className="mt-2 text-gray-800">
            <div className="flex items-center font-bold">
              <i className="fi fi-ss-circle-star mt-1 text-green-600 text-lg"></i>
              <span className="text-gray-600"> {avgRating}</span>
              <span className="ml-2 text-sm text-gray-700">
                {totalRatingsString}
              </span>
              <span className="mx-2">·</span>
              <span className="text-gray-700">{costForTwoMessage}</span>
            </div>
            <div className="mt-1">
              <a href="#" className="text-orange-600 underline font-bold">
                {cuisines?.map((cuisine, index) => (
                  <span key={index}>
                    {cuisine}
                    {index < cuisines.length - 1 && ", "}
                  </span>
                ))}
              </a>
            </div>
            <div className="mt-2 flex items-center font-bold text-black gap-2">
              <div className="w-[9px] flex flex-col justify-center items-center">
                <div className="w-[7px] h-[7px] bg-gray-500 rounded-full"></div>
                <div className="w-[1px] h-[25px] bg-gray-500"></div>
                <div className="w-[7px] h-[7px] bg-gray-500 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-1 text-sm font-semibold">
                <p>
                  Outlet{" "}
                  <span className="text-gray-500 font-normal">{areaName}</span>
                </p>
                <p>{sla?.slaString}</p>
              </div>
            </div>
          </div>
          <hr className="w-full mt-4" />
          <div className="mt-2 flex items-center gap-2 text-gray-700">
            <img
              className="w-6"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/" +
                feeDetails?.icon
              }
              alt=""
            />
            <span className="ml-2 font-bold text-gray-400">{feemsg}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardInterface;

