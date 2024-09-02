import React from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { app } from "../../firbase.js";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { useSignOut } from "../../components/SignOut.jsx";
import { useDispatch } from "react-redux";
import {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileFailure,
  deleteProfileStart,
  deleteProfileSuccess,
} from "../../redux/user/userSlice";
const profile = () => {
  const signOut = useSignOut();
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [imageErr, setImageErr] = useState(null);
  const [data, setData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);
  const { currentUser, loading, error } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    //create a storage
    const storage = getStorage(app);
    const fileNam = new Date().getTime() + "-" + currentUser.name + file.name;
    const storageRef = ref(storage, fileNam);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setImageErr(error.message);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setData({
            ...data,
            picture: downloadURL,
          });
        });
      }
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateProfileStart());
    try {
      // Assuming you're using fetch or axios to make a POST request to update user profile
      console.log(data);
      const response = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setUpdateSuccess(true);
        dispatch(updateProfileSuccess(result));
      } else {
        dispatch(updateProfileFailure(result.message));
      }
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const deleteUser = async () => {
    dispatch(deleteProfileStart());
    try {
      const response = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(deleteProfileSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteProfileFailure(error));
    }
  };

  return (
    <div className="">
      <button
        className="bg-red-600 p-2 text-white rounded-md absolute hidden md:block right-10"
        onClick={signOut}
      >
        sing out
      </button>
      <section className="flex justify-center flex-col items-center rounded-lg mt-4 xxl:mt-6">
        <div className="sm:w-[500px] xl:[600px] xs:w-[450px]  w-[350px] pt-6 p-4 lg:p-6 ">
          <div className="flex flex-col gap-4 mt-6">
            <form
              className="flex flex-col w-full gap-4"
              onSubmit={handleUpdate}
            >
              <span className="rounded-full items-center flex justify-center flex-col">
                <input
                  type="file"
                  ref={fileRef}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  className="hidden"
                />
                <div className="flex flex-col justify-center w-48 h-48  overflow-hidden rounded-full mb-4">
                  <img
                    className="w-full object-cover bg-white"
                    src={data.picture || currentUser.picture}
                    alt=""
                    onClick={() => fileRef.current.click()}
                  />
                </div>

                {imageErr ? (
                  <div className="text-red-500 text-base">{imageErr}</div>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <div className="text-black text-base text-center mt-2">
                    Uploading... {imagePercent}%
                  </div>
                ) : imagePercent === 100 ? (
                  <div className="text-green-500 text-base text-center mt-2">
                    Uploaded
                    {console.log(data)}
                  </div>
                ) : (
                  ""
                )}
              </span>

              <div className="flex w-full items-center gap-4">
                <label className="text-base 2xl:text-2xl font-semibold text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border border-gray-300 p-2 bg-white rounded-md text-black w-full text-sm 2xl:text-xl"
                  defaultValue={currentUser.name}
                  placeholder="Name"
                  onChange={handleInputChange} // Add an onChange handler to update state
                />
              </div>

              <div className="flex w-full items-center gap-4">
                <label className="text-base 2xl:text-2xl font-semibold text-white">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="border border-gray-300 p-2 bg-white rounded-md text-black w-full text-sm 2xl:text-xl"
                  defaultValue={currentUser.username}
                  placeholder="Username"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex w-full items-center gap-4">
                <label className="text-base 2xl:text-2xl font-semibold text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 p-2 bg-white rounded-md text-black w-full text-sm 2xl:text-xl"
                  defaultValue={currentUser.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className={`text-white p-2 rounded ${
                  loading ? "bg-red-600" : "bg-blue-500 hover:bg-blue-600 "
                }`}
                disabled={loading}
                onClick={handleUpdate} // Ensure this triggers form submission logic
              >
                {loading ? "Loading..." : "Update Information"}
              </button>
            </form>
            <button
              className={`text-white p-2 rounded bg-red-500 hover:bg-red-600 `}
              onClick={deleteUser}
            >
              Delete account
            </button>
            <p className="text-red-700 mt-5">
              {error && "Something went wrong!"}
            </p>
            <p className="text-green-700 mt-5">
              {updateSuccess && "User is updated successfully!"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default profile;
