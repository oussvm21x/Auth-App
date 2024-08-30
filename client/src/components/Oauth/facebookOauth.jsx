import React from "react";
import { Link } from "react-router-dom";

const FacebookOauth = () => {
  return (
    <Link to="/facebook" className="w-full">
      <button
        type="button"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
      >
        Facebook
      </button>
    </Link>
  );
};

export default FacebookOauth;
