import { useAppContext } from '../context/AppContext';

const ShoppingCard = () => {
  const { shoppingCard, clearShoppingCard } = useAppContext();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Card</h1>
      {shoppingCard.length === 0 ? (
        <p>Your shopping card is empty.</p>
      ) : (
        <>
          <ul>
            {shoppingCard.map((item, index) => (
              <li key={index} className="border-b py-2">
                <strong>Category:</strong> {item.category} <br />
                <strong>Total Price:</strong> ${item.totalPrice}
              </li>
            ))}
          </ul>
          <button
            onClick={clearShoppingCard}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Clear Shopping Card
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCard;
