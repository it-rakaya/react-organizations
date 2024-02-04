/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import Spinner from "../Spinner";
import { useTheme } from "@mui/material/styles";
import { hexToRGBA } from "../../../utils/helpers";

const ButtonComp = ({
  variant = "contained" || "outline",
  children,
  className,
  disabled,
  action,
  loading,
  type = "submit",
  bordered = false,
  style,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Button
      fullWidth
      size="large"
      type={type}
      style={{
        backgroundColor:
          variant == "contained"
            ? disabled
              ? hexToRGBA(theme?.palette?.primary?.main, 0.3)
              : theme?.palette?.primary?.main
            : "transparent",
        color: variant == "outline" ? theme?.palette?.primary?.main : "white",
        borderColor: disabled
          ? hexToRGBA(theme?.palette?.primary?.main, 0.2)
          : theme?.palette?.primary?.main,
        borderStyle: variant == "outline" ? "solid" : "",

        opacity: disabled ? "1" : "1",
      }}
      variant={variant}
      className={`${className}  ${
        variant == "outline" && " dark:!text-white"
      } border    hover:!bg-${theme?.palette?.primary?.main}
       disabled:!cursor-not-allowed disabled:text-[${
         theme?.palette?.primary?.main
       }] ltr:mt-5 mt-5 `}
      // sx={{ mb: 7 }}
      disabled={disabled}
      onClick={action}
    >
      {loading ? <Spinner /> : children}
    </Button>
  );
};
export default ButtonComp;
