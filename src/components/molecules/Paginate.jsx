/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";

function Paginate({ page, totalPages, handleChange }) {
  return (
    <div className="flex justify-center mt-5">
      <Pagination
        count={totalPages}
        page={page}
        variant="outlined"
        color="primary"
        shape="rounded"
        // style={{}}
        onChange={handleChange}
      />
    </div>
  );
}

export default Paginate;
