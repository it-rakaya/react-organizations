import { Helmet } from "react-helmet";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";

function CustomHead() {
  const { orgData } = UseOrg();

  return (
    <Helmet>
      <title>{orgData?.organizations?.name || "Rakaya"}</title>
      <meta
        name="description"
        content={orgData?.organizations?.description || "Default Description"}
      />
    </Helmet>
  );
}

export default CustomHead;
