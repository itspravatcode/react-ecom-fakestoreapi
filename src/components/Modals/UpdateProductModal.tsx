import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface UpdateProductModalProps {
  product: Product;
  onClose: () => void;
}

type GlobalContextType = {
  dispatch: React.Dispatch<{ type: string; payload?: Product }>;
};

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ product, onClose }) => {
  const context = useContext(GlobalContext) as GlobalContextType;
  if (!context) {
    throw new Error("UpdateProductModal must be used within a GlobalProvider");
  }

  const { dispatch } = context;
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? (value ? parseFloat(value) : 0) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }

      const data: Product = await response.json();
      dispatch({ type: "UPDATE_PRODUCT", payload: data });
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            name="title"
            value={updatedProduct.title}
            className="border p-2"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            value={updatedProduct.price || ""}
            className="border p-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            value={updatedProduct.image}
            className="border p-2"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            value={updatedProduct.category}
            className="border p-2"
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            value={updatedProduct.description}
            className="border p-2"
            onChange={handleChange}
            required
          ></textarea>
          <div className="flex justify-between">
            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
              Update
            </button>
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
