import { Avatar, Typography } from "@mui/material";
import Image from "next/image";
import { IcDropdownPrimary, IcNotification } from "../../../../public/icons";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="px-6 py-[27px] flex justify-between text-black">
      <div className="text-[28px] font-semibold">{title}</div>
      <div className="flex">
        <div className="bg-white rounded-full shadow-md h-[40px] flex py-[10px] px-[12px] mr-4 w-[200px] justify-between">
          <div className="flex">
            <Avatar
              style={{ height: 24, width: 24, marginRight: 6 }}
              src="https://i.pravatar.cc/300"
              alt="profile"
            />
            <Typography fontSize={14}>Cat</Typography>
          </div>
          <Image
            src={IcDropdownPrimary}
            height={20}
            width={20}
            alt="dropdown"
          />
        </div>
        <div className="bg-white rounded-full shadow-md h-[40px] flex py-[10px] px-[12px] mr-4">
          <Avatar
            style={{ height: 24, width: 24, marginRight: 6 }}
            src="https://i.pravatar.cc/300"
            alt="profile"
          />
          <Typography fontSize={14}>0xabcd...1234</Typography>
        </div>
        <button className="bg-white rounded-full shadow-md h-[40px] w-[40px] items-center justify-center flex">
          <Image
            src={IcNotification}
            height={24}
            width={24}
            alt={"notification"}
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
