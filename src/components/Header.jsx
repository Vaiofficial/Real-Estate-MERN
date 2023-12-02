import { FaSearch } from "react-icons/fa";
import Home from "../pages/Home";
import About from "../pages/About";
import SignIn from "../pages/SignIn";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    //good for seo if we write tags like this.
    <header className="bg-white shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex-wrap">
            <span className="text-slate-500">Rao</span>
            <span className="text-orange-500">EState</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            className="bg-transparent focus:outline-none sm:w-64"
            type="text"
            placeholder="Search..."
          ></input>
          <FaSearch />
        </form>
        <ul className="flex gap-6 ">
          <Link to={"/"} className="nav-link">
            <li className="hidden sm:inline text-slate-700 font-semibold">
              Home
            </li>
          </Link>

          <Link to={"/about"} className="nav-link">
            <li className="hidden sm:inline text-slate-700 font-semibold">
              About
            </li>
          </Link>

          <Link to={"/sign-in"} className="nav-link">
            <li className="hidden sm:inline text-slate-700 font-semibold">
              Sign in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
