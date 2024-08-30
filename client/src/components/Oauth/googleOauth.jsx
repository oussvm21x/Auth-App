import React from "react";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firbase.js";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const GoogleOauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const data = await signInWithPopup(auth, provider);
      console.log("start fetchin");
      const response = await fetch("/api/auth/google", {
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
      console.log("end fetchin");
      const result = await response.json();
      console.log("result", result);
      dispatch(signInSuccess(result));
      navigate("/profile");
    } catch (error) {
      console.error("err", error);
      dispatch(signInFailure(error));
    }
  };
  return (
    <button
      type="button"
      onClick={handleSubmit}
      className="bg-red-900 text-white p-2 rounded hover:bg-red-950 w-full"
    >
      Google
    </button>
  );
};

export default GoogleOauth;
