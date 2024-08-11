import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { topRestaurantDetailsDataAtom } from '../storeAtom/Atom'

const useTopRestaurantDetails = (userId) => {
    const[ ,setTopRestaurantDetailsData]=useAtom(topRestaurantDetailsDataAtom)
  useEffect(()=>{
    const fetchTopResChainInKolkata=async()=>{
        
        try{
            // const response= await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.469788246717883&lng=88.3891574665904&restaurantId=${userId}&catalog_qa=undefined&submitAction=ENTER`);
            const response=await fetch(`https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Fmenu%2Fpl%3Fpage-type%3DREGULAR_MENU%26complete-menu%3Dtrue%26lat%3D22.469788246717883%26lng%3D88.3891574665904%26restaurantId%3D${userId}%26catalog_qa%3Dundefined%26submitAction%3DENTER`);// CORS-handled url
            if(!response.ok){
                throw new Error("faild to fetched TopRestaurantChainInKolkata")
            }
        
            const data=await response.json();
            setTopRestaurantDetailsData(data);
            console.log(data);
        }catch(err){
            console.log("Error is: ",err)
        }
    }
    if(userId){
        fetchTopResChainInKolkata()
    }
  },[userId,setTopRestaurantDetailsData])
}

export default useTopRestaurantDetails