import { useAppContext } from '../context/AppContext';

const ShoppingCard = () => {
  const { shoppingCard, removeFromShoppingCard, clearShoppingCard } = useAppContext();

  // Calculate the total sum of the shopping card
  const totalAmount = shoppingCard.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Your Shopping Cart</h2>

      {/* Shopping Items List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shoppingCard.length === 0 ? (
          <p className="text-xl text-center col-span-full">Your shopping cart is empty.</p>
        ) : (
          shoppingCard.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <img
                src={item.image} // You can replace this with a static or dynamic image path
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-center mb-2">{item.name}</h3>
              <p className="text-gray-500 text-center mb-4">{item.description}</p>
              <div className="flex justify-between items-center w-full">
                <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => removeFromShoppingCard(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total and Clear Cart Section */}
      {shoppingCard.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <div className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</div>
          <button
            onClick={clearShoppingCard}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCard;
