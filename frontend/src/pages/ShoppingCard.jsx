import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';

const ShoppingCard = () => {
  const { userId,isAuthenticated, shoppingCard, addToShoppingCard, removeFromShoppingCard, clearShoppingCard } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0); // Local state for total price
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must sign in to access this page.", { position: toast.POSITION.TOP_CENTER });
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);
  // Fetch shopping card items
  const fetchShoppingCard = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/shoppingcards?userID=${userId}`);
      const { cardItems } = response.data;

      // Add fetched items to the context
      cardItems.forEach((item) => {
        if (!shoppingCard.some((cardItem) => cardItem.serviceName === item.serviceName)) {
          addToShoppingCard(item);
        }
      });
    } catch (error) {
      console.error('Failed to fetch shopping card:', error);
      toast.error('Could not load shopping card. Please try again.');
    }
  };

  // Add a new service to the shopping card
  /*const addService = async (newService) => {
    if (shoppingCard.some((item) => item.serviceName === newService.serviceName)) {
      toast.warning('This service is already in your shopping card.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/shoppingcards`, {
        userId,
        service: newService,
      });

      addToShoppingCard(response.data.newCardItem);
      toast.success(`${newService.serviceName} added to your shopping card!`);
    } catch (error) {
      console.error('Failed to add service:', error);
      toast.error('Could not add service. Please try again.');
    }
  }; */

  // Calculate total price
  const calculateTotalPrice = () => {
    const total = shoppingCard.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  // Remove service from shopping card
  const removeService = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/shoppingcards`, {
        data: { userId, id }, // Use id for removal
      });
      removeFromShoppingCard(id); // Pass id for removal in context
      toast.success('Service removed!');
    } catch (error) {
      toast.error('Failed to remove service!');
    }
  };  

  // Clear the shopping card
  const handleClearShoppingCard = async () => {
    try {
      await axios.delete(`http://localhost:3001/shoppingcards/${userId}`);
      clearShoppingCard();
      setTotalPrice(0);
      toast.success('Shopping card cleared!');
    } catch (error) {
      toast.error('Failed to clear shopping card!');
    }
  };

  useEffect(() => {
    fetchShoppingCard();
  }, [userId]);

  useEffect(() => {
    calculateTotalPrice();
  }, [shoppingCard]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Your Shopping Card</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shoppingCard.length === 0 ? (
          <p className="text-xl text-center col-span-full">Your shopping card is empty.</p>
        ) : (
          shoppingCard.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <h3 className="text-xl font-semibold text-center mb-2">{item.serviceName}</h3>
              <span className="text-lg font-bold mb-2">${item.price.toFixed(2)}</span>
              <button
                onClick={() => removeService(item.id)}  // Pass unique ID for removal
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
              >Remove</button>
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
