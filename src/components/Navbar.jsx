import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSearchParams } from "react-router";
const Navbar = () => {
  const [searchParams,setSearchParams]=useSearchParams();
  const [searchText,setSearchText]=useState(searchParams.get("text")|| "");
  //const [searchText, setSearchText] = useState();
  let navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/search?text=${searchText}`);
  };
  return (
    <nav className="flex px-6 py-4 justify-between items-center bg-emerald-200">
      <Link to="/" className="px-1 py-1 bg-purple-800 text-white">Shopping App</Link>
      <div>
        <input
          className="px-2 py-1 border-1 border-amber-800 rounded-lg mr-2"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          onClick={handleSearch}
          className="px-2 py-1 border-1 border-amber-800 rounded-lg bg-amber-700 text-white cursor-pointer"
        >
          search
        </button>
      </div>
      <div className="h-6 w-6 bg-blue-600 rounded-full"></div>
    </nav>
  );
};

export { Navbar };
