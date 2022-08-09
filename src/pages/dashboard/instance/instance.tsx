import { ReactNode } from "react";
import ContentLayout from "../../../layout/ContentLayout";

export default function Instance() {
  return (
    <div className="bg-white rounded-[10px] p-6 h-full">
      <h1>Instance</h1>
    </div>
  );
}

Instance.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Instance">{page}</ContentLayout>;
};
