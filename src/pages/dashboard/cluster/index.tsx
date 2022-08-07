import { ReactNode, useEffect } from "react";
import ContentLayout from "../../../layout/ContentLayout";

export default function Cluster() {
  useEffect(() => {
    console.log("cluster");
  });

  return (
    <div>
      <h1>Cluster</h1>
    </div>
  );
}

Cluster.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Cluster">{page}</ContentLayout>;
};