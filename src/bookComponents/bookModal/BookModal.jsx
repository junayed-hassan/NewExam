import { useEffect, useRef } from "react";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { book_data } from "../../assets/data";

function BookModal({ 
  onOpen, 
  onClose, 
  bookId, 
  cartData, 
  cartItemId, 
  onAddFavorite, 
  favorites 
}) {
  const dialogRef = useRef(null);
  const book = book_data.find((b) => b.id === bookId);

  const cartDataHandler = () => {
    cartData(book.id);
    onClose();
  };

  useEffect(() => {
    if (onOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [onOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleAddToCart = (bookId) => {
    if (!cartItemId.includes(bookId)) {
      cartData(bookId);
      onClose();
    }
  };

  if (!book) return null;

  return (
    <div>
      <dialog ref={dialogRef} id="my_modal_3" className="modal">
        <div className="flex font-Inter bg-white rounded-md lg:w-[900px] md:w-[600px] max-[448px]:w-[300px] dark:bg-gray-800 dark:text-white">
          <div className="flex gap-6 items-center">
            <div className="py-10 max-[448px]:py-5  ps-12 max-[448px]:ps-5 pe-5 max-[448px]:pe-5">
              <h2 className="text-4xl font-semibold mb-2  max-[448px]:text-3xl whitespace-nowrap">{book.name}</h2>
              <span className="text-sm">{book.status}</span>
              <p className="text-base mb-4 mt-5 text-justify ">
                {book.description}
              </p>
              <div className="flex mt-2 max-[448px]:flex-wrap max-[448px]:justify-around gap-4">
                <button
                  onClick={() => handleAddToCart(book.id)}
                  disabled={cartItemId.includes(book.id)}
                  className={`py-2.5 ${cartItemId.includes(book.id) ? "px-5 opacity-50 text-gray-300 cursor-not-allowed" : "px-7"} bg-primary text-yellow-50 whitespace-nowrap`}
                >
                  <p>
                    ${book.price} | {cartItemId.includes(book.id) ? "Added to cart" : "Add to cart"}
                  </p>
                </button>
                
                <button
                  onClick={() => onAddFavorite(book.id)}
                  className="border border-teal-400 rounded-md p-2.5 hover:bg-teal-100 transition-colors"
                >
                  {favorites.includes(book.id) ? (
                    <MdOutlineFavorite className="text-primary text-2xl" />
                  ) : (
                    <MdFavoriteBorder className="text-primary text-2xl" />
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={onClose}
                  className="font-medium py-3 px-5 bg-slate-200 rounded-md dark:text-black"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="w-full h-full lg:block md:hidden  max-[448px]:hidden">
              <img className="rounded-r-md" src={book.image} alt={book.name} />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default BookModal;
