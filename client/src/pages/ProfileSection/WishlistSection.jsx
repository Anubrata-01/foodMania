const WishlistSection = () => {
  const products = [
    // Empty array to simulate no products in the wishlist.
    // You can add your product objects here when needed.
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Wishlist</h2>
      {products.length === 0 ? (
        <div className="text-gray-600 text-center">
          {/* Message displayed when there are no products */}
          <p>No items in your wishlist at the moment.</p>
          <p>Stay tuned, this features  will be added soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistSection;

