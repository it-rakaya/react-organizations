/* eslint-disable react/prop-types */
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import OptionsMenu from "../Navbar/option-menu/OptionsMenu";
import OrderIcon from "../../atoms/icons/OrderIcon";
import { t } from "i18next";
import { Box } from "@mui/system";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import { useTheme } from "@mui/material/styles";

function CardOrder({
  item,
  setOpenDetailsOrder,
  setDetailsOrder,
  setOpenCancelOrder,
  setOrderId,
}) {
  const Canceled = 5;
  const approved = 3;
  const rejected = 4;

  const theme = useTheme();

  return (
    <div>
      {" "}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        xl={12}
        key={item?.id}
        style={{ width: "250px"}}
      >
        <Card
          sx={{ position: "relative" }}
          style={{
            height: "220px",
            maxHeight: "220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <OptionsMenu
            iconButtonProps={{
              size: "small",
              sx: { top: 12, right: 12, position: "absolute" },
            }}
            options={[
              {
                text: t("Details"),
                details: "Additional details here",
                function: () => {
                  setOpenDetailsOrder(true);
                  setDetailsOrder(item);
                },
              },

              { divider: true },
              {
                text: t("Cancel"),
                menuItemProps: {
                  sx:
                    item.status_id == Canceled ||
                    item.status_id == approved ||
                    item.status_id == rejected
                      ? {
                          color: "#ff87878f",
                          cursor: "not-allowed",
                        }
                      : { color: "error.main" },
                },
                function: () => {
                  if (
                    item.status_id == Canceled ||
                    item.status_id == approved ||
                    item.status_id == rejected
                  ) {
                    return;
                  } else {
                    setOpenCancelOrder(true);
                    setOrderId(item?.id);
                  }
                },
              },
            ]}
          />
          <CardContent className="  !pb-0 !pl-0 !pr-0">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <OrderIcon />
                <div
                  className="absolute left-0 px-1 text-white rounded-r-md top-12 "
                  style={{ backgroundColor: theme?.palette?.primary?.main }}
                >
                  {item?.status?.name}
                </div>
             
              <Typography
                sx={{ color: "text.secondary", marginTop:'5px' }}
                className={`text-center flex flex-col items-center  font-bold px-2 py-1 rounded-md !text-black `}
              >
                <span> رقم الطلب </span>
               <span>{item?.code}</span>
              </Typography>

              <Grid
                xs={12}
                sm={12}
                md={12}
                xl={12}
                mt={2}
                className="w-[275px]"
              >
                <ButtonComp
                  variant="contained"
                  className={`!m-0 rounded-b-md rounded-l-none rounded-r-none w-full ${
                    item?.status_id == rejected || item?.status_id == Canceled
                      ? "!bg-[#FF3B30]"
                      : ""
                  } `}
                  action={() => {
                    setOpenDetailsOrder(true);
                    setDetailsOrder(item);
                  }}
                >
                  تفاصيل طلب
                </ButtonComp>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default CardOrder;
