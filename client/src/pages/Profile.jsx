import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [FormData, setFormData] = useState({});

  //so jab bhi file mai changes hoongi handlefileupload ccfunction trigger hoga.
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  //it is trigger when file is selected , uses firebase storage ti upload the file
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    //this one will track the changes and give us the snapshot
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        //upload successful hua to download url of uploaded file is retrieved using formData state variable.
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...FormData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="max-w-lg m-auto p-3">
      <h1 className="text-3xl font-bold text-center my-7 ">Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          hidden={true}
          type="file"
          ref={fileRef}
          accept="image/*"
        ></input>
        <img
          onClick={() => fileRef.current.click()}
          //agar formdata true hai to vo image show kro else currentUser vala hi.
          src={FormData.avatar || currentUser.avatar}
          alt="profile "
          className="rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer"
        ></img>
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload (Image must be less than 2 mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc == 100 ? (
            <span className="text-green-600 font-medium">Image Successfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="username"
          placeholder="username"
          className="p-3 border rounded-lg focus:outline-none"
        ></input>
        <input
          type="text"
          id="email"
          placeholder="email"
          className="p-3 border rounded-lg focus:outline-none"
        ></input>
        <input
          type="text"
          id="password"
          placeholder="password"
          className="p-3 border rounded-lg focus:outline-none"
        ></input>
        <button className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
          Update Profile
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer font-medium">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-medium">
          Sign out
        </span>
      </div>
    </div>
  );
}
