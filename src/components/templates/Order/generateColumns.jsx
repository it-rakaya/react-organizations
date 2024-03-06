import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Typography } from "@mui/material";
import { t } from "i18next";
import { convertToHijri, padWithZero } from "../../../utils/helpers";
import { notify } from "../../../utils/toast";
import OptionsMenu from "../../organisms/Navbar/option-menu/OptionsMenu";

export const generateColumns = ({
  Canceled,
  isRTL,
  setDetailsOrder,
  setOpenDetailsOrder,
  setOpenCancelOrder,
  setOrderId,
}) => {
  return [
    {
      Header: t("code"),
      Cell: (info) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{ ...info.column.cellSize }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "5px",
            }}
          >
            <Typography
              noWrap
              variant="caption"
              className="text-black dark:text-white"
            >
              {`#${info.row?.original?.code}`}
            </Typography>
          </Box>
        </Box>
      ),
      cellSize: {
        width: "120px",
        height: "50px",
        margin: "auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      },
      accessor: "code",
    },
    {
      Header: t("service name"),
      Cell: (info) => (
        <Typography
          noWrap
          variant="body2"
          className="text-black dark:text-white"
          style={{ ...info.column.cellSize }}
        >
          {isRTL
            ? info?.row?.original?.service?.name_ar
            : info?.row?.original?.service?.name_en}
        </Typography>
      ),
      cellSize: {
        width: "150px",
        height: "50px",
        margin: "auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      },
      accessor: "service",
    },
    {
      Header: t("facility name"),
      Cell: (info) => (
        <Typography
          noWrap
          sx={{ color: "text.secondary", textTransform: "capitalize" }}
          className="text-black dark:text-white"
          style={{ ...info.column.cellSize }}
        >
          {info?.row?.original?.facility?.name.length > 20
            ? `${info?.row?.original?.facility?.name.slice(0, 15)}...`
            : info?.row?.original?.facility?.name}
        </Typography>
      ),
      cellSize: {
        width: "150px",
        height: "50px",
        margin: "auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      },
      accessor: "facility",
    },

    {
      Header: t("status"),
      Cell: (info) => (
        <Typography
          variant="subtitle1"
          noWrap
          style={{ ...info.column.cellSize }}
          sx={{
            textTransform: "capitalize",
            backgroundColor: info?.row?.original?.status?.color,
            color: "white",
            borderRadius: "5px",
            padding: "0 10px",
          }}
          className="text-white"
        >
          {isRTL
            ? info?.row?.original.status?.name_ar
            : info?.row?.original.status?.name_en}
        </Typography>
      ),
      cellSize: {
        width: "100px",
        height: "",
        margin: "auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      },
      accessor: "status",
    },
    {
      Header: t("create at"),
      Cell: (info) => (
        <Typography
          variant="subtitle1"
          noWrap
          style={{ ...info.column.cellSize }}
          sx={{
            textTransform: "capitalize",
          }}
          className="text-black dark:text-white"
        >
          <div className="flex items-center justify-center gap-1 text-center dark:text-white">
            <p className="text-[15px] dark:text-white ">
              {info?.row?.original.created_at?.slice(0, 10)}
            </p>
            /
            <p className="text-[15px] dark:text-white " dir="rtl">
              {convertToHijri(info?.row?.original.created_at).hy}-
              {padWithZero(convertToHijri(info?.row?.original.created_at).hm)}-
              {padWithZero(convertToHijri(info?.row?.original.created_at).hd)}
            </p>
            {t("H")}
          </div>
        </Typography>
      ),
      cellSize: {
        width: "200px",
        height: "50px",
        margin: "auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      },
      accessor: "created_at",
    },

    {
      Header: t("actions"),
      Cell: (info) => (
        <Typography
          variant="subtitle1"
          noWrap
          style={{ ...info.column.cellSize }}
          sx={{
            textTransform: "capitalize",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
          className="items-center justify-center w-full "
        >
          {info?.row?.original.status?.name_en == "Canceled" ? (
            <Icon path={mdiDotsVertical} size={1} />
          ) : (
            <div className="flex justify-center cursor-pointer ">
              <OptionsMenu
                iconButtonProps={{
                  size: "small",
                }}
                className={
                  info?.row?.original.status?.name_en == "Canceled"
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }
                options={
                  info?.row?.original.status?.name_en == "Accepted" ||
                  info?.row?.original.status?.name_en == "Approved" ||
                  info?.row?.original.status?.name_en == "Confirmed"
                    ? [
                        {
                          text: t("Details"),

                          details: "Additional details here",
                          function: () => {
                            if (info?.row?.original.status_id == Canceled) {
                              return notify(
                                "worning",
                                t("cant Canceled order")
                              );
                            } else {
                              setOpenDetailsOrder(true);
                              setDetailsOrder(info?.row?.original);
                            }
                          },
                        },
                      ]
                    : info?.row?.original.status?.name_en !== "Rejected"
                    ? [
                        {
                          text: t("Details"),

                          details: "Additional details here",
                          function: () => {
                            if (info?.row?.original.status_id == Canceled) {
                              return notify(
                                "worning",
                                t("cant Canceled order")
                              );
                            } else {
                              setOpenDetailsOrder(true);
                              setDetailsOrder(info?.row?.original);
                            }
                          },
                        },
                        {
                          text: t("Cancel"),
                          details: "Additional details here",
                          function: () => {
                            if (info?.row?.original.status_id == Canceled) {
                              return;
                            } else {
                              setOrderId(info?.row?.original.id);
                              setOpenCancelOrder(true);
                            }
                          },
                        },
                      ]
                    : [
                        {
                          text: t("Details"),

                          details: "Additional details here",
                          function: () => {
                            if (info?.row?.original.status_id == Canceled) {
                              return notify(
                                "worning",
                                t("cant Canceled order")
                              );
                            } else {
                              setOpenDetailsOrder(true);
                              setDetailsOrder(info?.row?.original);
                            }
                          },
                        },
                      ]
                }
              />
            </div>
          )}
        </Typography>
      ),
      cellSize: { width: "100px", height: "50px", margin: "auto" },
      accessor: "d",
    },
  ];
};
