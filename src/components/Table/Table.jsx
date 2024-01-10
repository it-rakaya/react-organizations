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
  disabled,
}) => {
  const [value, setValue] = useState("");

  const isRTL = useIsRTL();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleFilter = useCallback((val) => {
    setValue(val);
    setPaginationModel((prevModel) => ({ ...prevModel, page: 0 }));
  }, []);

  // Filter rows based on the "name" property
  const filteredRows = rows.filter((row) => {
    const nameValue = String(row.name).toLowerCase();
    return nameValue.includes(value.toLowerCase());
  });

  const customLocaleText = {
    noRowsLabel: t("Not Found Data"),
    pagination: {
      rowsPerPage: t("Custom Rows Per Pageسسس"), // اختر النص الذي ترغب في استخدامه
    },
  };

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            handleFilter={handleFilter}
            value={value}
            textButton={textButton}
            actionButton={actionButton}
            placeholderSearch={placeholderSearch}
            disabled={disabled}
          />
          <DataGrid
            autoHeight
            rows={filteredRows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            style={{ width: "99%" , background:"transparent" }}
            onPaginationModelChange={setPaginationModel}
            disableColumnFilter={true}
            // hideFooter
            // hideFooterSelectedRowCount={true}
            // hideFooterPagination
            disableColumnMenu={true}
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
    </>
  );
};

export default Table;
