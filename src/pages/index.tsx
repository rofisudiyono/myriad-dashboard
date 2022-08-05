import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  return (
    <div className="bg-slate-50 h-screen w-full items-center justify-center flex">
      <div className="shadow-md bg-white p-6 rounded-lg w-[400px]">
        <div className="flex justify-center">
          <Typography style={{ fontSize: 20 }}>
            Welcome to Myriad Admin
          </Typography>
        </div>
        <div className="py-4">
          <TextField type={"email"} label="Email" fullWidth size="small" />
        </div>
        <div className="pb-4">
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            size="small"
          />
        </div>
        <Button
          style={{ backgroundColor: "black" }}
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => router.push("/dashboard")}
        >
          Sign In
        </Button>
        {/* <LoadingButton loading variant="contained">
          Submit
        </LoadingButton> */}
      </div>
    </div>
  );
}
