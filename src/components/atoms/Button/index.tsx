import { Button as ButtonMui } from "@mui/material";
import { colors } from "../../../utils";

interface ButtonOutlineInterface {
  primary?: boolean;
  onClick: () => void;
  label: string;
  isFullWidth?: boolean;
  disable?: boolean;
}

const Button = ({
  label,
  primary,
  onClick,
  isFullWidth,
  disable,
  ...props
}: ButtonOutlineInterface) => {
  if (primary) {
    return (
      <ButtonMui
        onClick={onClick}
        style={{
          backgroundColor: colors.primary,
          borderRadius: 20,
          color: "white",
          textTransform: "capitalize",
        }}
        fullWidth={isFullWidth}
        {...props}
      >
        Remove
      </ButtonMui>
    );
  }
  return (
    <ButtonMui
      onClick={onClick}
      variant="outlined"
      style={{
        backgroundColor: disable ? "#EDEDED" : "white",
        borderRadius: 20,
        color: disable ? "#C2C2C2" : "black",
        borderColor: disable ? "#C2C2C2" : "#FFD24D",
        textTransform: "capitalize",
      }}
      fullWidth={isFullWidth}
      {...props}
    >
      {label}
    </ButtonMui>
  );
};

export default Button;
