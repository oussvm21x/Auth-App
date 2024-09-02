import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import GoogleOauth from "../../components/Oauth/googleOauth";
import GithubOauth from "../../components/Oauth/githubOauth";
import FacebookOauth from "../../components/Oauth/facebookOauth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
  setValues,
} from "../../redux/user/userSlice";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const { loading, error } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    const minLength = 8;
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    const hasLowerCase = /[a-z]/.test(password);
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    return null; // No errors
  };

  // Name validation function
  const validateName = (name) => {
    if (!name) {
      return "Name is required.";
    }
    if (name.length < 3) {
      return "Name must be at least 3 characters long.";
    }
    const re = /^[a-zA-Z]+$/;
    if (!re.test(name)) {
      return "Name must only contain alphabetic characters.";
    }
    return null; // No errors
  };

  const validateUsername = (username) => {
    if (!username) {
      return "Username is required.";
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

    const nameError = validateName(name);
    if (nameError) {
      newErrors.name = nameError;
    }

    const usernameError = validateUsername(username);
    if (usernameError) {
      newErrors.username = usernameError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      dispatch(signUpStart());
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.success === false) {
          dispatch(signUpFailure(result.message));
        } else {
          console.log("User created successfully ", result);
          dispatch(signUpSuccess(result));
          navigate("/profile");
        }
      } catch (error) {
        console.error("Error:", error);
        dispatch(signUpFailure(error));
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
    <section className="flex justify-center flex-col items-center rounded-lg xl:mt-2 2xl:mt-14">
      <div className="sm:w-[500px] w-[350px] p-6">
        <h1 className="text-3xl font-bold text-center text-color1 hover:text-white transition-colors duration-300 cursor-pointer">
          Sign Up
        </h1>
        <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Full Name"
            className="border border-gray-300 p-2 bg-white text-black"
            onChange={(e) => {
              setName(e.target.value);
              handleDataChange(e);
            }}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}

          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="border border-gray-300 p-2 bg-white text-black"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              handleDataChange(e);
            }}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username}</span>
          )}

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
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <LineWithText text="OR" />
          <OauthButtonLinks />
        </form>
        <p className="mt-6 text-white">
          Already have an account?{" "}
          <a href="/signin" className="text-color1 cursor-pointer">
            Sign in
          </a>
        </p>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
    </section>
  );
};

export default SignUp;
