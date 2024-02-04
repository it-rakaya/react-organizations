import { t } from "i18next";
import { useState } from "react";
import ModalComp from "../../components/atoms/ModalComp";
import UserNotVerified from "../../components/molecules/UserNotVerified";
import VerifyUser from "../../components/molecules/VerifyUser";
import ApexChartWrapper from "../../components/react-apexcharts/ApexChartWrapper";
import UserVerified from "../../components/templates/Home/UserVerified";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";

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
      console.log("🚀 ~ Home ~ err:", err)
      notify("error", err?.response?.data.message);
    },
  });

  return (
    <ApexChartWrapper>
      <div className="match-height">
        {!user?.is_verified ? (
          <>
            <UserVerified />
          </>
        ) : (
          <UserNotVerified
            user={user}
            organization_id={orgData?.organizations?.id}
            setOpen={setOpen}
            sendOTP={sendOTP}
          />
        )}
      </div>
      <ModalComp
        open={open}
        hidden
        onClose={() => {}}
        className="!max-w-[550px]  "
        Children={
          <VerifyUser
            userData={user}
            dataValue={dataValue}
            setOpen={setOpen}
            sendOTP={sendOTP}
          />
        }
      />
    </ApexChartWrapper>
  );
};

export default Home;
