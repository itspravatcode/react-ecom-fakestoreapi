import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface AddProductModalProps {
  onClose: () => void;
}

type GlobalContextType = {
  dispatch: React.Dispatch<{ type: string; payload?: Product }>;
};

const fetchCategories = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose }) => {
  const context = useContext(GlobalContext) as GlobalContextType;
  if (!context) {
    throw new Error("AddProductModal must be used within a GlobalProvider");
  }

  const { dispatch } = context;
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    category: "",
    image: "",
  });

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? (value ? parseFloat(value) : 0) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://fakestoreapi.com/products", product, {
        headers: { "Content-Type": "application/json" }
      });
      
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed to add product");
      }

      dispatch({ type: "ADD_PRODUCT", payload: res.data });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={product.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            {isLoading ? (
              <option disabled>Loading...</option>
            ) : (
              categories.map((cat: string) => (
                <option key={cat} value={cat}>{cat}</option>
              ))
            )}
          </select>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
