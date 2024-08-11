
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import API_URL from '../constant/data';
import { restaurantAtom } from '../storeAtom/Atom';

// Fetch function to get data from the API with AbortController
const fetchData = async () => {
  const controller = new AbortController();
  const signal = controller.signal;

  // Attach signal to fetch options
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useRestaurantData = () => {
  const [resdata, setResdata] = useAtom(restaurantAtom);

  const { data, error, isLoading } = useQuery({
    queryKey: ['restaurantData'],
    queryFn: fetchData,
    onSuccess: (data) => {
      setResdata(data?.data?.cards || []);
    },
  });

  return { resdata: data?.data?.cards || resdata, error, isLoading };
};

export default useRestaurantData;
