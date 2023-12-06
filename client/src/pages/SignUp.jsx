import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-center my-7 text-3xl">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border rounded-lg p-3 outline-none"
          id="username"
        />
        <input
          type="text"
          placeholder="email"
          className="border rounded-lg p-3 outline-none"
          id="username"
        />
        <input
          type="text"
          placeholder="password"
          className="border rounded-lg p-3 outline-none"
          id="username"
        />
        {/* Signup button */}
        <button className="bg-slate-700 text-white uppercase rounded-lg p-3 font-semibold hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>

      {/* Bottom text */}
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to={"/sign-in"}>
        <span className="text-red-600">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
