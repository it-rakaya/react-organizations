import { Box, Typography } from "@mui/material";
import { t } from "i18next";
import OptionsMenu from "../../organisms/Navbar/option-menu/OptionsMenu";
import PadgePreview from "../../molecules/PadgePreview";

export const generateColumns = ({
  theme,
  isRTL,
  setEmployeeId,
  setModelDeleteEMployee,
}) => {
  return [
    {
      Header: t("name"),
      Cell: (info) => {
        // Logic to determine the profile picture URL
        const profilePictureAttachment = info.row.original.attachmentUrl.find(
          (attachment) =>
            attachment.label_en === "Profile Picture" ||
            attachment.label_ar === "صورة الملف الشخصي"
        );
        const profilePictureUrl = profilePictureAttachment
          ? profilePictureAttachment.value
          : "https://front-api.rmcc.sa/build/images/users/32/person.png"; // Replace with your actual default image path

        return (
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            style={{ ...info.column.cellSize }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "5px",
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    profilePictureUrl?.endsWith(".pdf")
                      ? "https://front-api.rmcc.sa/build/images/users/32/person.png"
                      : profilePictureUrl
                  }
                  alt="Profile"
                  className="w-[40px] h-[40px] rounded-full border border-solid"
                  style={{
                    borderColor: theme?.palette?.primary.main,
                    backgroundColor: theme?.palette?.primary.main,
                  }}
                />
                <p className="text-black dark:text-white">
                  {info.row.original.name.length > 30
                    ? `${info.row.original.name.slice(0, 15)}...`
                    : info.row.original.name}
                </p>
              </div>
            </Box>
          </Box>
        );
      },
      cellSize: { width: "170px", height: "50px", margin: "auto" },

      accessor: "name",
    },
    {
      Header: t("facility name"),
      Cell: (info) => (
        <Box style={{ ...info.column.cellSize }}>
          <span>
            {info?.row?.original.facility_name.length > 30
              ? `${info?.row?.original.facility_name.slice(0, 20)}...`
              : info?.row?.original.facility_name}
          </span>
        </Box>
      ),
      cellSize: {
        maxWidth: "200px",
        width: "200px",
        height: "50px",
        margin: "auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      },
      accessor: "facility_name",
    },
    {
      Header: t("National ID"),
      Cell: (info) => (
        <div style={{ ...info.column.cellSize }}>
          <span>{info?.row?.original.national_id}</span>
        </div>
      ),
      cellSize: {
        width: "fit-content",
        height: "50px",
        margin: "auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      },

      accessor: "national_id",
    },
    {
      Header: t("position"),
      Cell: (info) => (
        <div style={{ ...info.column.cellSize }}>
          <span>{info?.row?.original.position_name}</span>
        </div>
      ),
      cellSize: {
        width: "200px",
        height: "50px",
        margin: "auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      },

      accessor: "position_name",
    },
    {
      Header: t("attachment"),

      Cell: (info) => (
        <Typography
          variant="subtitle1"
          noWrap
          sx={{
            textTransform: "capitalize",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "5px",
            // marginTop:"50px",
            // marginBottom:"50px"
          }}
          style={{ ...info.column.cellSize }}
          className="text-black dark:text-white"
        >
          {info?.row?.original?.attachmentUrl.map((item) => (
            <div className="w-[87px] text-center" key={item?.id}>
              {!item?.value?.toLowerCase().endsWith(".pdf") ? (
                <div
                  className="flex justify-center rounded-sm"
                  style={{ background: theme?.palette?.primary.main }}
                >
                  <PadgePreview
                    url={item?.value}
                    label={isRTL ? item?.label_ar : item?.label_en}
                  />
                </div>
              ) : (
                <div
                  className="px-1 text-center rounded-sm bg-primary"
                  style={{
                    background: theme?.palette?.primary.main,
                    opacity: "0,8",
                  }}
                >
                  <a
                    href={item?.value}
                    download={item?.value}
                    target="_blank"
                    className="text-center "
                    rel="noreferrer"
                  >
                    <p className="!text-[10px] text-white px-1 flex justify-center ">
                      {isRTL ? item?.label_ar : item?.label_en}
                    </p>
                  </a>
                </div>
              )}
            </div>
          ))}
        </Typography>
      ),
      cellSize: {
        width: "180px",
        height: "50px",
        margin: "auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      },
      accessor: "attach",
    },
    {
      Header: t("actions"),
      Cell: (info) => (
        <Typography variant="subtitle1" style={{ ...info.column.cellSize }}>
          <div className="flex justify-center cursor-pointer">
            <OptionsMenu
              iconButtonProps={{
                size: "small",
              }}
              options={[
                {
                  text: t("Delete"),
                  details: "Additional details here",
                  function: () => {
                    setEmployeeId(info.row?.original.id);
                    setModelDeleteEMployee(true);
                  },
                },
              ]}
            />
          </div>
        </Typography>
      ),
      cellSize: { width: "100px", height: "50px", margin: "auto" },
      accessor: "d",
    },
  ];
};
