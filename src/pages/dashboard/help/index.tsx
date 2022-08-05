import { ReactNode, useEffect } from "react";
import ContentLayout from "../../../layout/ContentLayout";

export default function Help() {
  useEffect(() => {
    console.log("help");
  });
  return (
    <div>
      <h1>Help</h1>
    </div>
  );
}

Help.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Help">{page}</ContentLayout>;
};
