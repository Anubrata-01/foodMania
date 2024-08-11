import { useAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { Swigy_url } from "../../constant/data";
import { cartItemsAtom } from "../../storeAtom/Atom";

const FoodItem = ({ item,restaurantName }) => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [showPopup, setShowPopup] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const { name, defaultPrice, price, description, imageId, id, category } = item.card.info;
  const itemPrice = defaultPrice || price;
  const trimmedDescription = description && description.substring(0, 138) + "..." || "";
  
  const { cartItem, itemQuantity, isDifferentCategory } = useMemo(() => {
    const cartItem = cartItems.find((item) => item.id === id);
    const itemQuantity = cartItem ? cartItem.quantity : 0;
    const isDifferentCategory = cartItems.length > 0 && !cartItems.some(item => item.category === category);
    return { cartItem, itemQuantity, isDifferentCategory };
  }, [cartItems, id, category]);

  const addItemToCart = useCallback(() => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { id, name, price: itemPrice, quantity: 1, category, imageId, trimmedDescription,restaurantName }];
    });
  }, [setCartItems, id, name, itemPrice, category, imageId, trimmedDescription]);

  const handleAddToCart = useCallback(() => {
    if (isDifferentCategory) {
      setShowPopup(true);
    } else {
      addItemToCart();
    }
  }, [isDifferentCategory, addItemToCart]);

  const handleRemoveFromCart = useCallback(() => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevItems.filter((item) => item.id !== id);
    });
  }, [setCartItems, id]);
console.log(cartItems);
  const handleStartFresh = useCallback(() => {
    setCartItems([{ id, name, price: itemPrice, quantity: 1, category, imageId, trimmedDescription,restaurantName}]);
    setShowPopup(false);
  }, [setCartItems, id, name, itemPrice, category, imageId, description]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 p-4 border border-sky-300 rounded-lg">
      <div className="flex-1 mb-4 sm:mb-0">
        <h3 className="font-semibold">{name}</h3>
        <p>₹{itemPrice / 100}</p>
        <div>
          {description && description.length > 140 ? (
            <div>
              <p className="text-gray-600">{isMore ? description : trimmedDescription}</p>
              <button
                className="hidden md:block font-bold"
                onClick={() => setIsMore(!isMore)}
              >
                {isMore ? "Less" : "More"}
              </button>
            </div>
          ) : (
            <p>{description}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center sm:ml-4">
        <img
          src={`${Swigy_url}${imageId}`}
          alt={name}
          className="w-24 h-24 object-cover rounded-md mb-2"
          loading="lazy"
        />
        {itemQuantity === 0 ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={handleAddToCart}
            aria-label="Add to Cart"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-l hover:bg-blue-600 transition-colors duration-300"
              onClick={handleRemoveFromCart}
              aria-label="Decrease Quantity"
            >
              -
            </button>
            <span className="bg-gray-200 px-3 py-1">{itemQuantity}</span>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600 transition-colors duration-300"
              onClick={handleAddToCart}
              aria-label="Increase Quantity"
            >
              +
            </button>
          </div>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p>
              This item is from a different category or restaurant. Do you want
              to start a new cart?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                onClick={() => setShowPopup(false)}
                aria-label="Cancel"
              >
                No
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleStartFresh}
                aria-label="Start Fresh"
              >
                Start Fresh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItem;

