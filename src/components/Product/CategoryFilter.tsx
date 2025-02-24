import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Contexts/GlobalContext";

type GlobalContextType = {
  dispatch: React.Dispatch<{ type: string; payload?: string }>;
};

const CategoryFilter: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const context = useContext(GlobalContext) as GlobalContextType;
  const navigate = useNavigate();

  if (!context) {
    throw new Error("CategoryFilter must be used within a GlobalProvider");
  }

  const { dispatch } = context;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const json = await res.json();
        setCategories(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
    navigate(category === "" ? "/" : `/category/${category}`);
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
