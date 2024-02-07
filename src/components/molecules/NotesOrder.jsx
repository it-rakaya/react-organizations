import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Box, CardContent, Typography } from "@mui/material";
import { t } from "i18next";
import TermsConditionIcon from "../atoms/icons/TermsConditionIcon";

/* eslint-disable react/prop-types */
function NotesOrder({ notes }) {
  return notes?.length ? (
    notes?.map((item) => (
      <>
        <CardContent>
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color={"primary"} />
                <TimelineConnector className=" dark:!bg-white" />
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    // mb: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Typography
                      variant="caption"
                      className="font-semibold text-black dark:text-white"
                    >
                      {item?.user_name}{" "}
                    </Typography>
                    <div className="text-black dark:text-white">
                      {item?.content}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Typography variant="caption text-black dark:text-white">
                      {item?.since}
                    </Typography>
                    <Typography variant="caption text-black dark:text-white">
                      {item?.created_at?.slice(0, 10)}
                    </Typography>
                  </div>
                </Box>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </CardContent>
      </>
    ))
  ) : (
    <div className="flex flex-col mt-10 text-2xl font-bold justify-center items-center h-[42vh] ">
      <div>
        <TermsConditionIcon />
      </div>
      <p className="mt-10 text-black dark:text-white ">{t("There is no notes")}</p>
    </div>
  );
}

export default NotesOrder;
