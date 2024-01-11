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
                <TimelineConnector />
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
                    <Typography variant="caption" className="font-semibold">
                      {item?.user_name}{" "}
                    </Typography>
                    <div
                      key={item?.id}
                      dangerouslySetInnerHTML={{
                        __html: item?.content,
                      }}
                    ></div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Typography variant="caption">{item?.since}</Typography>
                    <Typography variant="caption">
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
    <div className="mt-10 text-2xl font-bold text-black dark:text-white">
      {" "}
     {t("There is no notes")}
    </div>
  );
}

export default NotesOrder;
