import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import MainHeader from "../../components/atoms/MainHeader";
import OptionsMenu from "../../components/organisms/Navbar/option-menu/OptionsMenu";
import ModalComp from "../../components/atoms/ModalComp";
import DetailsEmployee from "../../components/templates/myEmployee/DetailsEmployee";
import Loading from "../../components/molecules/Loading";
import DataNotFound from "../../components/molecules/NotFound";
import useFetch from "../../hooks/useFetch";

export default function MyEmployees() {
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [detailsItem, setDetailsItem] = useState();

  const {
    data: employees,
    isLoading,
    isRefetching,
  } = useFetch({
    endpoint: `facility-employees`,
    queryKey: ["facility_employees"],
    onError(e) {
      console.log("e", e);
    },
  });
  console.log("🚀 ~ file: MyEmployees.jsx:24 ~ MyEmployees ~ employees:", employees)


  const handleEdit = () => {
    setShow(true); 
  };

  return (
    <div>
      <MainHeader title="الموظفين" />
      {isLoading || isRefetching ? (
        <Loading />
      ) : employees?.employees.length ? (
        <>
          <Grid container spacing={6}>
            {employees?.employees.map((item) => (
              <Grid item xs={12} sm={4} md={3} key={item?.id}>
                <Card sx={{ position: "relative" }}>
                  <OptionsMenu
                    iconButtonProps={{
                      size: "small",
                      sx: { top: 12, right: 12, position: "absolute" },
                    }}
                    options={[
                      {
                        text: "تفاصيل",
                        details: "Additional details here",
                        function: () => {
                          // Add your custom function logic here
                          setOpen(true);
                          setDetailsItem(item);
                        },
                      },

                      { text: "تعديل", onClick: handleEdit },
                      { divider: true },
                      {
                        text: "حذف",
                        menuItemProps: { sx: { color: "error.main" } },
                      },
                    ]}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src={"/images/avatars/9.png"}
                        sx={{ mb: 4, width: 100, height: 100 }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {item?.name}
                      </Typography>
                      <Typography
                        sx={{ mb: 4, color: "text.secondary" }}
                        className="text-center"
                      >
                        {" "}
                        {item?.position}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <ModalComp
            open={open}
            onClose={() => setOpen(false)}
            Children={<DetailsEmployee data={detailsItem} />}
          />
        </>
      ) : (
        <DataNotFound title={"لايوجد موظفين"} />
      )}
    </div>
  );
}
