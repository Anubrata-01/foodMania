import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useMoodItemsData from "../../hooks/useMoodItemsData";
import ItemsDetailsContainer from "./ItemsDetailsContainer";
import { useAtom } from "jotai";
import {
  moodDataAtom,
  topRestaurantDetailsDataAtom,
  userIdAtom,
} from "../../storeAtom/Atom";

const MoodItemContainer = () => {
  const { userId } = useParams();
  const [, setUserId] = useAtom(userIdAtom);
  const [moodData] = useAtom(moodDataAtom);
  const [, setTopRestaurantDetailsData] = useAtom(topRestaurantDetailsDataAtom);
  useMoodItemsData(userId);
  useEffect(() => {
    setUserId(userId);
    return () => setTopRestaurantDetailsData([]);
  }, [userId, setUserId, setTopRestaurantDetailsData]);

  console.log(moodData);

  return (
    <div className="">
      <ItemsDetailsContainer Mooddata={moodData} />
    </div>
  );
};

export default React.memo(MoodItemContainer);
