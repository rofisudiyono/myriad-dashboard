import { ReactNode, useEffect } from "react";
import ContentLayout from "../../layout/ContentLayout";

export default function Dashboard() {
  useEffect(() => {
    console.log("Dashboard");
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
