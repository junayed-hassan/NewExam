import { IoSearch } from "react-icons/io5";
import { SlFire } from "react-icons/sl";
import {
  MdOutlineCreateNewFolder,
  MdOutlineUpcoming,
  MdFavoriteBorder,
  MdFavorite,
} from "react-icons/md";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import SearchModal from "../searchModal/SearchModal";
import { RiMenuFold2Fill } from "react-icons/ri";

function LeftSidebar({ onFilterChange, favorites, setSearchItems }) {
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef();

  const openMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.left = "0";
    }
  };

  const closeMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.left = "-300px";
    }
  };

  const clickTrendingHandler = () => {
    onFilterChange("Trending");
    closeMenu();
  }

  const clickReleasesHandler = () => {
    onFilterChange("new_releases");
    closeMenu();
  }
  
  const clickComingHandler = () => {
    onFilterChange("coming_soon");
    closeMenu();
  }

  const clickFavoritesHandler = () => {
    onFilterChange("Favorites");
    closeMenu();
  }

  const clickInputHandler = () => {
    setOpenModal(true)
    closeMenu();
  }

  const SidebarContent = () => (
    <ul className="font-inter list-none mt-10 lg:mt-0">
      <li onClick={clickInputHandler} className="flex gap-3 items-center border border-teal-400 p-2 rounded-md mb-3">
        <IoSearch className="text-xl" />
        <input
          type="text"
          placeholder="Quick search..."
          className="bg-transparent outline-none flex-1"
        />
      </li>
      <SidebarItem
        label="Trending"
        icon={<SlFire className="text-xl" />}
        onClick={clickTrendingHandler}
      />
      <SidebarItem
        label="New Releases"
        icon={<MdOutlineCreateNewFolder className="text-xl" />}
        onClick={clickReleasesHandler}
      />
      <SidebarItem
        label="Coming Soon"
        icon={<MdOutlineUpcoming className="text-xl" />}
        onClick={clickComingHandler}
      />
      <SidebarItem
        label={`Favorites ${favorites.length > 0 ? `(${favorites.length})` : ""}`}
        icon={
          favorites.length === 0 ? (
            <MdFavoriteBorder className="text-xl" />
          ) : (
            <MdFavorite className="text-xl" />
          )
        }
        onClick={clickFavoritesHandler}
      />
    </ul>
  );

  const SidebarItem = ({ label, icon, onClick }) => (
    <li
      onClick={onClick}
      className="flex gap-3 p-2 items-center mt-3 rounded-md hover:bg-primary cursor-pointer"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </li>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <RiMenuFold2Fill
        onClick={openMenu}
        className="text-3xl text-primary fixed top-16 left-6 cursor-pointer z-30 lg:hidden"
      />

      {/* Sidebar for Mobile */}
      <div
        ref={menuRef}
        className="fixed top-14 left-[-300px] h-full w-44 dark:bg-gray-900 bg-white  transition-all duration-300 z-20 lg:hidden"
      >
        <IoMdClose
          onClick={closeMenu}
          className="absolute text-primary top-2 right-4 text-3xl cursor-pointer z-50"
        />
        <SidebarContent />
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden lg:flex flex-col w-44 h-full">
        <SidebarContent />
      </div>

      {/* Search Modal */}
      <SearchModal setSearchItems={setSearchItems} onOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default LeftSidebar;
