/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { t } from "i18next";
import { useEffect, useMemo } from "react";
import { usePagination, useTable } from "react-table";
import ArrowLeft from "../atoms/icons/ArrowLeft";
import ArrowRight from "../atoms/icons/ArrowRight";

function TableComp({
  data,
  columns,
  setPaginationModel,
  paginationModel,
  totalData,
}) {
  const pageCount = useMemo(() => {
    const totalRows = totalData.length;
    return Math.ceil(totalRows / paginationModel.pageSize);
  }, [paginationModel.pageSize, totalData.length]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: paginationModel.page,
        pageSize: paginationModel.pageSize,
      },
      pageCount: pageCount,
    },
    usePagination
  );

  function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  const isApple = isSafari() || isIOS();

  useEffect(() => {
    setPageSize(paginationModel.pageSize);
    gotoPage(paginationModel.page);
  }, [paginationModel, setPageSize, gotoPage]);
  const handleNextPage = () => {
    const nextPageIndex = pageIndex + 1;
    nextPage();
    setPaginationModel((prev) => ({ ...prev, page: nextPageIndex }));
  };

  const handlePreviousPage = () => {
    const previousPageIndex = Math.max(0, pageIndex - 1);
    previousPage();
    setPaginationModel((prev) => ({ ...prev, page: previousPageIndex }));
  };
  return (
    <>
      <div className="overflow-x-scroll">
        <table {...getTableProps()} className="w-full ">
          <thead className="w-full px-4 ">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="border-y border-[#e9e9ec]">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{ fontWeight: "400" }}
                    className="px-4  py-4 text-center text-[0.75rem] !text-black dark:!text-white capitalize headerTable"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} className=" table-class">
            {data.length ? (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="">
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
              })
            ) : (
              <tr className=" capitalize h-[100px] text-center w-full relative">
                <td
                  style={{ transform: "translate(-50% , -50%)" }}
                  className={`absolute    text-black dark:text-white top-[50%]  xl:top-[50%] left-[50%] ${
                    isApple && "top-[60%]"
                  }   `}
                >
                  {t("not found data")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center w-full gap-5 pt-2 pagination flex-end md:px-[66px]  ">
        <div className="flex items-center gap-2 text-[10px] md:text-[14px] ">
          <p className="text-black dark:text-white !text-[10px] md:!text-[14px]">
            {" "}
            {t("rows per page")}
          </p>
          <select
            value={pageSize === totalData?.length ? "all" : pageSize}
            onChange={(e) => {
              const value = e.target.value;
              const newSize =
                value === "all" ? totalData?.length : Number(value);
              setPageSize(newSize);
              setPaginationModel((prev) => ({ ...prev, pageSize: newSize }));
            }}
            className="!text-black dark:!text-white border border-[#555d64] rounded-md py-2 px-1"
          >
            {[10, 20, 30, 40, 50, 100, 1000].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          
          </select>
        </div>
        <div className="flex items-center gap-5 ">
    
          <span className="!text-black dark:!text-white text-[10px] md:text-[14px]">
            <span className="mx-1 text-[12px] md:text-[14px]">{t("Page")}</span>
            <strong>
              {pageIndex + 1}
              <span className="mx-1 text-[12px] md:text-[14px]">
                {" "}
                {t("of")}{" "}
              </span>

              {pageCount}
            </strong>{" "}
          </span>
          <div className="flex items-center justify-center" dir={"ltr"}>
            <button
              onClick={handleNextPage}
              // disabled={paginationModel.page === 0}
              className="!text-black dark:!text-white cursor-pointer"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={handlePreviousPage}
              // disabled={!canNextPage}
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
