import { TextField, Button } from "@mui/material";
import Logo from '../assets/Images/logo.png';
import Illustration from "../assets/Images/loginillustration.png";
import { useAppDispatch } from "../hooks/useAppSelector";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {LoginSchema,loginSchemaType} from '../../libs/schemas/LoginSchema'
import { setToken } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function PinVerification() {
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();

  function Login (data:loginSchemaType) {
    debugger
    console.log(data);
    dispatch(setToken(data?.pin)); //Just put it as for dummy login we will modify it during api integration.
    Navigate("/");
  }

   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  return (
    <form onSubmit={handleSubmit(Login)} className="w-full min-h-screen bg-white flex flex-col items-center pt-12 rounded-t-[20px] px-6">
      {/* Logo and Tagline */}
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-[52px] h-[52px]" />
        <p className="text-[12px] text-[#3C9CDF] font-medium mt-1 tracking-wide">
          Save Time, Save Lives
        </p>
      </div>

      {/* Welcome Text */}
      <h1 className="text-[22px] text-[#3C9CDF] font-bold mt-6 tracking-wider">
        WELCOME
      </h1>

      {/* Pin Input Box */}
      <div className="w-full max-w-[320px] bg-[#E8F3FF] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-6 px-4 py-3">
        <TextField
          fullWidth
          {...register('pin')}
          variant="standard"
          label="Enter pin"
          InputProps={{
            disableUnderline: true,
            className: "rounded-full bg-white px-4 py-2"
          }}
          InputLabelProps={{ shrink: true, className: "text-black text-[14px]" }}
        />
      </div>

      {/* Verify Button */}
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#3C9CDF",
          borderRadius: "9999px",
          textTransform: "none",
          width: "320px",
          height: "48px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          marginTop: "24px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)"
        }}
        
      >
        VERIFY
      </Button>

      {/* Illustration */}
      <div className="mt-10 w-full flex justify-center">
        <img
          src={Illustration}
          alt="Illustration"
          className="w-[90%] max-w-[340px]"
        />
      </div>
    </form>
  );
}
