import React, { useState } from "react";
import "./signin.css";
import { data } from "autoprefixer";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});
  const handleDataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

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
  const handleSubmit = async (e) => {
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
      setLoading(true);
      try {
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.success === false) {
          setErrors({ server: result.message });
        } else {
          console.log("User logged in successfully  ", result);
        }
      } catch (error) {
        console.error("Error:", error);
        setErrors({ server: "Something went wrong. Please try again later." });
      }

      setLoading(false);
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

  return (
    <section className="flex justify-center flex-col items-center  rounded-lg  xl:mt-2 2xl:mt-14">
      <div className="sm:w-[500px] w-[350px] p-6">
        <h1 className="text-3xl font-bold text-center text-color1 hover:text-white transition-colors duration-300 cursor-pointer">
          Sign In
        </h1>
        <form className="flex flex-col mt-4 gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleDataChange(e);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              handleDataChange(e);
            }}
            className="border border-gray-300 p-2 bg-white text-black"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
          <button
            type="submit"
            className={`text-white p-2 rounded ${
              loading ? "bg-red-600" : "bg-blue-500 hover:bg-blue-600 "
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          ;
          <LineWithText text="OR" />
          <div className="flex justify-between flex-col gap-5 sm:flex-row sm:gap-5">
            <button
              type="submit"
              className="bg-red-900 text-white p-2 rounded hover:bg-red-950 w-full"
            >
              google
            </button>
            <button
              type="submit"
              className="bg-neutral-600 text-white p-2 rounded hover:bg-neutral-800 w-full "
            >
              github
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full "
            >
              facebook
            </button>
          </div>
        </form>
        <p className="mt-6 text-white">
          Want to joint ?{" "}
          <a href="/signup" className="text-color1 cursor-pointer">
            Sign Up
          </a>
        </p>
        {errors.server && (
          <div className="text-red-500 text-sm">{errors.server}</div>
        )}
      </div>
    </section>
  );
};

export default SignIn;
