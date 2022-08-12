import {ReactNode, useEffect} from 'react';
import {getNotifications} from '../../api/GET_Notifications';
import ContentLayout from '../../layout/ContentLayout';

export default function Dashboard() {
  const callDataNotifications = async () => {
    const response = await getNotifications({pageNumber: 1, pageLimit: 10, filter: ''});
    console.log('response notifications', response);
  };

  useEffect(() => {
    callDataNotifications;
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
Dashboard.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Dashboard">{page}</ContentLayout>;
};
