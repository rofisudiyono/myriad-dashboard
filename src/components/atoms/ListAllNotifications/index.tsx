import { ListItemButton, Typography } from "@mui/material";
import Image from "next/image";
import { colors } from "../../../utils";

interface ListAllNotificationsInterface {
  image: string;
  label: string;
  desc: string;
  time: string;
}
const ListAllNotifications = (props: ListAllNotificationsInterface) => {
  const { image, label, desc, time } = props;

  return (
    <ListItemButton
      style={{ justifyContent: "space-between" }}
      onClick={() => undefined}
    >
      <div className="flex">
        <Image src={image} height={48} width={48} alt="dasboard" />
        <div className="flex-1 ml-2">
          <Typography
            style={{ fontSize: 14, color: colors.black, fontWeight: 400 }}
          >
            {label}
          </Typography>
          <Typography style={{ fontSize: 14, color: colors.textGray }}>
            {desc}
          </Typography>
        </div>
      </div>
      <Typography style={{ fontSize: 12, color: colors.textGray }}>
        {time}
      </Typography>
    </ListItemButton>
  );
};

export default ListAllNotifications;
