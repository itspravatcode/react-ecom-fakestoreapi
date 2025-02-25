import { useState, useEffect, useRef, useContext } from "react";
import { CartContext } from "../Contexts/CartContext";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const useProducts = (categoryName: string | undefined, state: any, dispatch: any) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("useProducts must be used within a provider");
  }

  const { dispatch: cartDispatch } = cartContext;
  const cartDispatchRef = useRef(cartDispatch);
  useEffect(() => {
    cartDispatchRef.current = cartDispatch;
  }, [cartDispatch]);

  const [products, setProducts] = useState<Product[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const url = categoryName
      ? `https://fakestoreapi.com/products/category/${categoryName}`
      : "https://fakestoreapi.com/products";

    fetch(url)
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filteredProducts = data.filter(
          (product) =>
            product.price >= state.priceRange[0] &&
            product.price <= state.priceRange[1]
        );
        setProducts(filteredProducts);
      });
  }, [categoryName, state.priceRange]);

  useEffect(() => {
    if (state.products.length > 0) {
      setProducts(state.products);
      return;
    }

    const url = categoryName
      ? `https://fakestoreapi.com/products/category/${categoryName}`
      : "https://fakestoreapi.com/products";

    fetch(url)
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filteredProducts = data.filter(
          (product) =>
            product.price >= state.priceRange[0] &&
            product.price <= state.priceRange[1]
        );
        setProducts(filteredProducts);
        dispatch({ type: "SET_PRODUCTS", payload: filteredProducts });
      });
  }, [categoryName, state.priceRange, state.products]);

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  return {
    cartDispatch: cartDispatchRef.current,
    products,
    deleteProduct,
    showUpdateModal,
    setShowUpdateModal,
    selectedProduct,
    setSelectedProduct,
  };
};

export default useProducts;
