import React, { useContext, useState } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";
import NavbarLinks from "./NavbarLinks";
import LoginModal from "../Modals/LoginModal";
import AddProductModal from "../Modals/AddProductModal";

const Navbar: React.FC = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("Navbar must be used within a GlobalProvider");
  }

  const { state, dispatch, logout } = context;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavbarLinks
          state={state}
          dispatch={dispatch}
          logout={logout}
          setShowLoginModal={setShowLoginModal}
          setShowUserModal={setShowUserModal}
          setShowAddProductModal={setShowAddProductModal}
        />
      </div>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} role="admin" />
      )}
      {showUserModal && (
        <LoginModal onClose={() => setShowUserModal(false)} role="user" />
      )}
      {showAddProductModal && (
        <AddProductModal onClose={() => setShowAddProductModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
