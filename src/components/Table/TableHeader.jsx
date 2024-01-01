/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ButtonComp from "../atoms/buttons/ButtonComp";

const TableHeader = (props) => {
  const { handleFilter,  value , textButton , actionButton  , placeholderSearch } = props;

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "end",
        justifyContent: "end",
      }}
    >
      <TextField
        size="small"
        value={value}
        sx={{ mr: 6 }}
        placeholder={placeholderSearch}
        onChange={(e) => handleFilter(e.target.value)}
      />
      <ButtonComp
        variant="contained"
        sx={{ mb: 2 }}
        action={actionButton}
        className={"!w-auto mt-0"}
      >
        {textButton}
      </ButtonComp>
    </Box>
  );
};

export default TableHeader;
