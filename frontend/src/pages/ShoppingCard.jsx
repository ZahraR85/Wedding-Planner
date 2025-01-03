

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const ShoppingCard = () => {
  const {
    userId,
    isAuthenticated,
    shoppingCard,
    setShoppingCard,
    removeFromShoppingCard,
  } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Redirect unauthenticated users to the sign-in page
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must sign in to access this page.");
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch shopping card items from the backend
  const fetchShoppingCard = async () => {
    if (!userId) {
      toast.error('User not authenticated. Please sign in.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/shoppingcards?userID=${userId}`);
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
      await axios.delete(`http://localhost:3001/shoppingcards`, {
        data: { userID: userId, serviceName },
      });

      // Update the state locally
      const updatedCard = shoppingCard.filter((item) => item.serviceName !== serviceName);
      setShoppingCard(updatedCard);
      setTotalPrice(updatedCard.reduce((sum, item) => sum + item.price, 0));

      toast.success('Service removed!');
    } catch (error) {
      console.error('Failed to remove service:', error);
      toast.error('Failed to remove service!');
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
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Your Shopping Card</h2>
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shoppingCard.length === 0 ? (
          <p className="text-xl text-center col-span-full">Your shopping card is empty.</p>
        ) : (
          shoppingCard.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-center mb-2">
                {item.serviceName}
              </h3>
              <span className="text-lg font-bold mb-2">
                ${item.price.toFixed(2)}
              </span>
              <button
                onClick={() => removeService(item.serviceName)}
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
          <div className="text-xl font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCard;
















// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from '../context/AppContext';
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../App.css";

// const ShoppingCard = () => {
//   const { userId, isAuthenticated, shoppingCard, addToShoppingCard, removeFromShoppingCard } = useAppContext();
//   const [totalPrice, setTotalPrice] = useState(0); // Local state for total price
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       toast.error("You must sign in to access this page.");
//       navigate("/signin");
//     }
//   }, [isAuthenticated, navigate]);

//   // Fetch shopping card items
//   const fetchShoppingCard = async () => {
//     if (!userId) {
//       // If userId is null or undefined, don't fetch
//       toast.error('User not authenticated. Please sign in.');
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:3001/shoppingcards?userID=${userId}`);
//       const { cardItems } = response.data;

//       // Clear the shopping card first to avoid duplicates
//       shoppingCard.length = 0; // Clear existing items in state

//       // Add fetched items to the context
//       cardItems.forEach((item) => {
//         addToShoppingCard(item);
//       });
//     } catch (error) {
//       console.error('Failed to fetch shopping card:', error);
//       toast.error('Could not load shopping card. Please try again.');
//     }
//   };

//   // Calculate total price
//   const calculateTotalPrice = () => {
//     const total = shoppingCard.reduce((sum, item) => sum + item.price, 0);
//     setTotalPrice(total);
//   };

//   // Remove service from shopping card
//   const removeService = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/shoppingcards`, {
//         data: { userID: userId, serviceName: item.serviceName },
//       });
//       console.log('Mapped userID:', userId);
//       console.log('Mapped serviceName:', id);
//       removeFromShoppingCard(id); // Pass id for removal in context
//       toast.success('Service removed!');
//     } catch (error) {
//       toast.error('Failed to remove service!');
//     }
//   };

//   // Clear the shopping card
//   /* const handleClearShoppingCard = async () => {
//     try {
//       await axios.delete(`http://localhost:3001/shoppingcards/${userId}`);
//       clearShoppingCard();
//       setTotalPrice(0);
//       toast.success('Shopping card cleared!');
//     } catch (error) {
//       toast.error('Failed to clear shopping card!');
//     }
//   };
// */
//   // Fetch shopping card when the component is mounted or when userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchShoppingCard();
//     }
//   }, [userId]);

//   useEffect(() => {
//     calculateTotalPrice();
//   }, [shoppingCard]);

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-3xl font-bold text-center mb-6">Your Shopping Card</h2>
//       <ToastContainer />
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {shoppingCard.length === 0 ? (
//           <p className="text-xl text-center col-span-full">Your shopping card is empty.</p>
//         ) : (
//           shoppingCard.map((item) => (
//             <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//               <h3 className="text-xl font-semibold text-center mb-2">{item.serviceName}</h3>
//               <span className="text-lg font-bold mb-2">${item.price.toFixed(2)}</span>
//               <button
//                 onClick={() => removeService(item.id)}  // Pass unique ID for removal
//                 className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
//               >Remove</button>
//             </div>
//           ))
//         )}
//       </div>

//       {shoppingCard.length > 0 && (
//         <div className="mt-8 flex justify-between items-center">
//           <div className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</div>
//                    {/* <button onClick={handleClearShoppingCard} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">Clear Card</button> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShoppingCard;
