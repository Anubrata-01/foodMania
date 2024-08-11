// /* eslint-disable no-unreachable */
import React, { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncevalue, setDebouncevalue] = useState(value);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncevalue(value);
    }, delay);

    return () => {
      clearTimeout(timeId);
    };
  }, [value, delay]);
  return debouncevalue;
};

export default useDebounce;
