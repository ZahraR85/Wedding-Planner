import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';

const ShoppingCard = () => {
  const { userId, shoppingCard, addToShoppingCard, removeFromShoppingCard, clearShoppingCard } = useAppContext(); 
  const [totalPrice, setTotalPrice] = useState(0); // Local state for total price

  // Fetch shopping card items
  const fetchShoppingCard = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/shoppingcards?userID=${userId}`);
      const { cardItems } = response.data;
      cardItems.forEach((item) => addToShoppingCard(item)); // Add items to context
    } catch (error) {
      console.error('Failed to fetch shopping card:', error);
      toast.error('Could not load shopping card. Please try again.');
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const total = shoppingCard.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  // Remove service from shopping card
  const removeService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:3001/shoppingcards`, {
        data: { userId, serviceId },
      });
      removeFromShoppingCard(serviceId); // Remove item from context
      toast.success('Service removed!');
    } catch (error) {
      toast.error('Failed to remove service!');
    }
  };

  // Clear the shopping card
  const handleClearShoppingCard = async () => {
    try {
      await axios.delete(`http://localhost:3001/shoppingcards/${userId}`);
      clearShoppingCard(); // Clear shopping card in context
      setTotalPrice(0); // Reset total price to 0
      toast.success('Shopping card cleared!');
    } catch (error) {
      toast.error('Failed to clear shopping card!');
    }
  };

  useEffect(() => {
    fetchShoppingCard();
  }, [userId]); // Re-fetch shopping card when userId changes

  useEffect(() => {
    calculateTotalPrice(); // Recalculate total price when shoppingCard changes
  }, [shoppingCard]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Your Shopping Card</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shoppingCard.length === 0 ? (
          <p className="text-xl text-center col-span-full">Your shopping card is empty.</p>
        ) : (
          shoppingCard.map((item) => (
            <div key={item.serviceId} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <h3 className="text-xl font-semibold text-center mb-2">{item.serviceName}</h3>
              <p className="text-gray-500 text-center mb-4">{item.description}</p>
              <span className="text-lg font-bold mb-2">${item.price.toFixed(2)}</span>
              <button
                onClick={() => removeService(item.serviceId)}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {shoppingCard.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <div className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</div>
          <button
            onClick={handleClearShoppingCard}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Clear Card
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCard;
