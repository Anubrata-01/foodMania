import React, { useEffect, useMemo, useCallback } from "react";
import useTopRestaurantDetails from "../../hooks/useTopRestaurantDetails";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { topRestaurantDetailsDataAtom, userIdAtom } from "../../storeAtom/Atom";
import CardOffer from "../../components/CardDetailsComponents/CardOffer";
import SearchForDishes from "../../components/CardDetailsComponents/SearchForDishes";
import RestaurantCardInterface from "../../components/CardDetailsComponents/RestaurantCardInterface";
import AccordianOfFoods from "../../components/CardDetailsComponents/AccordianOfFoods";

const FoodDeliveryInterface = () => {
  const { userId} = useParams();
  const [, setUserId] = useAtom(userIdAtom);
  const [topRestaurantDetailsData, setTopRestaurantDetailsData] = useAtom(topRestaurantDetailsDataAtom);

  useTopRestaurantDetails(userId);
  useEffect(() => {
    window.scrollTo(0, 0);
    setUserId(userId);
    return () => setTopRestaurantDetailsData(null);
  }, [userId, setUserId, setTopRestaurantDetailsData]);

  const RestaurantDetails = useMemo(
    () => topRestaurantDetailsData?.data?.cards[2],
    [topRestaurantDetailsData]
  );
console.log(RestaurantDetails);
  const filterAccordianCards = useMemo(() => 
    topRestaurantDetailsData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
      ?.filter(card => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"),
    [topRestaurantDetailsData]
  );
console.log(filterAccordianCards);
  const renderAccordionItem = useCallback(({ card }, index) => (
    <AccordianOfFoods key={card?.card?.title || index} details={card?.card} restaurantName={ RestaurantDetails && RestaurantDetails?.card?.card?.info} />
  ), []);

  return (
    <section className="w-[90%] md:w-[50%] relative left-[5%] md:left-[20%] border-2 bg-stone-100 p-4">
      <RestaurantCardInterface RestaurantDetails={RestaurantDetails} />
      <CardOffer RestaurantDetails={RestaurantDetails} />
      <SearchForDishes />
      {filterAccordianCards?.map(renderAccordionItem)}
    </section>
  );
};

export default React.memo(FoodDeliveryInterface);



