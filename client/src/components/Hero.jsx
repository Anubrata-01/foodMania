import React, { lazy, Suspense, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import { moodDataAtom, topRestaurantDetailsDataAtom } from "../storeAtom/Atom";
import useRestaurantData from "../hooks/useRestaurantData";
import ShimmerEffect from "../utilities/ShimmerEffect";
const RestaurantContainer = lazy(() => import("./RestaurantComponent/RestaurantContainer"));
const TopRestaurantChainInKolkata = lazy(() => import("./TopRestaurants/TopRestaurantInKolkata"));
const LazyOnlineFoodDeliverComponents = lazy(() => import("./OnlineFoodComponents/OnlineFoodDeliveryComponents"));

const Hero = () => {
  const { resdata, error, isLoading } = useRestaurantData();
  const [, setMoodData] = useAtom(moodDataAtom);
  const [, setTopRestaurantDetailsData] = useAtom(topRestaurantDetailsDataAtom);
  const location = useLocation();

  const resetData = useCallback(() => {
    setMoodData([]);
    setTopRestaurantDetailsData([]);
  }, [setMoodData, setTopRestaurantDetailsData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname === "/") {
      resetData();
    }
  }, [location.pathname, resetData]);

  const sharedProps = { resdata, error, isLoading };

  if (isLoading) return <ShimmerEffect />;

  return (
    <section className="bg-gray-200 p-3">
      <Suspense fallback={<ShimmerEffect />}>
        <RestaurantContainer {...sharedProps} />
        <TopRestaurantChainInKolkata {...sharedProps} />
        <LazyOnlineFoodDeliverComponents {...sharedProps} />
      </Suspense>
    </section>
  );
};

export default React.memo(Hero);

