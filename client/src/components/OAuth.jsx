import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const Provider = new GoogleAuthProvider();
      //app firebase.js se export hokar yha aaya hai.
      const auth = getAuth(app);

      //creating pop up request
      const result = await signInWithPopup(auth, Provider);

      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      //simillary like we did in sign in page ! using redux
      dispatch(signInSuccess(data));
      //home page mai navigate if signin is successful
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red bg-red-600 text-white p-3 rounded-lg font-semibold uppercase hover:opacity-95"
    >
      {" "}
      Continue with google
    </button>
  );
}
