import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategories = async (): Promise<string[]> => {
  const res = await axios.get("https://fakestoreapi.com/products/categories");
  return res.data;
};

type Product = {
  title: string;
  price: number; 
  description: string;
  category: string;
  image: string;
};

type AddProductModalProps = {
  onClose: () => void;
  addProduct: (product: Product & { id: number }) => void;
};

const AddProductModal = ({ onClose, addProduct }: AddProductModalProps) => {
  const [product, setProduct] = useState<Product>({
    title: "",
    price: 0,  
    description: "",
    category: "",
    image: "",
  });

  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value, 
    }));

    if (name === "category") {
      setShowDropdown(true);
      setFilteredCategories(
        categories.filter((cat) => cat.toLowerCase().includes(value.toLowerCase()))
      );
    }
  };

  const handleCategorySelect = (category: string) => {
    setProduct((prev) => ({ ...prev, category }));
    setShowDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({ ...product, id: Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Product</h2>

        {isLoading && <p className="text-blue-500">Loading categories...</p>}
        {error && <p className="text-red-500">Failed to load categories</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input className="border p-2" type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} required />
          <input className="border p-2" type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
          <input className="border p-2" type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} required />

          <div className="relative">
            <input
              className="border p-2 w-full"
              type="text"
              name="category"
              placeholder="Category"
              value={product.category}
              onChange={handleChange}
              required
              onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && filteredCategories.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 shadow-lg max-h-40 overflow-y-auto">
                {filteredCategories.map((category) => (
                  <div
                    key={category}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleCategorySelect(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input className="border p-2" type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required />

          <div className="flex justify-end space-x-2">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
