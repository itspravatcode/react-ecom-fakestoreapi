import ProductCard from "./ProductCard";
import {Product }from "./Product";



interface ProductListProps {
  products: Product[];
  editMode: boolean;
  cartDispatch: any;
  deleteProduct: (id: number) => void;
  showUpdateModal: boolean;
  setShowUpdateModal: (value: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
}

const ProductList = ({
  products,
  editMode,
  cartDispatch,
  deleteProduct,
  showUpdateModal,
  setShowUpdateModal,
  selectedProduct,
  setSelectedProduct,
}: ProductListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.length ? (
  products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      editMode={editMode}
      cartDispatch={cartDispatch}
      deleteProduct={deleteProduct}
      showUpdateModal={showUpdateModal}
      setShowUpdateModal={setShowUpdateModal}
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
    />
  ))
) : (
  <p>No products available.</p>
)}

    </div>
  );
};

export default ProductList;