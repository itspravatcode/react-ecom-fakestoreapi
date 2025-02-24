import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./Contexts/GlobalContext";
import LoginModal from "./Modals/LoginModal";
import AddProductModal from "./Modals/AddProductModal";

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
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {/* Home Link */}
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Home
            </Link>
          </li>

          {/* Admin-only Links */}
          {state.isAuthenticated && state.role === "admin" && (
            <>
              <li>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Add Product
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_EDIT_MODE" })}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {state.editMode ? "Exit Edit Mode" : "Edit Products"}
                </button>
              </li>
            </>
          )}

          {/* User-only Links */}
          {state.isAuthenticated && state.role === "user" && (
            <li>
              <button
                type="button"
                 className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <Link to="./cart"> Cart</Link>
               
              </button>
            </li>
          )}

          {/* Authentication Buttons */}
          <li>
            {state.isAuthenticated ? (
              <button
                onClick={logout}
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Logout
              </button>
            ) : (
              <div className="flex">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mr-4"
                >
                  Admin Login
                </button>
                <button
                   className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={() => setShowUserModal(true)}
                >
                  User Login
                </button>
              </div>
            )}
          </li>
        </ul>
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
