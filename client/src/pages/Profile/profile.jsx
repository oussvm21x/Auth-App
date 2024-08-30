import React from "react";
import { useSelector } from "react-redux";

const profile = () => {
  const { currentUser } = useSelector((state) => state);
  console.log(currentUser);
  if (!currentUser) {
    navigate("/signin");
    return null; // To prevent rendering the rest of the component
  }

  return (
    <div className="mt-4">
      <div className="flex justify-end pr-8 text-lg">
        <button
          type="button"
          className="text-white p-2 rounded bg-red-500 hover:bg-red-600 "
        >
          sing out
        </button>
      </div>

      <section className="flex justify-center flex-col items-center rounded-lg mt-6">
        <div className="sm:w-[600px] xs:w-[450px]  w-[350px] pt-16 p-4 lg:p-6 ">
          <span className="rounded-full items-center flex justify-center ">
            <img
              className="rounded-full w-52"
              src={currentUser.picture}
              alt=""
            />
          </span>
          <div className="flex flex-col gap-4 mt-10">
            <div className="flex w-full items-center gap-4">
              <h2 className="text-base lg:text-xl font-semibold text-white ">
                Name
              </h2>
              <div className="border  border-gray-300 p-2 bg-white rounded-md text-black w-full">
                {currentUser.name}
              </div>
            </div>

            <div className="flex w-full items-center gap-4 ">
              <h2 className="text-base lg:text-xl font-semibold text-white ">
                Username
              </h2>
              <div className="border border-gray-300 p-2 bg-white rounded-md text-black w-full">
                {currentUser.username}
              </div>
            </div>

            <div className="flex w-full items-center gap-4 ">
              <h2 className="text-base lg:text-xl font-semibold text-white">
                Email
              </h2>
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
    </div>
  );
};

export default profile;
