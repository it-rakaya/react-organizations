import ButtonComp from "../atoms/buttons/ButtonComp";
import SearchIcon from "../atoms/icons/SearchIcon";

/* eslint-disable react/prop-types */
function Search({ setSearchQuery, placeholder, addTitle, action }) {
  return (
    <>
      <div className="flex items-center justify-between  !mb-[25px] ">
        <div className="relative w-1/2 ">
          <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 w-full rounded-xl border ]"
          />
          <div className="absolute right-[10px] rtl:left-[10px] top-[12px] ">
            <SearchIcon />
          </div>
        </div>
        <div>
          {addTitle && (
            <ButtonComp variant="contained" className={"m-0"} action={action}>
              {addTitle}
            </ButtonComp>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
