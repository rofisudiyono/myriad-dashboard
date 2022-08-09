import { ReactNode, useEffect } from "react";
import { getHealtcheck } from "../../api/GET_Healtcheck";
import ContentLayout from "../../layout/ContentLayout";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
Dashboard.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Dashboard">{page}</ContentLayout>;
};
