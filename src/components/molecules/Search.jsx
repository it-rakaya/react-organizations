import SearchIcon from "../atoms/icons/SearchIcon";

/* eslint-disable react/prop-types */
function Search({ setSearchQuery , placeholder }) {
  return (
    <div className="relative w-1/2 !mb-[25px] ">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-3 w-full rounded-xl border ]"
      />
      <div className="absolute left-[10px] top-[12px]">
        <SearchIcon />
      </div>
    </div>
  );
}

export default Search;
