import React from "react";

const About = () => {
  return (
    <div className="m-6 p-6 bg flex flex-col gap-4 ">
      <div className="bg-color1 w-full text-center p-2  rounded-xl">
        <h1 className="text-4xl font-bold">About Us </h1>
      </div>
      <div className="flex justify-between gap-4 flex-col md:flex-row">
        <div className="bg-color1 w-full text-center p-2  rounded-xl">
          <h1 className="text-3xl font-bold my-3">App description</h1>
          <p className="text-2xl px-10 mb-6 text-left ">
            This is a full-stack web application built with the MERN (MongoDB,
            Express, React, Node.js) stack. It includes authentication features
            that allow users to sign up, log in, and log out, and provides
            access to protected routes only for authenticated users.
          </p>
        </div>
        <div className="bg-color1 w-full text-center p-2  rounded-xl">
          <h1 className="text-3xl font-bold my-3">Technologies </h1>
          <p className="text-2xl px-10 mb-6 text-left ">
            The front-end of the application is built with React and uses React
            Router for client-side routing. The back-end is built with Node.js
            and Express, and uses MongoDB as the database. Authentication is
            implemented using JSON Web Tokens (JWT).
          </p>
        </div>
      </div>

      <p></p>
    </div>
  );
};

export default About;
