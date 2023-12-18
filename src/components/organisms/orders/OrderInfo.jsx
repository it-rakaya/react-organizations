/* eslint-disable react/prop-types */
import {
    mdiChartLineVariant,
    mdiCheck,
    mdiClose,
    mdiPoll
} from "@mdi/js";
import { Grid } from "@mui/material";
import { t } from "i18next";
import CardStatsHorizontal from "../../molecules/card-stats-horizontal";

function OrderInfo({ Orders }) {
  const approved = 3;
  const New = 6;
  const rejected = 4;

  const NewOrders = Orders?.all_user_orders?.filter(
    (obj) => obj.status_id == New
  );
  const approvedOrders = Orders?.all_user_orders?.filter(
    (obj) => obj.status_id == approved
  );
  const rejectedOrders = Orders?.all_user_orders?.filter(
    (obj) => obj.status_id == rejected
  );

  const numberOfOrders = NewOrders?.length;
  const numberOfApproved = approvedOrders?.length;
  const numberOfRejected = rejectedOrders?.length;

  const data = [
    {
        trendNumber: "8.1",
        title: t("All Orders"),
        stats: Orders?.all_user_orders?.length,
        icon: mdiPoll,
      },
    {
      trendNumber: "8.1",
      title: t("New Orders"),
      stats: numberOfOrders,
      icon: mdiChartLineVariant,
    },
    {
      trendNumber: "8.1",
      title: t("Approved Orders"),
      stats: numberOfApproved,
      icon: mdiCheck,
    },

    {
      trendNumber: "8.1",
      title: t("Rejected"),
      stats: numberOfRejected,
      icon: mdiClose,
    },
  ];
  return (
    <Grid item xs={12} mb={5}>
      <Grid container spacing={6}>
        {data?.map((item, index) => (
          <Grid xs={12} md={3} sm={6} item key={index}>
            <CardStatsHorizontal item={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default OrderInfo;