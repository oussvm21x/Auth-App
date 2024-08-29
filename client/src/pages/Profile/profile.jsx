import React from "react";
import { useSelector } from "react-redux";

const profile = () => {
  const { currentUser } = useSelector((state) => state);
  console.log(currentUser);
  return (
    <section className="flex justify-center flex-col items-center rounded-lg xl:mt-2 2xl:mt-14">
      <div className="sm:w-[500px] w-[350px] p-6">
        <h1 className="text-3xl font-bold text-center text-color1 hover:text-white transition-colors duration-300 cursor-pointer">
          Profile
        </h1>
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex w-full items-center gap-14 ">
            <h2 className="text-xl font-semibold text-white">Name</h2>
            <div className="border border-gray-300 p-2 bg-white rounded-md text-black w-full">
              {currentUser.name}
            </div>
          </div>

          <div className="flex w-full items-center gap-4 ">
            <h2 className="text-xl font-semibold text-white">Username</h2>
            <div className="border border-gray-300 p-2 bg-white rounded-md text-black w-full">
              {currentUser.username}
            </div>
          </div>

          <div className="flex w-full items-center gap-16 ">
            <h2 className="text-xl font-semibold text-white">Email</h2>
            <div className="border border-gray-300 p-2 bg-white rounded-md text-black w-full">
              {currentUser.email}
            </div>
          </div>
          <button
            className={`text-white p-2 rounded bg-blue-500 hover:bg-blue-600 mt-10`}
          >
            Update informations
          </button>
          <button
            className={`text-white p-2 rounded bg-red-500 hover:bg-red-600 `}
          >
            Delete account
          </button>
        </div>
      </div>
    </section>
  );
};

export default profile;
