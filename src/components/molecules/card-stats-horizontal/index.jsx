/* eslint-disable react/prop-types */
// ** MUI Imports
import Icon from "@mdi/react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const CardStatsHorizontal = (props) => {
  const { item } = props;

  return (
    <>
      <Card>
        <CardContent
          sx={{ py: (theme) => `${theme.spacing(4.125)} !important` }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <div className="bg-[#c5b27917] rounded-md h-[40px] w-[40px] flex items-center justify-center ltr:mr-6  rtl:ml-6 ">
              <Icon path={item?.icon} size={1} className=" text-primary" />
            </div>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" className="text-black dark:text-white">{item.stats}</Typography>
              </Box>
              <Typography variant="caption" className="text-black dark:text-white">
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
