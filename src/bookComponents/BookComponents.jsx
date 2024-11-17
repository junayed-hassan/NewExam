import React, { useState } from "react";
import BookFooter from "./bookFooter/BookFooter";
import BookHeader from "./bookHeader/BookHeader";
import LeftSidebar from "./leftSidebar/LeftSidebar";
import MainSection from "./mainSection/MainSection";
import RightSidebar from "./rightSidebar/RightSidebar";

function BookComponents() {
  const [cartData, setCartData] = useState('');
  const [cartItemId, setCartItemId] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [favorites, setFavorites] = useState([]); 
  const [searchItems,setSearchItems] = useState('');

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
      prevFavorites.includes(bookId) ? prevFavorites : [...prevFavorites, bookId]
    );
  };

  return (
    <div className="xl:max-w-[1265px] lg:max-w-[965px] md:max-w-[667px] mx-auto px-7 py-5 dark:bg-gray-900 dark:text-white">
      <div>
        <BookHeader bookCartItemId={bookCartItemId} cartData={cartData} />
        <div className="md:flex gap-5 py-5 ">
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
          <MainSection 
            cartItemId={cartItemId} 
            cartData={handleCartData} 
            sortBy={sortBy} 
            filterCategory={filterCategory} 
            onAddFavorite={addFavorite} 
            favorites={favorites} 
            searchItems={searchItems}
          />
          <div className="max-[448px]:hidden">
            <RightSidebar onSortChange={handleSortChange} />
          </div>
        </div>
        <BookFooter />
      </div>
    </div>
  );
}



export default BookComponents;
