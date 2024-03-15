import { Helmet } from "react-helmet";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";

function CustomHead() {
  const { orgData } = UseOrg();
  const url = window.location.href;
  const baseUrl = new URL(url).origin;
  console.log("🚀 ~ CustomHead ~ baseUrl:", baseUrl);
  const linkUrl = "https://albaitguests-dev.rmcc.sa/";

  return (
    <Helmet>
      <title>
        {baseUrl == linkUrl
          ? "ضيوف البيت"
          : orgData?.organizations?.name || "Rakaya"}
      </title>
      <meta
        name="description"
        content={orgData?.organizations?.description || "Default Description"}
      />
    </Helmet>
  );
}

export default CustomHead;
