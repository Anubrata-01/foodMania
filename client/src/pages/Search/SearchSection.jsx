import React, { useMemo, useState, useEffect } from 'react';
import useRestaurantData from '../../hooks/useRestaurantData';
import useDebounce from '../../hooks/useDebounce';
import SearchedComponentCard from './SearchedComponentCard';
import { NavLink, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { topRestaurantDetailsDataAtom } from '../../storeAtom/Atom';

const SearchSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [displayRestaurant, setDisplayRestaurant] = useState(false);
  const [allRestaurantdata, setAllRestaurantdata] = useState([]);
  const [allSearchdata, setAllSearchdata] = useState([]);
  const [topRestaurantDetailsData, setTopRestaurantDetailsData] = useAtom(topRestaurantDetailsDataAtom);

  const location = useLocation();
  const { resdata, error, isLoading } = useRestaurantData();

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const debouncevalueSearchInput = useDebounce(searchInput, 350);

  const restaurantChainKolkataCards = useMemo(() =>
    resdata?.[1]?.card?.card?.imageGridCards?.info ||
    resdata?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [],
    [resdata]
  );

  const moodTodayCards = useMemo(() =>
    resdata?.[0]?.card?.card?.imageGridCards?.info ||
    resdata?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [],
    [resdata]
  );

  useEffect(() => {
    if (location.pathname === "/search") {
      setTopRestaurantDetailsData([]);
    }
    if (resdata) {
      setAllRestaurantdata([...restaurantChainKolkataCards, ...moodTodayCards]);
    }
  }, [resdata, restaurantChainKolkataCards, moodTodayCards, location.pathname, setTopRestaurantDetailsData]);
console.log(allRestaurantdata);

  useEffect(() => {
    if (debouncevalueSearchInput) {
      setDisplayRestaurant(true);
      const filteredData = allRestaurantdata.filter((restaurant) =>
        restaurant?.info?.name?.toLowerCase().includes(debouncevalueSearchInput.toLowerCase()) ||
        restaurant?.description?.toLowerCase().includes(debouncevalueSearchInput.toLowerCase())
      );
      setAllSearchdata(filteredData);
    } else {
      setDisplayRestaurant(false);
      setAllSearchdata([]);
    }
  }, [debouncevalueSearchInput, allRestaurantdata]);

  const handleExploreSearchedRestaurantFood = (item) => {
    console.log(item);
  };

  return (
    <div className='bg-slate-300 min-h-screen overflow-scroll no-scrollbar '>
      <div className='w-[80%] md:w-[40%] ml-[10%] md:ml-[30%]'>
        <input
          type="text"
          placeholder='Search your favourite restaurants...'
          value={searchInput}
          className='w-full rounded-md p-4 border border-neutral-500 mt-10'
          onChange={handleInputChange}
        />
      </div>
      {displayRestaurant ? (
        <div className='w-[80%] md:w-[40%] h-[430px]  overflow-scroll ml-[10%] md:ml-[30%] mt-[2%] no-scrollbar'>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading data</p>}
          <ul>
            {allSearchdata.length > 0 ? (
              allSearchdata.map((restaurant, index) => {
                let entityId=restaurant?.action?.link;
                if (
                  typeof entityId === "string" &&
                  entityId.startsWith("https://www.swiggy.com/collections")
                ) {
                  const collectionId = entityId.match(/collection_id=(\d+)/);
                  entityId = collectionId ? collectionId[1] : entityId;
                }
               return (
                <NavLink
                  to={`/searched-food/${restaurant?.info?.id ||entityId}`}
                  key={index}
                  className='py-4'
                  onClick={() => handleExploreSearchedRestaurantFood(restaurant)}
                >
                  <SearchedComponentCard restaurant={restaurant} />
                </NavLink>
              )})
            ) : (
              <p className='font-extrabold text-lg text-center'>No Matches Found!</p>
            )}
          </ul>
        </div>
      ) : (
        <div className="bg-slate-300 flex justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-600 text-center">
            Nothing to Show!
          </p>
           
        </div>
      </div>
      )}
    </div>
  );
};

export default SearchSection;




