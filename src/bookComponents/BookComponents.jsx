import React, { useState } from "react";
import BookFooter from "./bookFooter/BookFooter";
import BookHeader from "./bookHeader/BookHeader";
import LeftSidebar from "./leftSidebar/LeftSidebar";
import MainSection from "./mainSection/MainSection";
import RightSidebar from "./rightSidebar/RightSidebar";

function BookComponents() {
  const [cartData, setCartData] = useState("");
  const [cartItemId, setCartItemId] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [searchItems, setSearchItems] = useState("");

  const handleCartData = (e) => {
    setCartData(e);
  };

  const bookCartItemId = (e) => {
    setCartItemId(e);
  };

  const handleSortChange = (criteria) => {
    setSortBy(criteria);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  const addFavorite = (bookId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(bookId)
        ? prevFavorites
        : [...prevFavorites, bookId]
    );
  };

  return (
    <div className="xl:max-w-[1240px] lg:max-w-[965px] md:max-w-[667px] mx-auto px-7 pt-4 pb-1 dark:bg-gray-900 dark:text-white h-screen overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Book Header */}
        <BookHeader bookCartItemId={bookCartItemId} cartData={cartData} />

        {/* Main Content Section */}
        <div className="md:flex gap-5 pt-1 flex-1 overflow-y-auto">
          <div className="flex justify-around">
            <LeftSidebar
              onFilterChange={handleFilterCategory}
              favorites={favorites}
              setSearchItems={setSearchItems}
            />
            <div className="md:hidden">
              <RightSidebar onSortChange={handleSortChange} />
            </div>
          </div>

          <div>
            <MainSection
              cartItemId={cartItemId}
              cartData={handleCartData}
              sortBy={sortBy}
              filterCategory={filterCategory}
              onAddFavorite={addFavorite}
              favorites={favorites}
              searchItems={searchItems}
            />
          </div>

          <div className="max-[448px]:hidden">
            <RightSidebar onSortChange={handleSortChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookComponents;
