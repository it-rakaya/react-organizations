/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: "0px 4px 24px -1px rgba(0, 0, 0, 0.10)",
  borderRadius: "10px",
  backdropFilter: "blur(20px)",
  maxHeight: "90vh",
  overflowY: "scroll !important",
  p: 4,
  border: "0",
  borderColor: "red",
  // height:"100%"
};

export default function ModalComp({
  onClose,
  open,
  Children,
  className,
  hidden,
  hiddenMobile,
  classNameBox,
}) {
  const theme = useTheme();

  return (
    <div className="max-h-[350px] ">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`max-w-[750px] mx:max-w-[900px] 2xl:max-w-[950px] z-[9999] m-4  md:m-auto ${className}`}
      >
        <Box
          sx={style}
          className={`scroll_main px-0 md:px-4 rtl:md:!pr-8 dark:!bg-dark-primary  ${classNameBox}`}
        >
          <div
            className={`absolute ltr:!right-[20px] ltr:left-auto left-[20px] cursor-pointer top-[18px] ${
              hidden ? "md:hidden" :hiddenMobile ? "hidden" : ""
            } `}
            onClick={onClose}
          >
            <GridCloseIcon
              className=" dark:!text-white"
              style={{ color: theme.palette.primary?.main }}
            />
          </div>
          <div className="mt-10">{Children}</div>
        </Box>
      </Modal>
    </div>
  );
}
