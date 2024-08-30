import React from "react";
import { GithubAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firbase.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
const GithubOauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const provider = new GithubAuthProvider();
      const auth = getAuth(app);
      const data = await signInWithPopup(auth, provider);

      const response = await fetch("/api/auth/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.user.displayName,
          email: data.user.email,
          picture: data.user.photoURL,
        }),
      });
      console.log("github1");
      const result = await response.json();
      console.log("github2");
      console.log("result", result);
      dispatch(signInSuccess(result));
      navigate("/profile");
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error));
    }
  };
  return (
    <button
      onClick={handleSubmit}
      type="button"
      className="bg-neutral-600 text-white p-2 rounded hover:bg-neutral-800 w-full"
    >
      GitHub
    </button>
  );
};

export default GithubOauth;
