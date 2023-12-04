/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import Spinner from "../Spinner";

const ButtonComp = ({
  variant = "contained" || "outlined",
  children,
  className,
  disabled,
  action,
  loading,
  type = "submit",
  bordered = false,
  ...props
}) => {
  return (
    <Button
      fullWidth
      size="large"
      type={type}
      variant={variant}
      className={`!${className} ${
        variant == "contained"
          ? "!bg-contained"
          : variant == "outlined"
          ? "bg-transparent !text-contained hover:!bg-transparent"
          : ""
      } text-white  hover:!bg-contained disabled:cursor-not-allowed disabled:text-[#bcbcbc]`}
      // sx={{ mb: 7 }}
      disabled={disabled}
      onClick={action}
    >
      {loading ? <Spinner /> : children}
    </Button>
  );
};
export default ButtonComp;
