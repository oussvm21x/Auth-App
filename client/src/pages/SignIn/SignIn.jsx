import React, { useState } from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import GoogleOauth from "../../components/Oauth/googleOauth";
import GithubOauth from "../../components/Oauth/githubOauth";
import FacebookOauth from "../../components/Oauth/facebookOauth";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  setValues,
} from "../../redux/user/userSlice";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state);

  const handleDataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Email validation function
  const validateEmail = (email) => {
    if (!email) {
      return "Email is required.";
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      return "Invalid email format.";
    }
    return null; // No errors
  };

  // Password validation function
  const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    }
    return null; // No errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Proceed with form submission
      console.log("Form submitted successfully", { email, password });
      dispatch(signInStart());
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
          dispatch(signInFailure(result.message));
          console.error("Error:", result.message);
          return;
        } else {
          console.log("User logged in successfully  ", result);
          dispatch(signInSuccess(result));
          navigate("/profile");
          return;
        }
      } catch (error) {
        dispatch(signInFailure(error));
        console.error("Error:", error);
      }
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
        <GoogleOauth />
        <GithubOauth />
        <FacebookOauth />
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

          <LineWithText text="OR" />
          <OauthButtonLinks />
        </form>
        <p className="mt-6 text-white">
          Want to joint ?{" "}
          <a href="/signup" className="text-color1 cursor-pointer">
            Sign Up
          </a>
        </p>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {console.log("error", error)}
      </div>
    </section>
  );
};

export default SignIn;
