import { Alert, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import ModalComp from "../../components/atoms/ModalComp";
import IconifyIcon from "../../components/atoms/icons/IconifyIcon";
import VerifyUser from "../../components/molecules/VerifyUser";
import AnalyticsActivityTimeline from "../../components/molecules/analytics/AnalyticsActivityTimeline";
import AnalyticsCongratulations from "../../components/molecules/analytics/AnalyticsCongratulations";
import AnalyticsOverview from "../../components/molecules/analytics/AnalyticsOverview";
import AnalyticsPerformance from "../../components/molecules/analytics/AnalyticsPerformance";
import AnalyticsProjectStatistics from "../../components/molecules/analytics/AnalyticsProjectStatistics";
import AnalyticsSalesCountry from "../../components/molecules/analytics/AnalyticsSalesCountry";
import AnalyticsSessions from "../../components/molecules/analytics/AnalyticsSessions";
import AnalyticsTopReferralSources from "../../components/molecules/analytics/AnalyticsTopReferralSources";
import AnalyticsTotalRevenue from "../../components/molecules/analytics/AnalyticsTotalRevenue";
import AnalyticsTotalTransactions from "../../components/molecules/analytics/AnalyticsTotalTransactions";
import AnalyticsVisitsByDay from "../../components/molecules/analytics/AnalyticsVisitsByDay";
import AnalyticsWeeklySales from "../../components/molecules/analytics/AnalyticsWeeklySales";
import CardStatsVertical from "../../components/molecules/card-stats-vertical/CardStatsVertical";
import ApexChartWrapper from "../../components/react-apexcharts/ApexChartWrapper";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { t } from "i18next";
import UserNotVerifiedIcon from "../../components/atoms/icons/UserNotVerifiedIcon";
import UserNotVerified from "../../components/molecules/UserNotVerified";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [dataValue, setDataValue] = useState();
  const { user } = useAuth();
  const { orgData } = UseOrg();

  const { mutate: sendOTP } = useMutate({
    mutationKey: [`send-otp`],
    endpoint: `send-otp`,
    onSuccess: (data) => {
      setDataValue(data?.data?.verification);
      notify("success", t("Verification code has been sent successfully"));
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
  });

  return (
    <ApexChartWrapper>
      {/* {user?.is_verified && (
        <div className="py-3">
          <Alert severity="warning" className="flex items-center ">
            لإضافة منشأة جديدة أو تقديم طلب جديد يرجى تفعيل حسابك !
            <Button
              variant="text"
              onClick={() => {
                setOpen(true);
                sendOTP({
                  organization_id: orgData?.organizations?.id,
                  phone: user?.phone,
                  phone_code: user?.phone_code,
                });
              }}
            >
              للتفعيل اضغط هنا{" "}
            </Button>
          </Alert>
        </div>
      )} */}
      <Grid container spacing={6} className="match-height">
        <Grid item xs={12} md={user?.is_verified ? 8 : 12}>
          <AnalyticsCongratulations userData={user} />
        </Grid>
        {user?.is_verified ? (
          <>
            <Grid item xs={6} md={2}>
              <CardStatsVertical
                stats="155k"
                color="primary"
                trendNumber="+22%"
                title="Total Orders"
                chipText="Last 4 Month"
                icon={<IconifyIcon icon="mdi:cart-plus" />}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <AnalyticsSessions />
            </Grid>
            <Grid item xs={12} md={8}>
              <AnalyticsTotalTransactions />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AnalyticsPerformance />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AnalyticsProjectStatistics />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <AnalyticsTotalRevenue />
                </Grid>
                <Grid item xs={6}>
                  <CardStatsVertical
                    stats="$13.4k"
                    color="success"
                    trendNumber="+38%"
                    title="Total Sales"
                    chipText="Last Six Month"
                    icon={<IconifyIcon icon="mdi:currency-usd" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardStatsVertical
                    color="info"
                    stats="142.8k"
                    trendNumber="+62%"
                    chipText="Last One Year"
                    title="Total Impressions"
                    icon={<IconifyIcon icon="mdi:link" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <AnalyticsOverview />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AnalyticsSalesCountry />
            </Grid>
            <Grid item xs={12} md={8}>
              <AnalyticsTopReferralSources />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AnalyticsWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AnalyticsVisitsByDay />
            </Grid>
            <Grid item xs={12} md={8}>
              <AnalyticsActivityTimeline />
            </Grid>
          </>
        ) : (
          <UserNotVerified
            user={user}
            organization_id={orgData?.organizations?.id}
            setOpen={setOpen}
            sendOTP={sendOTP}
          />
        )}
      </Grid>
      <ModalComp
        open={open}
        hidden
        onClose={() => {}}
        Children={
          <VerifyUser
            userData={user}
            dataValue={dataValue}
            setOpen={setOpen}
            sendOTP={sendOTP}
          />
        }
        className={"w-1/2"}
      />
    </ApexChartWrapper>
  );
};

export default Home;
