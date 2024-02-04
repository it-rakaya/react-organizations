/* eslint-disable react/prop-types */
// ** MUI Imports
import Icon from "@mdi/react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { hexToRGBA } from "../../../utils/helpers";

const CardStatsHorizontal = (props) => {
  const { item, className, classNameBox } = props;
  const theme = useTheme();

  return (
    <>
      <Card className={className}>
        <CardContent
          sx={{ py: (theme) => `${theme.spacing(4.125)} !important ` }}
          className={classNameBox}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                background: hexToRGBA(theme?.palette?.primary?.main, 0.2),
              }}
              className=" rounded-md h-[40px] w-[40px] flex items-center justify-center ltr:!mr-2 rtl:!ml-2  rtl:md:ml-6 "
            >
              <Icon
                path={item?.icon}
                size={1}
                style={{ color: theme?.palette?.primary?.main }}
              />
            </div>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  className="font-semibold text-black dark:text-white !text-[12px] md:text-[16px]"
                >
                  {item.stats}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                className="text-black dark:text-white text-[12px]"
              >
                {item?.title}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CardStatsHorizontal;
