import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    Cookies.set(
      "token_api",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTU0NTExZTVkZTJkOGE4MTdkYzI2NyIsIm5hbWUiOiJNeXJpYWQgT2ZmaWNpYWwiLCJ1c2VybmFtZSI6Im15cmlhZF9vZmZpY2lhbCIsImNyZWF0ZWRBdCI6IjIwMjEtMTItMThUMjA6NDQ6MDQuMzI3WiIsInBlcm1pc3Npb25zIjpbIm1hc3RlciIsImFkbWluIiwidXNlciJdfQ.aULgzqVA6JMN5nefEftRSWua-qupVlArbBTM0a5TeAY"
    );
    router.push("/dashboard");
    Cookies.set("active_menu", "0");
    Cookies.set("active_sub_menu", "0");
  };

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
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
