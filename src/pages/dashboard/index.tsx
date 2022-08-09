import { ReactNode, useEffect } from "react";
import { getHealtcheck } from "../../api/GET_Healtcheck";
import ContentLayout from "../../layout/ContentLayout";

export default function Dashboard({ res }) {
  console.log(res);
  // useEffect(() => {
  //   checkHealt();
  // }, []);
  // const checkHealt = async () => {
  //   const available = await getHealtcheck();
  //   console.log(available);
  // };
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
Dashboard.getLayout = function getLayout(page: ReactNode) {
  return <ContentLayout title="Dashboard">{page}</ContentLayout>;
};

export async function getStaticProps() {
  const res = await getHealtcheck();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      res,
    },
  };
}
