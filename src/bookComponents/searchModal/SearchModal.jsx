import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import { book_data } from "../../assets/data";

function SearchModal({ onOpen, onClose, setSearchItems }) {
  const [isOpen, setIsOpen] = useState(onOpen);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const dialogRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
    setSearchTerm("");
  };

  const onSelectBook = (book) => {
    setSearchItems(book.id);
    closeModal();
  };

  useEffect(() => {
    setIsOpen(onOpen);
  }, [onOpen]);

  // Close modal on Escape key press and outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    const handleOutsideClick = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const filtered = book_data.filter((book) =>
        book.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  };

  return (
    <div>
      <dialog ref={dialogRef} id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-gray-800" ref={dialogRef}>
          {/* Search Input */}
          <form method="dialog" className="flex gap-20">
            <div className="flex gap-3 items-center px-4 py-5 w-[500px] mt-3">
              <IoSearch className="text-xl" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Type your favorite book name here ..."
                className="bg-transparent outline-none w-full"
                aria-label="Search for a book"
              />
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="text-2xl pe-4"
              aria-label="Close"
            >
              <TfiClose />
            </button>
          </form>
          <hr />

          {/* Search Results */}
          <div className="text-center py-8 h-80 overflow-y-auto">
            {filteredBooks.length === 0 && (
              <p className="text-xl">
                {searchTerm.trim() ? "No item found" : "Start typing to search books"}
              </p>
            )}
            {filteredBooks.length > 0 && (
              <ul className="pb-5">
                {filteredBooks.map((book) => (
                  <li
                    key={book.id}
                    className="flex items-center px-7 py-3 gap-4 hover:bg-primary cursor-pointer"
                    onClick={() => onSelectBook(book)}
                  >
                    <img
                      className="w-14 h-[70px]"
                      src={book.image}
                      alt={book.name}
                    />
                    <div className="text-start">
                      <h2 className="text-xl font-semibold whitespace-nowrap">{book.name}</h2>
                      <p className="text-sm">{book.status}</p>
                      <strong>BDT: {book.price} TK</strong>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default SearchModal;
