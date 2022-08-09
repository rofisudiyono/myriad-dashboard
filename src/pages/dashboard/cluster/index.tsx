import { ReactNode } from "react";
import ContentLayout from "../../../layout/ContentLayout";

export default function Cluster() {
  return (
    <div className="bg-white rounded-[10px] p-6 h-full">
      <h1>Cluster</h1>
    </div>
  );
}

Cluster.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Cluster">{page}</ContentLayout>;
};
