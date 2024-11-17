import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { RiMenuUnfold2Fill } from "react-icons/ri";

function RightSidebar({ onSortChange }) {
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.style.right = "0";
  };

  const closeMenu = () => {
    menuRef.current.style.right = "-300px";
  };

  const clickNameHandler = () => {
    onSortChange("name");
    closeMenu();
  }

  const clickRatingHandler = () => {
    onSortChange("rating");
    closeMenu();
  }

  const clickPriceHandler = () => {
    onSortChange("price");
    closeMenu();
  }

  return (
    <>
      <RiMenuUnfold2Fill
        onClick={openMenu}
        className="text-3xl fixed top-16 right-8 text-primary cursor-pointer z-30 lg:hidden"
      />

      <div
        ref={menuRef}
        className="fixed top-12 right-[-300px] h-full w-44 bg-white dark:bg-gray-900 transition-all duration-300 z-20 lg:hidden"
      >
        {/* Close Button */}
        <IoMdClose
          onClick={closeMenu}
          className="absolute text-primary top-4 left-4 text-3xl cursor-pointer z-50"
        />

        <div className="font-inter p-6 mt-10">
          <h1 className="text-xl font-semibold whitespace-nowrap">
            Filter On Page
          </h1>
          <ul className="list-none">
            <li
              className="flex gap-1 p-2 items-center mt-3 rounded-md hover:bg-primary cursor-pointer"
              onClick={clickNameHandler}
            >
              <MdOutlineKeyboardArrowRight className="text-xl" />
              <span className="text-sm">By name</span>
            </li>
            <li
              className="flex gap-1 p-2 items-center mt-3 rounded-md hover:bg-primary cursor-pointer"
              onClick={clickRatingHandler}
            >
              <MdOutlineKeyboardArrowRight className="text-xl" />
              <span className="text-sm">By rating</span>
            </li>
            <li
              className="flex gap-1 p-2 items-center mt-3 rounded-md hover:bg-primary cursor-pointer"
              onClick={clickPriceHandler}
            >
              <MdOutlineKeyboardArrowRight className="text-xl" />
              <span className="text-sm">By price</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:block h-ful">
        <h1 className="text-xl font-semibold whitespace-nowrap">Filter On Page</h1>
        <ul className="list-none">
          <li
            className="flex gap-1 p-2 items-center mt-3 rounded-md hover:bg-primary cursor-pointer"
            onClick={() => onSortChange("name")}
          >
            <MdOutlineKeyboardArrowRight className="text-xl" />
            <span className="text-sm">By name</span>
          </li>
          <li
            className="flex gap-1 p-2 items-center mt-3 rounded-md hover:bg-primary cursor-pointer"
            onClick={() => onSortChange("rating")}
          >
            <MdOutlineKeyboardArrowRight className="text-xl" />
            <span className="text-sm">By rating</span>
          </li>
          <li
            className="flex gap-1 p-2 items-center mt-3 rounded-md hover:bg-primary cursor-pointer"
            onClick={() => onSortChange("price")}
          >
            <MdOutlineKeyboardArrowRight className="text-xl" />
            <span className="text-sm">By price</span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default RightSidebar;
