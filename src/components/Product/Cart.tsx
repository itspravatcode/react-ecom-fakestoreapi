import { useContext } from "react";
import { CartContext } from "../Contexts/CartContext";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const Cart = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) throw new Error("Cart must be used within a CartProvider");

  const { state, dispatch } = cartContext;

  const removeFromCart = async (id: number) => {
    try {
      await axios.delete(`https://fakestoreapi.com/carts/${id}`);
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };


  const clearCart = async () => {
    try {
      await axios.delete("https://fakestoreapi.com/carts/1");
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {state.cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {state.cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border-b">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                <h3 className="text-lg">{item.title}</h3>
                <p>${item.price} x {item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={clearCart}
              className="bg-gray-700 text-white px-4 py-2 rounded mt-4"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;