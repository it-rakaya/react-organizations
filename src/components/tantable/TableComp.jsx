/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { t } from "i18next";
import { usePagination, useTable } from "react-table";
import ArrowLeft from "../atoms/icons/ArrowLeft";
import ArrowRight from "../atoms/icons/ArrowRight";

function TableComp({ data, columns }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // Pagination hooks
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // You can set initial page index here
    },
    usePagination
  );
  return (
    <>
      <table {...getTableProps()} className="w-full ">
        <thead className="w-full px-4">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ fontWeight: "400" }}
                  className="px-4  py-2 pb-4 text-center text-[0.75rem] !text-black dark:!text-white capitalize "
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="border-y border-[#e9e9ec] dark:border-dark-primary"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{ fontWeight: "400" }}
                      className="px-4 py-1 text-center text-[1rem] !text-black dark:!text-white capitalize "
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end w-full gap-5 pt-2 pagination flex-end md:px-[66px]">
        <div className="flex items-center gap-2 text-[10px] md:text-[14px] ">
          <p className="text-black dark:text-white !text-[12px] md:!text-[14px]"> {t("rows per page")}</p>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="!text-black dark:!text-white border border-[#555d64] rounded-md py-2 px-1"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}
                className="!text-black dark:!text-white bg-[#555d64] border-[#555d64] rounded-md "
              >
                <p className="!text-black dark:!text-white">{pageSize}</p>
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-5 ">
          {/* <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="!text-black dark:!text-white"
          >
            {"<<"}
          </button> */}

          {/* <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="!text-black dark:!text-white"
          >
            {">>"}
          </button> */}
          <span className="!text-black dark:!text-white text-[10px] md:text-[14px]">
            <span className="mx-1 text-[12px] md:text-[14px]">{t("Page")}</span>
            <strong>
              {pageIndex + 1}
              <span className="mx-1 text-[12px] md:text-[14px]"> {t("of")} </span>

              {pageOptions.length}
            </strong>{" "}
          </span>
          <div dir={"ltr"}>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="!text-black dark:!text-white cursor-pointer"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="!text-black dark:!text-white cursor-pointer"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableComp;
