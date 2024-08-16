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
  const feemsg = feeDetails?.message
    ? feeDetails.message.replace(/<[^>]*>/g, "")
    : "";

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
              <span className="text-gray-600 flex gap-1 text-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  role="img"
                  aria-hidden="true"
                  strokecolor="rgba(2, 6, 12, 0.92)"
                  fillcolor="rgba(2, 6, 12, 0.92)"
                  className=" mt-1"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                  ></circle>
                  <path
                    d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                    fill="white"
                  ></path>
                  <defs>
                    <linearGradient
                      id="StoreRating20_svg__paint0_linear_32982_71567"
                      x1="10"
                      y1="1"
                      x2="10"
                      y2="19"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#21973B"></stop>
                      <stop offset="1" stopColor="#128540"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                {avgRating}
              </span>
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
