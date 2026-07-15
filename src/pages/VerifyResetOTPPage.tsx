import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { userAuthAPI } from "../services/api";

export default function VerifyResetOTPPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;


  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);


  const handleVerify = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    if (!otp || otp.length !== 6) {
      toast.error(
        "Please enter valid 6 digit OTP"
      );
      return;
    }


    try {

      setLoading(true);


      const res = await userAuthAPI.verifyResetOTP({
        email,
        otp,
      });


      if (res.success) {

        toast.success(
          "OTP verified successfully"
        );


        navigate(
          "/reset-password",
          {
            state: {
              email,
            },
          }
        );

      }


    } catch(error:any){

      toast.error(
        error.response?.data?.message ||
        "Invalid OTP"
      );

    } finally {

      setLoading(false);

    }

  };


  const handleResendOTP = async () => {

    try {

      const res =
        await userAuthAPI.forgotPassword({
          email,
        });


      if(res.success){

        toast.success(
          "OTP sent again"
        );

      }


    } catch(error:any){

      toast.error(
        "Failed to resend OTP"
      );

    }

  };


  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-50
      px-4
    ">

      <div className="
        w-full
        max-w-md
        bg-white
        border
        rounded-xl
        p-6
      ">


        <h2 className="
          text-2xl
          font-bold
          mb-3
        ">
          Verify OTP
        </h2>


        <p className="
          text-gray-600
          mb-5
        ">
          Enter OTP sent to {email}
        </p>


        <form onSubmit={handleVerify}>


          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e)=>{

              const value =
                e.target.value.replace(/\D/g,"");

              setOtp(value);

            }}
            placeholder="Enter 6 digit OTP"
            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
              mb-4
            "
          />


          <button
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              py-3
              rounded-lg
            "
          >

          {
            loading
            ? "Verifying..."
            : "Verify OTP"
          }

          </button>


        </form>


        <button
          onClick={handleResendOTP}
          className="
            w-full
            mt-3
            border
            py-3
            rounded-lg
          "
        >
          Resend OTP
        </button>


      </div>

    </div>

  );
}