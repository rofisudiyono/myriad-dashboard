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
import { DataResponseUserReportedInterface } from "../../../interface/UserInterface";
import ContentLayout from "../../../layout/ContentLayout";
import { colors } from "../../../utils";
import { dateFormatter } from "../../../utils/dateFormatter";

export default function UserResponded() {
  const [isShowModalRespond, setIsShowModalRespond] = useState<boolean>(false);
  const [userSelected, setUserSelected] =
    useState<DataResponseUserReportedInterface>();
  const [sortingDate, setSortingDate] = useState("ASC");
  const [pageNumber, setPageNumber] = useState<number>(1);

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
      header: "Respond Date",
      cell: (value) => (
        <Typography fontSize={14}>
          {dateFormatter(new Date(value.row.original.updatedAt), "dd/MM/yy")}
        </Typography>
      ),
    },
    {
      accessorKey: "status",
      header: "Penalty Status",
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

  const handleRespond = (value: DataResponseUserReportedInterface) => {
    setUserSelected(value);
    setIsShowModalRespond(true);
  };

  const filter = JSON.stringify({
    where: { status: { inq: ["ignored", "removed"] }, referenceType: "user" },
    order: [`createdAt ${sortingDate}`],
  });

  const {
    refetch: refetchingGetAllUser,
    isFetching,
    data: dataUserResponded,
  } = useQuery(
    ["/getAllUserResponded"],
    () => getAllUser({ pageNumber, filter }),
    {
      enabled: false,
    }
  );

  const handleRestore = async () => {
    const response = await mutateDeleteUser({ reportId: userSelected?.id! });
    if (response) {
      setIsShowModalRespond(false);
      refetchingGetAllUser();
    } else {
      setIsShowModalRespond(false);
      refetchingGetAllUser();
    }
  };

  const { mutateAsync: mutateDeleteUser, isLoading } = useMutation(deleteUser);

  useEffect(() => {
    refetchingGetAllUser();
  }, [sortingDate, pageNumber]);

  return (
    <div>
      <div className="mb-[5px]">
        <Typography fontWeight={600} fontSize={18}>
          Reported User
        </Typography>
      </div>
      <Typography fontSize={14} fontWeight={400} color={"#757575"}>
        {dataUserResponded?.meta.totalItemCount ?? "0"} Reports Reports
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
        <Table
          data={dataUserResponded?.data ?? []}
          columns={columns}
          meta={dataUserResponded?.meta ?? []}
          onClickNext={() => setPageNumber(dataUserResponded?.meta.nextPage!)}
          onClickPrevios={() =>
            setPageNumber(dataUserResponded?.meta.currentPage! - 1)
          }
          isFetching={isFetching}
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

UserResponded.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="User">{page}</ContentLayout>;
};
