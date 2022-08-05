import Button from "@mui/material/Button";

interface ButtonOutlineInterface {
  onClick: () => void;
  title: string;
}

const ButtonOutline = (props: ButtonOutlineInterface) => {
  const { onClick, title } = props;
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      style={{
        borderRadius: 20,
        color: "black",
        borderColor: "#FFD24D",
        textTransform: "capitalize",
      }}
    >
      {title}
    </Button>
  );
};

export default ButtonOutline;
