import { MdOutlineLightMode } from "react-icons/md";
import { GrCart } from "react-icons/gr";
import { CiDark } from "react-icons/ci";
import CartModal from "../cartsModal/CartModal";
import React, { useState, useEffect } from "react";

function BookHeader({cartData, bookCartItemId}) {
  
  const [openModal, setOpenModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cartItemsLength,setCartItemsLength] = useState('')

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", !darkMode);
  };

  const handlerCartItemLength = (e) => {
    setCartItemsLength(e);
  }

  return (
    <>
      <header
        className={` flex justify-between items-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <h1 className="text-xl font-semibold text-primary">JunayedBook</h1>
        <nav>
          <ul className="flex gap-3">
            <li>
              <button
                onClick={toggleDarkMode}
                className="border border-teal-400 rounded-md p-2 hover:bg-teal-100 transition-colors"
              >
                {darkMode ? (
                  <MdOutlineLightMode className="text-primary" />
                ) : (
                  <CiDark className="text-primary" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setOpenModal(true)}
                className="border border-teal-400 rounded-md p-2 hover:bg-teal-100 transition-colors relative"
              >
                {cartItemsLength === "00" ? '' :
                <span className="absolute top-[-12px] left-4 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsLength}
                </span> }
                <GrCart className="text-primary" />
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <CartModal itemsLength={handlerCartItemLength} bookCartItemId={bookCartItemId} cartData={cartData} onOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default BookHeader;
