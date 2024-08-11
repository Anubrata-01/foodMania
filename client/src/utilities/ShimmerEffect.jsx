import React from 'react';
import './shimmer.css';

function ShimmerEffect() {
    return (
        <div className="w-full">
            <div className="w-full text-white flex justify-center items-center gap-5 flex-col h-[350px] bg-slate-900">
                <div className="relative flex items-start">
                    <img
                        className="w-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
                        alt="Shimmer loader"
                    />
                    <span className="loader"></span>
                </div>
                <h1 className="text-lg lg:text-2xl ">
                    Looking for great food near you....
                </h1>
            </div>

            <div className="w-[100%] mx-auto py-6 flex flex-wrap gap-10 ml-[3%]">
                {Array(20).fill("").map((__, i) => (
                    <div key={i} className="w-[280px] animate h-[350px] rounded-md shimmer-card"></div>
                ))}
            </div>
        </div>
    );
}

export default ShimmerEffect;
