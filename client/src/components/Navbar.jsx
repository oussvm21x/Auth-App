import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/react.svg";
const Navbar = () => {
  const MenuItem = () => {
    return <></>;
  };
  const [imgErr, setImgErr] = useState(false);
  const imgErrHandler = (err) => {
    console.log(err);
    setImgErr(true);
  };
  return (
    <nav className="flex flex-1 justify-between text-black mx-[4rem] my-[1rem] font-medium text-lg">
      <div className="h-[40px] w-[40px] items-center text-2xl">
        <Link to="/">Auth</Link>
      </div>

      <ul className="flex items-center">
        <li className="px-5">
          <Link to="/">Home</Link>
        </li>
        <li className="px-5">
          <Link to="/about">About</Link>
        </li>
        <li className="px-5">
          <Link to="/contactus">Contact us </Link>
        </li>
      </ul>

      <div className="flex justify-between gap-5">
        <button className="">
          <Link to="/signin">Sign In</Link>
        </button>
        <button className="bg-slate-500 text-white px-4 rounded-lg hover:text-slate-500 hover:bg-white transition-colors duration-300">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
