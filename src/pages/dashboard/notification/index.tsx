import { ReactNode, useEffect } from "react";
import ContentLayout from "../../../layout/ContentLayout";

export default function Notification() {
  useEffect(() => {
    console.log("Notification");
  }, []);

  return (
    <div>
      <h1>Notification</h1>
    </div>
  );
}

Notification.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Notification">{page}</ContentLayout>;
};
