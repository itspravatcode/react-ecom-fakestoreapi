import UpdateProductModal from "../Modals/UpdateProductModel";
import {Product }from "./Product";


interface ProductCardProps {
  product: Product;
  editMode: boolean;
  cartDispatch: any;
  deleteProduct: (id: number) => void;
  showUpdateModal: boolean;
  setShowUpdateModal: (value: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
}

const ProductCard = ({
  product,
  editMode,
  cartDispatch,
  deleteProduct,
  showUpdateModal,
  setShowUpdateModal,
  selectedProduct,
  setSelectedProduct,
}: ProductCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img className="w-32 h-32 object-contain mb-2" src={product.image} alt={product.title} />
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-lg font-bold">${product.price}</p>
      {editMode ? (
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
            <UpdateProductModal product={selectedProduct} onClose={() => setShowUpdateModal(false)} />
          )}
          <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white px-3 py-1 rounded">
            Delete
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() =>
            cartDispatch({
              type: "ADD_TO_CART",
              payload: { id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 },
            })
          }
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;