import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import "./navbar.css";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { currentUser } = useSelector((state) => state);
  const MenuItem = () => {
    return (
      <ul className=" md:flex gap-5 items-center">
        <li className="px-5 text-lg font-bold">
          <Link to="/">Home</Link>
        </li>
        <li className="px-5 text-lg font-bold">
          <Link to="/about">About</Link>
        </li>
        <li className="px-5 text-lg font-bold">
          <Link to="/contactus">Contact us </Link>
        </li>
      </ul>
    );
  };

  const Buttons = () => {
    return (
      <div className="xxs:flex items-center text-center text-lg font-bold">
        <button className="mr-3 block text-center w-full xxs:w-auto mb-2 xxs:mb-0">
          <Link to="/signin">Sign In</Link>
        </button>
        <button className="bg-color1 text-color2  px-4 py-1 rounded-lg hover:text-white hover:bg-color4 transition-colors duration-300">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    );
  };

  const Logo = () => {
    return (
      <div className="header-text">
        <Link to="/">Auth</Link>
      </div>
    );
  };

  const [toggleMenu, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggleMenu);
  };

  return (
    <nav className="flex-between-center text-white px-6  py-2 bg-color2 shadow-lg shadow-black h-[50px]">
      <div className="flex-between-center w-full text-center mr-12 md:mr-0">
        <Logo />
        <div className="hidden md:flex ">
          <MenuItem />
        </div>
        {currentUser ? (
          <Link to="/profile" className="w-10 rounded-full hidden xxs:flex ">
            <img className="rounded-full" src={currentUser.picture} alt="" />
          </Link>
        ) : (
          <div className="hidden xxs:flex ">
            <Buttons />
          </div>
        )}
      </div>

      <div className="md:hidden">
        {toggleMenu ? (
          <IoClose onClick={handleToggle} className="text-2xl text-white" />
        ) : (
          <IoMenu onClick={handleToggle} className="text-2xl text-white" />
        )}

        {toggleMenu && (
          <div className="flex flex-col items-center justify-center text-center p-4 rounded-md absolute bg-color2 right-2 top-16 scale-up-top">
            <MenuItem />
            <div className="xxs:hidden pt-3">
              {currentUser ? (
                <Link to="/profile">
                  <img
                    className="rounded-full w-10"
                    src={currentUser.picture}
                    alt=""
                  />
                </Link>
              ) : (
                <Buttons />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
