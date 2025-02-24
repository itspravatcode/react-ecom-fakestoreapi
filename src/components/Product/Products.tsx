import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../Contexts/GlobalContext";
import { CartContext } from "../Contexts/CartContext";
import UpdateProductModal from "../Modals/UpdateProductModal";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const Products = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const context = useContext(GlobalContext);
  const cartContext = useContext(CartContext);

  if (!context || !cartContext) {
    throw new Error("Products must be used within a provider");
  }

  const { state, dispatch } = context;
  const { dispatch: cartDispatch } = cartContext;

  // ✅ Store cartDispatch in useRef to prevent re-renders
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

  const deleteProduct = (id: number) => {
    fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {categoryName ? `Category: ${categoryName}` : "All Products"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div className="bg-white shadow-lg rounded-lg p-4" key={product.id}>
            <img
              className="w-32 h-32 object-contain mb-2"
              src={product.image}
              alt={product.title}
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-lg font-bold">${product.price}</p>
            {state.editMode ? (
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowUpdateModal(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                {showUpdateModal && selectedProduct && (
                  <UpdateProductModal
                    product={selectedProduct}
                    onClose={() => setShowUpdateModal(false)}
                  />
                )}
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => {
                  cartDispatchRef.current({
                    type: "ADD_TO_CART",
                    payload: {
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    },
                  });
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
