import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 border-slate-400 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex gap-3 items-center">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <input
              type="text"
              className="p-3 rounded-md w-full border text-slate-600"
              placeholder="Search..."
            ></input>
          </div>

          {/* RENT & SALE SECTION */}

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          {/* AMENITIES SECTION */}

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>

          {/* SORTING SECTION */}

          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort:</label>
            <select id="sort_order" className="p-2 rounded-lg border">
                <option>Price high to low</option>
                <option>Price low to high</option>
                <option>Latest</option>
                <option>Oldest</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}

          <button className="p-3 text-white bg-slate-700 rounded-lg hover:opacity-95 uppercase font-semibold text">
            Search
          </button>

        </form>
      </div>

      {/* LISTING RESULT SECTION */}

      <div>
        <h1 className="text-3xl font-semibold p-3">Listing results:</h1>
      </div>
    </div>
  );
}
