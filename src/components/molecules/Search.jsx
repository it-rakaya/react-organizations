import ButtonComp from "../atoms/buttons/ButtonComp";
import SearchIcon from "../atoms/icons/SearchIcon";

/* eslint-disable react/prop-types */
function Search({ setSearchQuery, placeholder, addTitle, action }) {
  return (
    <>
      <div className="flex items-center justify-between flex-wrap  !mb-[25px] ">
        <div className="relative w-full md:w-1/2 ">
          <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border outline-none rounded-xl "
          />
          <div className="absolute  search_icon  left-[10px]  top-[14px] w-[20px] ">
            <SearchIcon />
          </div>
        </div>
        <div className="w-full rtl:mt-5 md:w-auto md:m-0">
          {addTitle && (
            <ButtonComp variant="contained" className={"!m-0"} action={action}>
              {addTitle}
            </ButtonComp>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
