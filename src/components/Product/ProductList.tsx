import ProductCard from "./ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

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
      {products.map((product) => (
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
      ))}
    </div>
  );
};

export default ProductList;