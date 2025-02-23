import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from 'react-icons/fa';
import "../App.css";

// Stripe imports
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QfqZ64ZILbzFClJqUkwY9tPX9JKuN6HtAlpNxZ4VVZhMMqgnU8oRAvsNjbxfTct2qhvUascmYkgb966bqwEajnT00UXpFmhTm');  // Replace with your actual public key

const ShoppingCard = () => {
  const { userId, isAuthenticated, shoppingCard, setShoppingCard } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  // Fetch shopping card items from the backend
  const fetchShoppingCard = async () => {
    if (!userId) {
      toast.warn('User not authenticated. Please sign in.');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/shoppingcards?userID=${userId}`);
      const { cardItems } = response.data;
      setShoppingCard(cardItems); // Update state with fetched data
    } catch (error) {
      console.error('Failed to fetch shopping card:', error);
      toast.error('Could not load shopping card. Please try again.');
    }
  };

  // Calculate total price whenever shopping card changes
  const calculateTotalPrice = () => {
    const total = shoppingCard.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  // Remove a service from the shopping card
  const removeService = async (serviceName) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/shoppingcards`, {
        data: { userID: userId, serviceName },
      });

      // Update the state locally
      const updatedCard = shoppingCard.filter((item) => item.serviceName !== serviceName);
      setShoppingCard(updatedCard);
      setTotalPrice(updatedCard.reduce((sum, item) => sum + item.price, 0));

      toast.success('Service removed completely!');
    } catch (error) {
      console.error('Failed to remove service:', error);
      toast.error('Failed to remove service!');
    }
  };

  // Handle checkout (Stripe)
  const handleCheckout = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }
  
    // Prepare items for the checkout session
    const itemsForCheckout = shoppingCard.map((item) => ({
      name: item.serviceName,
      price: item.price,
      quantity: 1,
    }));
  
    try {
      // Create a checkout session on the backend
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/payment/create-checkout-session`, { items: itemsForCheckout });
  
      if (response.data.id) {
        const { id } = response.data;
  
        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
          sessionId: id,
        });
  
        if (error) {
          console.error(error);
          toast.error("There was an issue with the payment process.");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    }
  };  
  
  // Fetch shopping card when the component mounts or userId changes
  useEffect(() => {
    if (userId) {
      fetchShoppingCard();
    }
  }, [userId]);

  // Recalculate total price whenever shopping card updates
  useEffect(() => {
    calculateTotalPrice();
  }, [shoppingCard]);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-customBg1">
      <ToastContainer />
      {/* Left Side: Shopping Card */}
      <div className="flex-1 p-4 md:p-10">
        <h2 className="text-xl lg:text-3xl font-bold text-center text-BgFont mb-6 md:mb-10">Your Shopping Card</h2>
        {shoppingCard.length === 0 ? (
          <p className="text-lg lg:text-xl text-BgFont text-center">Your shopping card is empty.</p>
        ) : (
          <div className="flex flex-col space-y-6">
            {shoppingCard.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-row items-center"
              >
                <h3 className="w-full md:w-1/3 text-lg lg:text-2xl font-semibold text-center text-red-500 m-2">
                  {item.serviceName}
                </h3>
                <span className="w-full md:w-1/3 text-m lg:text-lg text-BgFont font-semibold ml-10">
                  {item.price.toFixed(2)} $
                </span>
                <FaTrash
                  className="w-1/3 md:w-auto text-red-400 text-lg lg:text-2xl cursor-pointer hover:text-red-600 mt-4 md:mt-0"
                  onClick={() => removeService(item.serviceName)}
                  title="Delete"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Background Image */}
      <div
        className="relative flex-none w-full md:w-2/3 bg-cover bg-center"
        style={{ backgroundImage: `url('https://i.postimg.cc/XqYyy1GZ/shopping-Card1.jpg')` }}
      >
          {/* Centered Total Price and Checkout Button */}
  {shoppingCard.length > 0 && (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
      <div className="bg-BgPink text-BgFont text-xl md:text-3xl font-bold p-4 rounded-lg shadow-lg">
        Total: {totalPrice.toFixed(2)} €
      </div>
      <div>
        <button
          onClick={handleCheckout}  // Trigger checkout when clicked
          className="bg-BgPinkMiddle text-BgFont py-3 px-6 text-xl md:text-2xl font-bold rounded-lg shadow-lg hover:bg-BgPinkDark"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )}
</div>
    </div>
  );
};

export default ShoppingCard;
