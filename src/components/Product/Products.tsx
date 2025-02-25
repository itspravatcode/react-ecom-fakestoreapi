import { useState } from "react";
import useProducts from "./useProducts";
import ProductList from "./ProductList";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";
import { CartContext } from "../Contexts/CartContext";

const Products = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const context = useContext(GlobalContext);
  const cartContext = useContext(CartContext);

  if (!context || !cartContext) {
    throw new Error("Products must be used within a provider");
  }

  const { state, dispatch } = context;
  const {
    cartDispatch,
    products,
    deleteProduct,
    showUpdateModal,
    setShowUpdateModal,
    selectedProduct,
    setSelectedProduct,
  } = useProducts(categoryName, state, dispatch);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {categoryName ? `Category: ${categoryName}` : "All Products"}
      </h2>



      <ProductList
        products={products}
        editMode={state.editMode}
        cartDispatch={cartDispatch}
        deleteProduct={deleteProduct}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  );
};

export default Products;
