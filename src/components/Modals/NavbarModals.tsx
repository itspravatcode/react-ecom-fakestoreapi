import React, { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";
import LoginModal from "./LoginModal";
import AddProductModal from "./AddProductModal";
import { Product } from "../Product/Product"; // Ensure this import exists


interface NavbarModalsProps {
  loginRole: "admin" | "user" | null;
  setLoginRole: (role: "admin" | "user" | null) => void;
  showAddProductModal: boolean;
  setShowAddProductModal: (show: boolean) => void;
}

const NavbarModals: React.FC<NavbarModalsProps> = ({
  loginRole,
  setLoginRole,
  showAddProductModal,
  setShowAddProductModal,
}) => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("NavbarModals must be used within a GlobalProvider");
  }

  const { dispatch } = context;

  return (
    <>
      {loginRole && <LoginModal onClose={() => setLoginRole(null)} role={loginRole} />}
      {showAddProductModal && context && (
  <AddProductModal
    onClose={() => setShowAddProductModal(false)}
    addProduct={(product) =>
      dispatch({ type: "ADD_PRODUCT", payload: { ...product, id: Date.now() } })
    }
  />
)}

    </>
  );
};

export default NavbarModals;
