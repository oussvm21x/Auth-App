import React from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { app } from "../../firbase.js";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { useSignOut } from "../../components/SignOut.jsx";
const profile = () => {
  const signOut = useSignOut();
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [imageErr, setImageErr] = useState(null);
  const [data, setData] = useState({});
  const [imagePercent, setImagePercent] = useState(0);
  const { currentUser } = useSelector((state) => state);
  const navigate = useNavigate();
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

  const handleUpdate = () => {};

  if (!currentUser) {
    navigate("/signin");
    return null; // To prevent rendering the rest of the component
  }

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
          <span className="rounded-full items-center flex justify-center ">
            <input
              type="file"
              ref={fileRef}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              className="hidden"
            />
            <div className="flex flex-col justify-center w-48 h-48  overflow-hidden rounded-full">
              <img
                className="rounded-full w-full object-cover"
                src={data.picture || currentUser.picture}
                alt=""
                onClick={() => fileRef.current.click()}
              />
              {imageErr ? (
                <div className="text-red-500 text-sm">{imageErr}</div>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <div className="text-black text-sm text-center mt-2">
                  Uploading... {imagePercent}%
                </div>
              ) : imagePercent === 100 ? (
                <div className="text-green-500 text-sm text-center mt-2">
                  Uploaded
                </div>
              ) : (
                ""
              )}
            </div>
          </span>
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex w-full items-center gap-4">
              <h2 className="text-base 2xl:text-2xl font-semibold text-white ">
                Name
              </h2>
              <div className="border  border-gray-300 p-2 bg-white rounded-md text-black w-full text-sm 2xl:text-xl">
                {currentUser.name}
              </div>
            </div>

            <div className="flex w-full items-center gap-4 ">
              <h2 className="text-base 2xl:text-2xl font-semibold text-white ">
                Username
              </h2>
              <div className="border border-gray-300 p-2 bg-white rounded-md text-black w-full text-sm 2xl:text-xl">
                {currentUser.username}
              </div>
            </div>

            <div className="flex w-full items-center gap-4 ">
              <h2 className="text-base 2xl:text-2xl font-semibold text-white">
                Email
              </h2>
              <div className="border border-gray-300 p-2 bg-white rounded-md text-black w-full text-sm 2xl:text-xl">
                {currentUser.email}
              </div>
            </div>
            <button
              className={`text-white p-2 rounded bg-blue-500 hover:bg-blue-600 mt-4`}
              onClick={handleUpdate}
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
