import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { moodDataAtom } from '../storeAtom/Atom';

const useMoodItemsData = (userId) => {
  const [, setMoodData] = useAtom(moodDataAtom);

  useEffect(() => {
    const fetchMoodDataItems = async () => {
      try {
        // const Mood_Item_Url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.469788246717883&lng=88.3891574665904&collection=${userId}&filters=&type=rcv2&offset=0&page_type=null`;
        const Mood_Item_Url = `https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D22.469788246717883%26lng%3D88.3891574665904%26collection%3D${userId}%26tags%3Dlayout_CCS_Dosa%26sortBy%3D%26filters%3D%26type%3Drcv2%26offset%3D0%26page_type%3Dnull`; //CORS-handled url
        const response = await fetch(Mood_Item_Url);
        if (!response.ok) {
          throw new Error("Failed to fetch mood data");
        }
        const data = await response.json();
        setMoodData(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchMoodDataItems();
    }
  }, [userId, setMoodData]);
};

export default useMoodItemsData;


// const id="https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.469788246717883&lng=88.3891574665904&str=Burger%20King&trackingId=90c19d56-cb6f-aadf-4a31-795ce89faefc&submitAction=ENTER&queryUniqueId=3f377dab-e34a-cda0-d560-4491b9af3a0f"
// "https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.469788246717883&lng=88.3891574665904&str=Momos&trackingId=fc07462b-6f2b-d6fb-c0ec-1082d5309389&submitAction=ENTER&queryUniqueId=7ac2310e-7176-a684-6f6d-70a352cd485b"