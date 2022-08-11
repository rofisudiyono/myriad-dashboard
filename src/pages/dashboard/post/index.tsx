import { Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { IcOpenUrl } from "../../../../public/icons";
import { getReports } from "../../../api/GET_Reports";
import { updateReports } from "../../../api/PATCH_Reports";
import { AvatarWithName, DropdownFilter } from "../../../components/atoms";
import Button from "../../../components/atoms/Button";
import Modal from "../../../components/molecules/Modal";
import Table from "../../../components/organisms/Table";
import {
  DataResponseUserReportedInterface,
  ReportType,
  ReportTypeCategoryMapper,
} from "../../../interface/UserInterface";
import ContentLayout from "../../../layout/ContentLayout";
import { dateFormatter } from "../../../utils/dateFormatter";
import { Arrays } from "../../../constans/array";
export default function PostResported() {
  const [isShowModalRespond, setIsShowModalRespond] = useState<boolean>(false);
  const [userSelected, setUserSelected] =
    useState<DataResponseUserReportedInterface>();
  const [sortingDate, setSortingDate] = useState<string>("DESC");
  const [pageNumber, setPageNumber] = useState<number>(1);

  const translationText = (reportType: ReportType) => {
    return ReportTypeCategoryMapper[reportType];
  };

  const columns: ColumnDef<DataResponseUserReportedInterface>[] = [
    {
      accessorKey: "reportedDetail",
      header: "Post owner",
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
      size: 120,
      cell: (value) => (
        <Typography fontSize={14}>
          {dateFormatter(new Date(value.row.original.createdAt), "dd/MM/yy")}
        </Typography>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      size: 144,
      cell: (value) => (
        <Typography textTransform={"capitalize"} fontSize={14}>
          {value.row.original.type}
        </Typography>
      ),
    },
    {
      accessorKey: "totalReported",
      header: "Total reports",
      size: 144,
      cell: (value) => (
        <Typography textTransform={"capitalize"} fontSize={14}>
          {value.row.original.totalReported} reports
        </Typography>
      ),
    },
    {
      accessorKey: "type",
      header: "Category",
      cell: (value) => (
        <Typography fontSize={14}>
          {translationText(value.row.original.type as ReportType)}
        </Typography>
      ),
    },
    {
      accessorKey: "id",
      header: "Action",
      size: 144,
      cell: (value) => (
        <Button
          onClick={() => handleRespond(value.row.original)}
          label="Respond"
        />
      ),
    },
  ];

  const handleRespond = (value: DataResponseUserReportedInterface) => {
    setUserSelected(value);
    setIsShowModalRespond(true);
  };

  const filter = JSON.stringify({
    where: { status: "pending", referenceType: { inq: ["post", "comment"] } },
    order: [`createdAt ${sortingDate}`],
  });

  const {
    refetch: refetchingGetAllPost,
    isFetching,
    data: dataPostReported,
  } = useQuery(["/getAllPost"], () => getReports({ pageNumber, filter }), {
    enabled: false,
  });

  const handleIgnore = async () => {
    const status = "ignored";
    const response = await mutateUpdateUserStatus({
      status,
      reportId: userSelected?.id!,
    });
    if (response.statusCode === 401) {
      setIsShowModalRespond(false);
    } else {
      refetchingGetAllPost();
      setIsShowModalRespond(false);
    }
  };

  const handleBanned = async () => {
    const status = "removed";
    const response = await mutateUpdateUserStatus({
      status,
      reportId: userSelected?.id!,
    });
    if (response.statusCode === 401) {
      setIsShowModalRespond(false);
    } else {
      refetchingGetAllPost();
      setIsShowModalRespond(false);
    }
  };

  const { mutateAsync: mutateUpdateUserStatus, isLoading } =
    useMutation(updateReports);

  useEffect(() => {
    refetchingGetAllPost();
  }, [sortingDate, pageNumber]);

  return (
    <div className="bg-white rounded-[10px] p-6 h-full">
      <div className="mb-[5px]">
        <Typography fontWeight={600} fontSize={18}>
          Reported User
        </Typography>
      </div>
      <Typography fontSize={14} fontWeight={400} color={"#757575"}>
        {dataPostReported?.meta.totalItemCount ?? "0"} Reports
      </Typography>
      <div className="my-6">
        <DropdownFilter
          label="Report Date"
          data={Arrays.dataFilter ?? []}
          value={sortingDate}
          onChange={(event: any) => setSortingDate(event.target.value)}
        />
      </div>
      <div className="">
        <Table
          isFetching={isFetching}
          data={dataPostReported?.data ?? []}
          columns={columns}
          meta={dataPostReported?.meta ?? []}
          onClickNext={() => setPageNumber(dataPostReported?.meta.nextPage!)}
          onClickPrevios={() =>
            setPageNumber(dataPostReported?.meta.currentPage! - 1)
          }
        />
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
            <div className="flex-1 text-[14px]">
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
                    image={userSelected?.reportedDetail.user.profilePictureURL!}
                    name={item.reportedBy!}
                    desc={item.id!}
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
            <Button isFullWidth onClick={handleIgnore} label="Ignore" />
          </div>
          <div className="flex-1">
            <Button isFullWidth onClick={handleBanned} primary label="Remove" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

PostResported.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="User">{page}</ContentLayout>;
};
