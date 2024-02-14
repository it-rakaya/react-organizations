/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import { useIsRTL } from "../../hooks/useIsRTL";
import TableComp from "../tantable/TableComp";
import TableHeader from "./TableHeader";
import { useMemo } from "react";

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

  const filteredRows = useMemo(() => {
    const searchFiltered = !value
      ? rows
      : rows.filter((row) =>
          columns.some((column) => {
            const cellValue = row[column.accessor];
            return typeof cellValue === "string" ||
              typeof cellValue === "number"
              ? cellValue.toString().toLowerCase().includes(value.toLowerCase())
              : false;
          })
        );

    const startIndex = paginationModel.page * paginationModel.pageSize;
    const paginatedItems = searchFiltered.slice(
      startIndex,
      startIndex + paginationModel.pageSize
    );
    return paginatedItems;
  }, [value, rows, columns, paginationModel]);

  return (
    <>
      <Grid item xs={12}>
        <Card dir={isRTL ? "rtl" : "ltr"}>
          <TableHeader
            handleFilter={handleFilter}
            value={value}
            textButton={textButton}
            actionButton={actionButton}
            placeholderSearch={placeholderSearch}
            disabled={disabled}
          />
          {/* <DataGrid
            autoHeight
            rows={filteredRows}
            
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            style={{ width: "99%", background: "transparent" }}
            onPaginationModelChange={setPaginationModel}
            disableColumnFilter={true}
            disableColumnMenu={true}
            i18nIsDynamicList={isRTL}
            localeText={customLocaleText}
            componentsProps={{
              pagination: {
                labelRowsPerPage: t("rows per page"),
              },
            }}
            class
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                borderRadius: 0,
                width: "100%",
              },
              "& .MuiTablePagination-displayedRows": {
                color: "black",
              },
              "& .MuiSelect-select.MuiTablePagination-select": {
                color: "black",
              },
            }}
          /> */}
          <div className="relative px-2 pt-3  pb-[10px]">
            <TableComp
              columns={columns}
              data={filteredRows}
              setPaginationModel={setPaginationModel}
              paginationModel={paginationModel}
            />
          </div>
        </Card>
      </Grid>
    </>
  );
};

export default Table;
