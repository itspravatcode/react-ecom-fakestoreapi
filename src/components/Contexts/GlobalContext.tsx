import { createContext, useReducer, useEffect, ReactNode } from "react";

type User = {
  username: string;
  token: string;
};

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
  user: User | null;
};

type Action =
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "TOGGLE_EDIT_MODE" }
  | { type: "LOGIN_SUCCESS"; payload: { role: "admin" | "user"; user: User } }
  | { type: "LOGOUT" };

const initialState: State = {
  selectedCategory: "",
  priceRange: [0, 1000],
  products: [],
  editMode: false,
  isAuthenticated: false,
  role: "",
  user: null,
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
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        role: action.payload.role,
        user: action.payload.user,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, role: "", user: null };
    default:
      return state;
  }
};

type GlobalContextProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
  fetchProducts: () => Promise<void>;
  login: (username: string, password: string, role: "admin" | "user") => Promise<boolean>;
  logout: () => void;
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

  const login = async (username: string, password: string, role: "admin" | "user"): Promise<boolean> => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      if (data.token) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { role, user: { username, token: data.token } },
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  

  return (
    <GlobalContext.Provider value={{ state, dispatch, fetchProducts, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};
