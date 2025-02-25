import React from "react";
import { Link } from "react-router-dom";

const NavbarLinks: React.FC<{
  state: any;
  dispatch: any;
  logout: () => void;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddProductModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  state,
  dispatch,
  logout,
  setShowLoginModal,
  setShowUserModal,
  setShowAddProductModal,
}) => {
  return (
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
          <Link
            to="/cart"
            className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Cart
          </Link>
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
              onClick={() => setShowUserModal(true)}
              className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              User Login
            </button>
          </div>
        )}
      </li>
    </ul>
  );
};

export default NavbarLinks;