import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  // search page mai jo search button hai.
  //so initially value set kiye hai ab button click ke according url channge karna hoga.
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListing] = useState([]);
  const [showMore, setshowMore] = useState(false);

  //so jab url change hota hai , to search term dikhna chahaiye search bar mai , jo bhi search kiye the , or url change hoga to vo change ui mai bhi dikhega.
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    //ab jo bhi select & search kiye uske according ab result dena hoga.
    const fetchListings = async () => {
      setLoading(true);
      setshowMore(false);

      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();

        //show more functionality implementation
        if (data.length > 8) {
          setshowMore(true);
        } else {
          setshowMore(false);
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        console.log("Error!Not able to fetch data" , error);
      }
    };

    fetchListings();
  }, [location.search]); //iska mtlab - jab location ka search hoga tab tab ye effect call hoga.

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  //so search karne par url bhi change hoga and searching hogi.
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    //like agr total 9 hai so ab next start 10 hoga
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setshowMore(false);
    }

    //new and previous listings ko ak array mai store kar diye.
    setListing([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 border-slate-400 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex gap-3 items-center">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              className="p-3 rounded-md w-full border text-slate-600"
              placeholder="Search..."
              id="searchTerm"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            ></input>
          </div>

          {/* RENT & SALE SECTION */}

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type == "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          {/* AMENITIES SECTION */}

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

          {/* SORTING SECTION */}

          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="p-2 rounded-lg border"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}

          <button className="p-3 text-white bg-slate-700 rounded-lg hover:opacity-95 uppercase font-semibold text">
            Search
          </button>
        </form>
      </div>

      {/* LISTING RESULT SECTION */}

      <div className="flex-1">
        <h1 className="text-3xl font-semibold p-3">Listing results:</h1>
        <div className="p-7 gap-4 flex flex-wrap">
          {/* jab koi listing hi ni mili */}
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No Listing Found!</p>
          )}
          {/* jab load hora hai. */}
          {loading && <p className="text-center w-full">Loading...</p>}
          {/* so agar listing available hai , loading bhi nahi h so listings show karo */}
          {listings &&
            !loading &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {/* SHOW MORE BUTTON */}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 font-semibold hover:underline p-7 w-full text-center"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
