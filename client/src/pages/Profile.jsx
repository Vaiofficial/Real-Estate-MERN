import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [FormData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  console.log(FormData);

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

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserFailure(data.message));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg m-auto p-3">
      <h1 className="text-3xl font-bold text-center my-7 ">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <span className="text-red-700">
              Error Image Upload (Image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc == 100 ? (
            <span className="text-green-600 font-medium">
              Image Successfully Uploaded!
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none"
        ></input>
        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none"
        ></input>
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
          className="p-3 border rounded-lg focus:outline-none"
        ></input>
        <button
          disabled={loading}
          className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDelete}
          className="text-red-700 cursor-pointer font-medium"
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-medium">
          Sign out
        </span>
      </div>


      {/* error / update etc notification message */}

      <p className="text-red-700 mt-5 text-center font-medium">
        {" "}
        {error ? error : ""}
      </p>
      <p className="text-green-600 mt-5 text-center font-medium">
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
    </div>
  );
}
