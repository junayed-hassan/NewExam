import { useState, useEffect, useRef } from "react";
import { TfiClose } from "react-icons/tfi";
import { AiFillDelete } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { FaMinus } from "react-icons/fa";
import { book_data } from "../../assets/data";

function CartModal({ onOpen, onClose, cartData, itemsLength, bookCartItemId }) {
  const [isOpen, setIsOpen] = useState(onOpen);
  const [cartItems, setCartItems] = useState([]);
  const dialogRef = useRef(null);

  useEffect(() => {
    const formattedCount = cartItems.length < 10 ? `0${cartItems.length}` : cartItems.length;
    itemsLength(formattedCount); 
  }, [cartItems.length]); 

  useEffect(() => {
    const formattedCount = cartItems.length < 10 ? `0${cartItems.length}` : cartItems.length;
    itemsLength(formattedCount);
    bookCartItemId(cartItems.map(item => item.id)); 
  }, [cartItems.length]); 
  

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  useEffect(() => {
    setIsOpen(onOpen);
  }, [onOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [isOpen]);

  const addToCart = (bookId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === bookId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === bookId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const bookToAdd = book_data.find((book) => book.id === bookId);
        return [...prevItems, { ...bookToAdd, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    if (cartData) addToCart(cartData);
  }, [cartData]);

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="bg-white h-[430px] w-[920px] dark:bg-gray-800 dark:text-white rounded-lg">
        <button
          type="button"
          className="ms-auto pt-3 pe-3 block"
          onClick={closeModal}
        >
          <TfiClose />
        </button>
        <h1 className="text-center text-2xl font-semibold font-Inter">
          Your Cart
        </h1>
        <div className="p-10">
          <ul className="flex mb-3 font-bold">
            <li>Product</li>
            <li className="ms-52">Price</li>
            <li className="ms-12">Quantity</li>
            <li className="ms-14">Total</li>
          </ul>
          <div className="flex justify-between">
            <ul className="h-[300px] overflow-scroll">
              {cartItems.length > 0 ? (
                cartItems.map((book) => (
                  <li key={book.id} className="mb-3">
                    <hr />
                    <ul className="mt-3">
                      <li className="flex gap-12 items-center">
                        <div className="flex items-center w-[230px]">
                          <img className="w-14 h-16" src={book.image} alt="" />
                          <div className="ps-3">
                            <p className="font-semibold text-lg whitespace-nowrap">{book.name}</p>
                            <span className="text-sm">{book.status}</span>
                          </div>
                        </div>
                        <p className="font-medium">${book.price}</p>
                        <div className=" flex gap-4 bg-gray-200 items-center px-2 py-1 rounded-xl dark:text-black">
                          <FaMinus onClick={() => updateQuantity(book.id, -1)} />
                          <strong>{book.quantity}</strong>
                          <TiPlus onClick={() => updateQuantity(book.id, 1)} />
                        </div>
                        <p className="font-medium">${book.price * book.quantity}</p>
                        <AiFillDelete
                          className="text-2xl cursor-pointer"
                          onClick={() => deleteItem(book.id)}
                        />
                      </li>
                    </ul>
                  </li>
                ))
              ) : (
                <div className="ms-64 mt-28">
                  <p className="text-xl font-medium">No data found</p>
                </div>
              )}
            </ul>
            <div className="ms-3">
              <div className="px-10 bg-gray-200 dark:text-black">
                <h2 className="pb-5 pt-3 font-semibold text-xl whitespace-nowrap">
                  Order summary
                </h2>
                <span className="bg-yellow-50 h-[2px] w-full block dark:bg-black"></span>
                <div className="flex gap-10 pt-5">
                  <p>Subtotal</p>
                  <span>${subtotal}</span>
                </div>
                <div className="flex gap-10 py-4">
                  <p>Shipping</p>
                  <span className="text-primary">Free</span>
                </div>
              </div>
              <div className="flex px-14 gap-10 bg-slate-400 py-1 dark:text-black">
                <p>Total</p>
                <span>${subtotal}</span>
              </div>
              <button className="bg-primary text-yellow-100 w-full py-1 mt-3 dark:text-black dark:text-yellow-100 ">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default CartModal;
