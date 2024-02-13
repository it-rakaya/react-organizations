/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonComp from "../atoms/buttons/ButtonComp";
import SearchIcon from "../atoms/icons/SearchIcon";

const TableHeader = (props) => {
  const {
    handleFilter,
    value,
    textButton,
    actionButton,
    placeholderSearch,
    disabled,
  } = props;

  return (
    <Box
      className="inputTable"
      sx={{
        p: 5,
        pb: 3,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      {/* <TextField
        size="small"
        value={value}
        // sx={{ mr: 6 }}
        className="dark:!border-white   mx-2 ltr:md:mr-6 md:ml-6 w-full md:w-auto"
        placeholder={placeholderSearch}
        onChange={(e) => handleFilter(e.target.value)}
        style={{padding:"10px"}}
      /> */}
      <div className="relative ">
        <input
          type="text"
          value={value}
          placeholder={placeholderSearch}
          onChange={(e) => handleFilter(e.target.value)}
          
          className="dark:!border-white w-full outline-none mb-2 md:mb-0  md:mx-2 ltr:md:mr-6  md:ml-6 md:w-auto border !border-[#cecece] p-[9px]  rounded-[10px]"
        />
      </div>

      <ButtonComp
        variant="contained"
        sx={{ mb: 2 }}
        action={actionButton}
        className={"!w-full  md:!w-auto !mt-0 mx-0 "}
        disabled={disabled}
      >
        {textButton}
      </ButtonComp>
    </Box>
  );
};

export default TableHeader;
