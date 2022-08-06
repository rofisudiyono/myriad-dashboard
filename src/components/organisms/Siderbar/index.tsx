import { List } from "@mui/material";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Logo } from "../../../../public/icons";
import { Navigation } from "../../../navigations";
import ListSidebar from "../../atoms/ListSidebar";
import SubListSidebar from "../../atoms/SubListSidebar";
const Siderbar: NextPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [selectedListItemIndex, setSelectedListItemIndex] = useState<number>(0);
  const [selectedSubListItemIndex, setSelectedSubListItemIndex] =
    useState<number>(0);

  const handleListItemClick = (item: any, index: number) => {
    router.push(item.link);
    setOpen(selectedListItemIndex === index ? !open : true);
    setSelectedListItemIndex(index);
    setSelectedSubListItemIndex(0);
    Cookies.set("active_menu", index.toString());
    Cookies.set("active_sub_menu", "0");
  };

  const handleSubItemClick = (item: any, index: number) => {
    Cookies.set("active_sub_menu", index.toString());
    router.push(item.link);
    setSelectedSubListItemIndex(index);
  };

  useEffect(() => {
    if (!Cookies.get("active_menu")) return;
    else {
      setSelectedListItemIndex(parseInt(Cookies.get("active_menu")!));
      setSelectedSubListItemIndex(parseInt(Cookies.get("active_sub_menu")!));
    }
  });

  return (
    <>
      <div className="p-6 text-center pb-[48px]">
        <Image src={Logo} height={32} width={141} alt="logo" />
      </div>
      <List component="nav" style={{ backgroundColor: "white" }}>
        {Navigation.map((menuItem, index) => {
          return (
            <div key={index}>
              <ListSidebar
                onClick={() => handleListItemClick(menuItem, index)}
                image={menuItem.icon}
                title={menuItem.title}
                isSelected={selectedListItemIndex === index}
                isShowSubMenu={
                  menuItem.subMenu && open && selectedListItemIndex === index
                }
                isHaveSubMenu={menuItem.subMenu}
              />

              {menuItem.subMenu && selectedListItemIndex === index
                ? menuItem.subMenuItems.map((subMenuItem, index) => {
                    return (
                      <SubListSidebar
                        key={index}
                        title={subMenuItem.title}
                        inOpen={open}
                        isSelected={selectedSubListItemIndex === index}
                        onClick={() => handleSubItemClick(subMenuItem, index)}
                      />
                    );
                  })
                : null}
            </div>
          );
        })}
      </List>
    </>
  );
};

export default Siderbar;
