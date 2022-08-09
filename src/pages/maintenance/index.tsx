import { useEffect } from "react";
import Button from "../../components/atoms/Button";
import { useRouter } from "next/router";
export default function Maintenance() {
  const router = useRouter();
  useEffect(() => {
    console.log("Maintenance");
  });

  return (
    <div className="h-screen w-full items-center justify-center flex">
      <div>
        <div className="">
          <h1 className="text-3xl mb-5 text-center">I'm Sorry,.</h1>
          <h1 className="text-2xl mb-5">Website Under maintenance</h1>
        </div>
        <Button
          isFullWidth
          primary
          label="Back to Home"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
}
