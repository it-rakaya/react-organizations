/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GridCloseIcon } from "@mui/x-data-grid";

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
  p: 4,
};

export default function ModalComp({ onClose, open, Children, className }) {
  return (
    <div className="max-h-[350px]">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`max-w-[850px]   m-auto ${className}`}
      >
        <Box sx={style} className="">
          <div className="absolute left-[20px] cursor-pointer " onClick={onClose}><GridCloseIcon className="text-contained"/></div>
          {Children}
        </Box>
      </Modal>
    </div>
  );
}
