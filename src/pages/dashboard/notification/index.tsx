import {CircularProgress, Typography} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {ReactNode, useEffect, useState} from 'react';
import {getNotifications} from '../../../api/GET_Notifications';
import {DropdownFilter, ListAllNotifications} from '../../../components/atoms';
import {Arrays} from '../../../constans/array';
import {
  MetaNotificationInterface,
  NotificationDataInterface,
} from '../../../interface/NotificationsInterface';
import ContentLayout from '../../../layout/ContentLayout';
import {colors} from '../../../utils';
import {dateFormatter} from '../../../utils/dateFormatter';

type FilterType = 'report_post' | 'report_user' | 'report_comment' | 'all';
export default function Notification() {
  const [dataNotification, setDataNotification] = useState<Array<NotificationDataInterface>>([]);
  const [metaNotification, setMetaNotification] = useState<MetaNotificationInterface>();
  const [filterReport, setFilterReport] = useState<FilterType>('all');

  const filter = {
    where: {
      type: {
        inq:
          filterReport === 'all'
            ? ['report_post', 'report_user', 'report_comment']
            : [filterReport],
      },
    },
  };

  const {refetch: refetchingGetNotification, isFetching} = useQuery(
    ['/getNotification'],
    () => getNotifications(filter),
    {
      enabled: false,
      onSuccess: data => {
        setDataNotification(data?.data);
        setMetaNotification(data?.meta);
      },
    },
  );

  useEffect(() => {
    refetchingGetNotification();
  }, [filterReport, refetchingGetNotification]);

  return (
    <div className="flex">
      <div className="bg-white flex-1 mr-6 p-6 rounded-[10px] min-h-[480px]">
        <div className="mb-[5px]">
          <Typography fontWeight={600} fontSize={18}>
            All notifications
          </Typography>
        </div>
        <Typography fontSize={14} fontWeight={400} color={'#757575'}>
          {metaNotification?.totalItemCount} notifications
        </Typography>
        <div className="my-6">
          <DropdownFilter
            label="Filter"
            data={Arrays.notificationFilter ?? []}
            value={filterReport}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setFilterReport(event.target.value as FilterType)
            }
          />
        </div>
        {!isFetching && dataNotification.toString().length === 0 && (
          <div className="h-[300px] w-full flex items-center justify-center">
            <div>
              <Typography style={{fontSize: 18, fontWeight: 600, textAlign: 'center'}}>
                You have no notification
              </Typography>
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.textGray,
                  textAlign: 'center',
                }}>
                Notifications will be shown here. You can change the type of notification that
                appears in Settings.
              </Typography>
            </div>
          </div>
        )}

        {isFetching ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          dataNotification.map((item, index) => {
            return (
              <ListAllNotifications
                key={index}
                label={item.message}
                desc={item.type}
                time={dateFormatter(new Date(item.updatedAt), 'dd MMMM yyyy')}
              />
            );
          })
        )}
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
