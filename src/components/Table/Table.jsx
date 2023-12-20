/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import TableHeader from "./TableHeader";
import { useIsRTL } from "../../hooks/useIsRTL";
import { t } from "i18next";

const Table = ({
  columns,
  rows,
  textButton,
  actionButton,
  placeholderSearch,
}) => {
  const [value, setValue] = useState("");

  const isRTL = useIsRTL();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const handleFilter = useCallback((val) => {
    setValue(val);
  }, []);
  const customLocaleText = {
    noRowsLabel: t("Not Found Data"),
    pagination: {
      rowsPerPage: "ssssssssssssssssssssssssss Rows per page:", // Add your custom "Rows per page" label here
    },
  };

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
            style={{ width: "99%" }}
            onPaginationModelChange={setPaginationModel}
            disableColumnFilter={true}
            i18nIsDynamicList={isRTL}
            localeText={customLocaleText}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                borderRadius: 0,
                width: "100%",
              },
            }}
          />
        </Card>
      </Grid>
      {/* // </Grid> */}
    </>
  );
};

export default Table;
