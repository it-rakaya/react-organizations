/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonComp from "../atoms/buttons/ButtonComp";

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
    className='inputTable'
      sx={{
        p: 5,
        pb: 3,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <TextField
        size="small"
        value={value}
        // sx={{ mr: 6 }}
        className="dark:!border-white   mx-2 ltr:md:mr-6 md:ml-6"
        placeholder={placeholderSearch}
        onChange={(e) => handleFilter(e.target.value)}
        style={{padding:"10px"}}
      />
   
        <ButtonComp
          variant="contained"
          sx={{ mb: 2 }}
          action={actionButton}
          className={"!w-full  md:!w-auto !mt-0 mx-[17px] md:mx-0"}
          disabled={disabled}
        >
          {textButton}
        </ButtonComp>
    </Box>
  );
};

export default TableHeader;
