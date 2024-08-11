import React from 'react'

const useHandleArrow = (scrollRef,ammount) => {
    if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: ammount,
          behavior: "smooth",
        });
      }
 
}

export default useHandleArrow