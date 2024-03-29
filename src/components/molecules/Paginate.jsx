/* eslint-disable react/prop-types */
import usePagination from "@mui/material/usePagination";
import styled from "styled-components";
import ArrowLeft from "../atoms/icons/ArrowLeft";
import ArrowRight from "../atoms/icons/ArrowRight";
import { useTheme } from "@mui/material/styles";
import { hexToRGBA } from "../../utils/helpers";
import { useIsRTL } from "../../hooks/useIsRTL";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});

function Paginate({ page, totalPages, handleChange }) {
  const { items } = usePagination({
    count: totalPages,
    page,
  });
  const theme = useTheme();
  const isRTL = useIsRTL();

  return (
    <div className="mt-5">
      <div>
        <nav>
          <List>
            {items.map(({ page, type, selected }, index) => {
              let children = null;

              if (type === "start-ellipsis" || type === "end-ellipsis") {
                children = (
                  <div className="bg-transparent">
                    <span
                      className="bg-transparent"
                      dangerouslySetInnerHTML={{ __html: "&period;" }}
                    />
                    <span
                      className="bg-transparent"
                      dangerouslySetInnerHTML={{ __html: "&period;" }}
                    />
                    <span
                      className="bg-transparent"
                      dangerouslySetInnerHTML={{ __html: "&period;" }}
                    />
                  </div>
                );
              } else if (type == "page") {
                children = (
                  <button
                    type="button"
                    style={{
                      background: selected ? theme.palette.primary?.main : "",
                      color: selected ? "white" : "",
                      borderColor: theme.palette.primary?.main,
                    }}
                    className="p-1 border flex items-center justify-center w-[30px] h-[30px]  border-solid rounded-full "
                    onClick={(event) => handleChange(event, page)} // تمرير event هنا
                    // {...item}
                  >
                    {page}
                  </button>
                );
              } else if (type === "previous") {
                children = (
                  <button
                    type="button"
                    className="flex items-center justify-center   border rounded-md h-[30px] w-[30px] disabled:cursor-not-allowed"
                    disabled={page == 0}
                    style={{
                      background: hexToRGBA(theme.palette.primary?.main, 0.5),
                    }}
                    onClick={(event) => handleChange(event, page)}
                    // {...item}
                  >
                    {isRTL ? <ArrowRight /> : <ArrowLeft />}{" "}
                  </button>
                );
              } else if (type === "next") {
                children = (
                  <button
                    type="button"
                    className="flex items-center justify-center  border rounded-md h-[30px] w-[30px]"
                    onClick={(event) => handleChange(event, page)}
                    disabled={page == totalPages + 1}
                    style={{
                      background: hexToRGBA(theme.palette.primary?.main, 0.5),
                    }}
                  >
                    {isRTL ? <ArrowLeft /> : <ArrowRight />}
                  </button>
                );
              }

              return <li key={index}>{children}</li>;
            })}
          </List>
        </nav>
      </div>
      {/* <div className="flex justify-center mt-5">
      <Pagination
        count={totalPages}
        page={page}
        variant="outlined"
        color="primary"
        shape="rounded"
        // style={{}}
        onChange={handleChange}
      />
    </div> */}
    </div>
  );
}

export default Paginate;
