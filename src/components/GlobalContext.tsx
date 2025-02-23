import { createContext, useReducer, useEffect, ReactNode } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type State = {
  selectedCategory: string;
  priceRange: [number, number];
  products: Product[];
  editMode: boolean;
  isAuthenticated: boolean;
  role: "admin" | "user" | "";
};

type Action =
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "TOGGLE_EDIT_MODE" };

const initialState: State = {
  selectedCategory: "",
  priceRange: [0, 1000],
  products: [],
  editMode: false,
  isAuthenticated: false,
  role: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [action.payload, ...state.products] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((prod) =>
          prod.id === action.payload.id ? action.payload : prod
        ),
      };
    case "TOGGLE_EDIT_MODE":
      return { ...state, editMode: !state.editMode };
    default:
      return state;
  }
};

type GlobalContextProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
  fetchProducts: () => Promise<void>;
};

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await res.json();
      dispatch({ type: "SET_PRODUCTS", payload: data });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch, fetchProducts }}>
      {children}
    </GlobalContext.Provider>
  );
};