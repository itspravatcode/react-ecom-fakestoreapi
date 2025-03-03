import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Contexts/GlobalContext";
import axios from "axios";

type GlobalContextType = {
  dispatch: React.Dispatch<{ type: string; payload?: string }>;
};

const CategoryFilter: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const context = useContext(GlobalContext);
  const navigate = useNavigate(); // Ensure this is defined inside the component

  if (!context) {
    throw new Error("CategoryFilter must be used within a GlobalProvider");
  }

  const { dispatch } = context;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
    navigate(category ? `/category/${category}` : "/"); // Ensure navigate is being used correctly
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Categories</h2>
      <button
        onClick={() => handleCategoryClick("")}
        className="block w-full text-left py-1 text-blue-500 hover:underline"
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className="block w-full text-left py-1 text-blue-500 hover:underline"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
