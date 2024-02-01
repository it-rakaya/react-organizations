/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";

function Paginate({ page, totalPages, handleChange }) {
  return (
    <div className="flex justify-center mt-5">
      <Pagination
        count={totalPages}
        page={page}
        variant="outline"
        color="primary"
        shape="rounded"
        onChange={handleChange}
      />
    </div>
  );
}

export default Paginate;
