// auth.js
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut as logout } from "../redux/user/userSlice"; // Assuming you have a Redux action to handle logout

export const useSignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      // Assuming you're using fetch or axios to make a GET request for sign out
      await fetch("/api/auth/signout");
      // Dispatch the logout action
      dispatch(logout());
      // Redirect to the home page or sign-in page
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return signOut;
};
