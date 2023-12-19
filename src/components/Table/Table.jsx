/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import TableHeader from "./TableHeader";

const Table = ({
  columns,
  rows,
  textButton,
  actionButton,
  placeholderSearch,
}) => {
  const [value, setValue] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);

  return (
    <>
    {/* // <Grid  spacing={6}> */}
 <Grid item xs={12}>
   <Card>
          <TableHeader
            handleFilter={handleFilter}
            value={value}
            textButton={textButton}
            actionButton={actionButton}
            placeholderSearch={placeholderSearch}
          />
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            style={{width:"99%"}}
            onPaginationModelChange={setPaginationModel}
            sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0  , width:"100%" } }}
          />
        </Card>
      </Grid>
    {/* // </Grid> */}
    </>
  );
};

export default Table;
