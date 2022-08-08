import { ReactNode, useEffect } from "react";
import ContentLayout from "../../../layout/ContentLayout";

export default function Instance() {
  useEffect(() => {
    console.log("Instance");
  }, []);

  return (
    <div>
      <h1>Instance</h1>
    </div>
  );
}

Instance.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};
