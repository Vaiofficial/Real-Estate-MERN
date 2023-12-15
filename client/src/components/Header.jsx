import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    //to get url information
    const urlParams = new URLSearchParams(window.location.search);
    //sabhi information milne ke baad ab search term ko change kar rhe hai.
    urlParams.set("searchTerm", searchTerm);
    //phle urlparam ko string mai convert kar rhe , number vgera  bhi ho skta h.
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  //agar url mai change karenge to search bar mai bhi change hoga.
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    //good for seo if we write tags like this.
    <header className="bg-white shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex-wrap">
            <span className="text-slate-500">Rao</span>
            <span className="text-orange-500">EState</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            className="bg-transparent focus:outline-none sm:w-64"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>

          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className="flex gap-6 ">
          <Link to={"/"} className="nav-link">
            <li className="hidden sm:inline text-slate-700 font-semibold text-lg">
              Home
            </li>
          </Link>

          <Link to={"/about"} className="nav-link">
            <li className="hidden sm:inline text-slate-700 font-semibold text-lg">
              About
            </li>
          </Link>

          {/* if currentUser is true then its profile will be shown in the header section , if currentUser is false then SIGNIN text will be shown. */}
          <Link to={"/profile"} className="nav-link ">
            {currentUser ? (
              <img
                className="rounded-full w-7 h-7  object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="hidden sm:inline text-slate-700 font-semibold text-lg">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
