import { createContext, useReducer, ReactNode} from "react";
import axios from "axios";

type CartItem = { id: number; title: string; price: number; image: string; quantity: number };
type CartState = { cart: CartItem[] };
type CartAction = 
  | { type: "ADD_TO_CART"; payload: CartItem } 
  | { type: "REMOVE_FROM_CART"; payload: number } 
  | { type: "CLEAR_CART" };

const initialState: CartState = { cart: [] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.some(item => item.id === action.payload.id)
          ? state.cart.map(item => 
              item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
            )
          : [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (userId: number, productId: number, quantity: number) => void;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = async (userId: number, productId: number, quantity: number) => {
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`);
      const product = { id: data.id, title: data.title, price: data.price, image: data.image, quantity };
  
      dispatch({ type: "ADD_TO_CART", payload: product });
  
      axios.post("https://fakestoreapi.com/carts", {
        userId,
        date: new Date().toISOString().split("T")[0],
        products: [...state.cart, { productId: data.id, quantity }],
      })
      .then(response => console.log("Cart updated:", response.data))
      .catch(error => console.error("Error adding to cart:", error));
  
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  
  

  return <CartContext.Provider value={{ state, dispatch, addToCart }}>{children}</CartContext.Provider>;
};