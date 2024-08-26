import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./singup.css";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include both uppercase and lowercase letters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Proceed with form submission
      console.log("Form submitted successfully", { email, password });
      // You can add your form submission logic here, e.g., API call
    }
  };

  const LineWithText = ({ text }) => {
    return (
      <div className="line-container">
        <div className="line" />
        <span className="line-text">{text}</span>
        <div className="line" />
      </div>
    );
  };
  const OauthButtonLinks = () => {
    return (
      <div className="flex justify-between flex-col gap-5 sm:flex-row sm:gap-5">
        <Link to="/google" className="w-full">
          {" "}
          {/* Link to the Google page */}
          <button
            type="button"
            className="bg-red-900 text-white p-2 rounded hover:bg-red-950 w-full"
          >
            Google
          </button>
        </Link>

        <Link to="/github" className="w-full">
          {" "}
          {/* Link to the GitHub page */}
          <button
            type="button"
            className="bg-neutral-600 text-white p-2 rounded hover:bg-neutral-800 w-full"
          >
            GitHub
          </button>
        </Link>

        <Link to="/facebook" className="w-full">
          {" "}
          {/* Link to the Facebook page */}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
          >
            Facebook
          </button>
        </Link>
      </div>
    );
  };

  return (
    <section className="flex justify-center flex-col items-center  rounded-lg  xl:mt-2 2xl:mt-14">
      <div className="sm:w-[500px] w-[350px] p-6">
        <h1 className="text-3xl font-bold text-center text-color1 hover:text-white transition-colors duration-300 cursor-pointer">
          Sign Up
        </h1>
        <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            className="border border-gray-300 p-2 bg-white text-black"
          />

          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="border border-gray-300 p-2 bg-white text-black"
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 bg-white text-black"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 bg-white text-black"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
          <LineWithText text="OR" />
          <OauthButtonLinks />
        </form>
        <p className="mt-6 text-white">
          Already have an account ?{" "}
          <a href="/signin" className="text-color1 cursor-pointer">
            Sign in
          </a>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
