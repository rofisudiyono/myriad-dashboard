import { Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import {
  NotificationJoinInstance,
  NotificationsDeployNode,
  NotificationsReportPost,
  NotificationsReportUser,
} from "../../../../public/icons";
import {
  DropdownFilter,
  ListAllNotifications,
} from "../../../components/atoms";
import ContentLayout from "../../../layout/ContentLayout";

export default function Notification() {
  const [sortingDate, setSortingDate] = useState<string>("DESC");
  const dataFilter = [
    {
      value: "DESC",
      title: "Newest",
    },
    {
      value: "ASC",
      title: "Olders",
    },
  ];

  return (
    <div className="flex">
      <div className="bg-white flex-1 mr-6 p-6 rounded-[10px] min-h-[480px]">
        <div className="mb-[5px]">
          <Typography fontWeight={600} fontSize={18}>
            All notifications
          </Typography>
        </div>
        <Typography fontSize={14} fontWeight={400} color={"#757575"}>
          0 notifications
        </Typography>
        <div className="my-6">
          <DropdownFilter
            label="Filter All"
            data={dataFilter ?? []}
            value={sortingDate}
            onChange={(event: any) => setSortingDate(event.target.value)}
          />
        </div>
        <ListAllNotifications
          image={NotificationsReportUser}
          label={"Diana Ukrainsky was reported by Heizel Brown"}
          desc={"User report"}
          time={"Now"}
        />
        <ListAllNotifications
          image={NotificationsReportPost}
          label={"Diana Ukrainsky’s post was reported by Heizel Brown"}
          desc={"Post report"}
          time={"Now"}
        />
        <ListAllNotifications
          image={NotificationJoinInstance}
          label={"Nicholas Saputra join Art Space Instance"}
          desc={"Join instance"}
          time={"Now"}
        />
        <ListAllNotifications
          image={NotificationsDeployNode}
          label={"0xabcd...1234 deploy a node"}
          desc={"Deploy a node"}
          time={"Now"}
        />
      </div>
      <div className="bg-white w-[314px] rounded-[10px] p-6 h-fit">
        <Typography fontSize={14} fontWeight={600}>
          Detail
        </Typography>
        <div className="flex">
          <div className="flex-1 py-2">
            <Typography fontSize={14} fontWeight={400}>
              Post report
            </Typography>
          </div>
          <Typography fontSize={14} fontWeight={400}>
            0
          </Typography>
        </div>
        <div className="flex">
          <div className="flex-1 py-2">
            <Typography fontSize={14} fontWeight={400}>
              User report
            </Typography>
          </div>
          <Typography fontSize={14} fontWeight={400}>
            0
          </Typography>
        </div>
        <div className="flex">
          <div className="flex-1 py-2">
            <Typography fontSize={14} fontWeight={400}>
              New user
            </Typography>
          </div>
          <Typography fontSize={14} fontWeight={400}>
            0
          </Typography>
        </div>
        <div className="flex">
          <div className="flex-1 py-2">
            <Typography fontSize={14} fontWeight={400}>
              New node
            </Typography>
          </div>
          <Typography fontSize={14} fontWeight={400}>
            0
          </Typography>
        </div>
      </div>
    </div>
  );
}

Notification.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Notification">{page}</ContentLayout>;
};
