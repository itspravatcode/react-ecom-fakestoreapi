import React from "react";
import LoginModal from "./LoginModal";
import AddProductModal from "./AddProductModal";

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
}) => (
  <>
    {loginRole && <LoginModal onClose={() => setLoginRole(null)} role={loginRole} />}
    {showAddProductModal && <AddProductModal onClose={() => setShowAddProductModal(false)} />}
  </>
);

export default NavbarModals;
