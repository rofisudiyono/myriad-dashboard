import { Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { IcOpenUrl } from "../../../../public/icons";
import { deleteUser, getAllUser } from "../../../api/users";
import { AvatarWithName, DropdownFilter } from "../../../components/atoms";
import Modal from "../../../components/molecules/Modal";
import Table from "../../../components/organisms/Table";
import {
  DataResponseUserReportedInterface,
  ReportType,
  ReportTypeCategoryMapper,
} from "../../../interface/UserInterface";
import ContentLayout from "../../../layout/ContentLayout";
import { colors } from "../../../utils";
import { dateFormatter } from "../../../utils/dateFormatter";

export default function PostResponded() {
  const [isShowModalRespond, setIsShowModalRespond] = useState<boolean>(false);
  const [userSelected, setUserSelected] =
    useState<DataResponseUserReportedInterface>();
  const [sortingDate, setSortingDate] = useState("DESC");
  const [sortingPostStatus, setSortingPostStatus] = useState("all");
  const [sortingPostType, setSortingPostType] = useState("all");
  const [pageNumber, setPageNumber] = useState(1);

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
      cell: (value) => (
        <Typography fontSize={14}>
          {dateFormatter(new Date(value.row.original.createdAt), "dd/MM/yy")}
        </Typography>
      ),
    },

    {
      accessorKey: "updatedAt",
      header: "Respond date",
      cell: (value) => (
        <Typography fontSize={14}>
          {dateFormatter(new Date(value.row.original.updatedAt), "dd/MM/yy")}
        </Typography>
      ),
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
        <Button
          disabled={value.row.original.status === "ignored"}
          onClick={() => handleRespond(value.row.original)}
          variant="outlined"
          style={{
            backgroundColor:
              value.row.original.status === "ignored" ? "#EDEDED" : "white",
            borderRadius: 20,
            color:
              value.row.original.status === "ignored" ? "#C2C2C2" : "black",
            borderColor:
              value.row.original.status === "ignored" ? "#C2C2C2" : "#FFD24D",
            textTransform: "capitalize",
          }}
        >
          Respond
        </Button>
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
  const dataFilterStatus = [
    {
      value: "all",
      title: "ALL",
    },
    {
      value: "remove",
      title: "Remove",
    },
    {
      value: "ignore",
      title: "Ignore",
    },
  ];
  const dataFilterType = [
    {
      value: "all",
      title: "ALL",
    },
    {
      value: "post",
      title: "Post",
    },
    {
      value: "comment",
      title: "Comment",
    },
  ];

  const handleRespond = (value: DataResponseUserReportedInterface) => {
    setUserSelected(value);
    setIsShowModalRespond(true);
  };

  const filter = JSON.stringify({
    where: {
      status:
        sortingPostStatus === "all"
          ? { inq: ["ignored", "removed"] }
          : sortingPostStatus === "ignored"
          ? "ignored"
          : "removed",
      referenceType:
        sortingPostType === "all"
          ? { inq: ["post", "comment"] }
          : sortingPostType === "comment"
          ? "comment"
          : "post",
    },
    order: [`updatedAt ${sortingDate}`],
  });

  const {
    refetch: refetchingGetAllResponded,
    isFetching,
    data: dataPostResponded,
  } = useQuery(
    ["/getAllPostResponded"],
    () => getAllUser({ pageNumber, filter }),
    {
      enabled: false,
    }
  );

  const handleRestore = async () => {
    const response = await mutateDeleteUser({ reportId: userSelected?.id! });
    if (response) {
      setIsShowModalRespond(false);
      refetchingGetAllResponded();
    } else {
      setIsShowModalRespond(false);
      refetchingGetAllResponded();
    }
  };

  const { mutateAsync: mutateDeleteUser, isLoading } = useMutation(deleteUser);

  useEffect(() => {
    refetchingGetAllResponded();
  }, [sortingDate, sortingPostType, sortingPostStatus, pageNumber]);

  return (
    <div>
      <div className="mb-[5px]">
        <Typography fontWeight={600} fontSize={18}>
          Responded User
        </Typography>
      </div>
      <Typography fontSize={14} fontWeight={400} color={"#757575"}>
        {dataPostResponded?.meta.totalItemCount ?? "0"} Reports Reports
      </Typography>
      <div className="my-6 flex">
        <div className="pr-4">
          <DropdownFilter
            label="Report date"
            data={dataFilter ?? []}
            value={sortingDate}
            onChange={(event: any) => setSortingDate(event.target.value)}
          />
        </div>
        <DropdownFilter
          label="Post status"
          data={dataFilterStatus ?? []}
          value={sortingPostStatus}
          onChange={(event: any) => setSortingPostStatus(event.target.value)}
        />
        <div className="px-4">
          <DropdownFilter
            label="Type"
            data={dataFilterType ?? []}
            value={sortingPostType}
            onChange={(event: any) => setSortingPostType(event.target.value)}
          />
        </div>
      </div>
      <div className="">
        <Table
          isFetching={isFetching}
          data={dataPostResponded?.data ?? []}
          columns={columns}
          meta={dataPostResponded?.meta ?? []}
          onClickNext={() => setPageNumber(dataPostResponded?.meta.nextPage!)}
          onClickPrevios={() =>
            setPageNumber(dataPostResponded?.meta.currentPage! - 1)
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
              onClick={() => setIsShowModalRespond(false)}
              variant="outlined"
              style={{
                borderRadius: 20,
                color: "black",
                borderColor: "#FFD24D",
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
          </div>
          <div className="flex-1">
            <Button
              onClick={handleRestore}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 20,
                color: "white",
                textTransform: "capitalize",
              }}
              fullWidth
            >
              Restore
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

PostResponded.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="User">{page}</ContentLayout>;
};
