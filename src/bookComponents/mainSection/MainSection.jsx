import { useState } from "react";
import { book_data } from "../../assets/data";
import { MdStar, MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import BookModal from "../bookModal/BookModal";
import BookFooter from "../bookFooter/BookFooter";

function MainSection({
  cartData,
  cartItemId,
  sortBy,
  filterCategory,
  onAddFavorite,
  favorites,
  searchItems,
}) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const openModal = (id) => {
    setSelectedBookId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedBookId(null);
  };

  const handleAddToCart = (bookId) => {
    if (!cartItemId.includes(bookId)) {
      cartData(bookId);
    }
  };

  const sortedBooks = [...book_data].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price") return a.price - b.price;
    return 0;
  });

  const filteredBooks = sortedBooks
  .filter((book) => {
    if (searchItems) {return book.id === searchItems;}
    if (filterCategory === "Favorites") return favorites.includes(book.id);
    if (filterCategory === "Trending") return true; 
    if (filterCategory === "coming_soon") return book.status === "coming_soon";
    if (filterCategory === "new_releases") return book.status === "new_releases";
    return book.category === filterCategory || filterCategory === "";
  });

  const renderEmptyStateMessage = () => {
    if (filterCategory === "Favorites" && filteredBooks.length === 0) {
      return "No favorite items found.";
    }
    if (filteredBooks.length === 0) {
      return "No items found in this category.";
    }
    return null;
  };
  

  return (
    <>
    <div className="grid justify-around xl:grid-cols-3 md:grid-cols-2 gap-3.5 font-Inter h-[525px] overflow-auto scrollbar-hidden">
      {renderEmptyStateMessage() && (
        <p className="col-span-3 text-center pt-40 font-bold xl:w-[800px] lg:w-[510px] md:w-[370px] text-gray-500 lg:me-36 md-0">
          {renderEmptyStateMessage()}
        </p>
      )}
      {filteredBooks.map((book) => (
        <div
          key={book.id}
          className="mb-0.5 font-Inter w-[270px] p-2.5 border border-[#595959] rounded-md"
        >
          <img
            onClick={() => openModal(book.id)}
            src={book.image}
            alt={book.name}
            className="cursor-pointer"
          />
          <div>
            <h2 className="font-medium mt-4 whitespace-nowrap">{book.name}</h2>
            <p className="text-xs text-[#8C8C8C] mt-1">{book.author}</p>
            <strong className="flex gap-3 text-primary mt-1">
              {[...Array(book.rating)].map((_, index) => (
                <MdStar key={index} />
              ))}
            </strong>
          </div>
          <div className="flex justify-between mt-2">
            <button
              onClick={() => handleAddToCart(book.id)}
              className={`py-2.5 ${
                cartItemId.includes(book.id)
                  ? "px-5 opacity-50 text-gray-300"
                  : "px-7"
              } bg-primary text-yellow-50 whitespace-nowrap`}
            >
              <p>
                ${book.price} |{" "}
                {cartItemId.includes(book.id) ? "Added to cart" : "Add to cart"}
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
          </div>

        </div>
      ))}
        <span className="xl:col-span-3 md:col-span-2"><BookFooter/></span>  
      <BookModal
        cartItemId={cartItemId}
        cartData={cartData}
        onOpen={isOpen}
        onClose={closeModal}
        bookId={selectedBookId}
        onAddFavorite={onAddFavorite}
        favorites={favorites}
      />
    </div>
    </>
  );
}

export default MainSection;
