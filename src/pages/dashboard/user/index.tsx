import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { IcOpenUrl } from "../../../../public/icons";
import { getAllUser, updateUserStatus } from "../../../api/users";
import { AvatarWithName, DropdownFilter } from "../../../components/atoms";
import ButtonOutline from "../../../components/atoms/Button";
import Modal from "../../../components/molecules/Modal";
import Table from "../../../components/organisms/Table";
import {
  DataResponseUserReportedInterface,
  ReportType,
  ReportTypeCategoryMapper,
  ResponseUserReported,
} from "../../../interface/UserInterface";
import ContentLayout from "../../../layout/ContentLayout";
import { colors } from "../../../utils";

export default function UserReported() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowModalRespond, setIsShowModalRespond] = useState<boolean>(false);
  const [dataUserReported, setDataUserReported] =
    useState<ResponseUserReported>();
  const [userSelected, setUserSelected] =
    useState<DataResponseUserReportedInterface>();
  const [sortingDate, setSortingDate] = useState("ASC");

  const translationText = (reportType: ReportType) => {
    return ReportTypeCategoryMapper[reportType];
  };

  const columns: ColumnDef<DataResponseUserReportedInterface>[] = [
    {
      accessorKey: "reportedDetail",
      header: "Reported user",
      cell: (value) => (
        <AvatarWithName
          image={value.row.original.reportedDetail.user.profilePictureURL}
          name={value.row.original.reportedDetail.user.name}
          desc={value.row.original.reportedDetail.user.username}
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Report Date",
    },
    {
      accessorKey: "totalReported",
      header: "Total reports",
    },
    {
      accessorKey: "type",
      header: "Description",
      cell: (value) => (
        <Typography>
          {translationText(value.row.original.type as ReportType)}
        </Typography>
      ),
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: (value) => (
        <ButtonOutline
          onClick={() => handleRespond(value.row.original)}
          title="Respond"
        />
      ),
    },
  ];

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
  const pageNumber = 1;

  const handleRespond = (value: DataResponseUserReportedInterface) => {
    setUserSelected(value);
    setIsShowModalRespond(true);
  };

  const handleIgnore = async () => {
    const status = "ignored";
    const response = await updateUserStatus({
      status,
      reportId: userSelected?.id!,
    });
    if (response.statusCode === 401) {
      setIsShowModalRespond(false);
    } else {
      getAllData();
      setIsShowModalRespond(false);
    }
  };

  const handleBanned = async () => {
    const status = "removed";
    const response = await updateUserStatus({
      status,
      reportId: userSelected?.id!,
    });
    if (response.statusCode === 401) {
      setIsShowModalRespond(false);
    } else {
      getAllData();
      setIsShowModalRespond(false);
    }
  };

  const getAllData = async () => {
    const filter = JSON.stringify({
      where: { status: "pending", referenceType: "user" },
      order: [`createdAt ${sortingDate}`],
    });
    setIsLoading(true);
    const response = await getAllUser({ pageNumber, filter });
    setIsLoading(false);
    if (response) {
      setDataUserReported(response);
    }
  };

  useEffect(() => {
    getAllData();
  }, [sortingDate]);

  return (
    <div>
      <div className="mb-[5px]">
        <Typography fontWeight={600} fontSize={18}>
          Reported User
        </Typography>
      </div>
      <Typography fontSize={14} fontWeight={400} color={"#757575"}>
        {dataUserReported?.meta.totalItemCount ?? "0"} Reports
      </Typography>
      <div className="my-6">
        <DropdownFilter
          label="Report Date"
          data={dataFilter ?? []}
          value={sortingDate}
          onChange={(event: any) => setSortingDate(event.target.value)}
        />
      </div>
      <div className="">
        <Table data={dataUserReported?.data ?? []} columns={columns} />
      </div>
      <Modal
        open={isShowModalRespond}
        onClose={() => setIsShowModalRespond(false)}
        title={"Respond"}
      >
        <div className="mt-[20px]">
          <Typography fontSize={14}>Reported user</Typography>
          <div className="mt-[12px]">
            <AvatarWithName
              image={userSelected?.reportedDetail.user.profilePictureURL!}
              name={userSelected?.reportedDetail.user.name!}
              desc={userSelected?.reportedDetail.user.username!}
            />
          </div>
        </div>
        <div className="mt-[28px] mb-[20px]">
          <Typography fontSize={14}>Detail</Typography>
          <div className="flex items-center justify-center">
            <div className="w-[120px] text-[14px] text-gray-500">URL</div>
            <div className="flex-1 text-[14px] pr-2">
              {`https://app.myriad.social/post/${userSelected?.id}`}
            </div>
            <a
              href={`https://app.myriad.social/post/${userSelected?.id}`}
              target="_blank"
            >
              <button className="w-[20px]">
                <Image src={IcOpenUrl} height={20} width={20} alt="" />
              </button>
            </a>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-[120px] text-[14px] text-gray-500">
              Total reports
            </div>
            <div className="flex-1 text-[14px]">
              {userSelected?.totalReported} report
            </div>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <Typography fontSize={14}>Reporter</Typography>
          </div>
          {userSelected?.reporters.map((item) => {
            return (
              <div className="mb-[24px]">
                <div className="flex justify-between">
                  <AvatarWithName
                    image={
                      userSelected?.reportedDetail.user
                        .profilePictureURL as string
                    }
                    name={item.reportedBy as string}
                    desc={item.id as string}
                  />
                  <Typography fontSize={12} color={"#616161"}>
                    16/07/22
                  </Typography>
                </div>
                <Typography
                  fontSize={14}
                  color={"#0A0A0A"}
                  style={{ marginLeft: 48, marginTop: 1 }}
                >
                  {item.description}
                </Typography>
              </div>
            );
          })}
        </div>
        <div className="flex mt-[28px]">
          <div className="flex-1 mr-3">
            <Button
              fullWidth
              onClick={() => handleIgnore()}
              variant="outlined"
              style={{
                borderRadius: 20,
                color: "black",
                borderColor: "#FFD24D",
                textTransform: "capitalize",
              }}
            >
              Ignore
            </Button>
          </div>
          <div className="flex-1">
            <Button
              onClick={() => handleBanned()}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 20,
                color: "white",
                textTransform: "capitalize",
              }}
              fullWidth
            >
              Banned
            </Button>
          </div>
        </div>
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

UserReported.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="User">{page}</ContentLayout>;
};
