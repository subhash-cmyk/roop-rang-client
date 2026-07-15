import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { userAuthAPI } from "../services/api";

export default function ForgotPasswordPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    if (!email) {
      toast.error("Please enter your email");
      return;
    }


    try {

      setLoading(true);


      const res = await userAuthAPI.forgotPassword({
        email,
      });


      if (res.success) {

        toast.success(
          "OTP sent to your email"
        );


        navigate(
          "/verify-reset-otp",
          {
            state: {
              email: res.email,
            },
          }
        );

      }


    } catch (error:any) {

      toast.error(
        error.response?.data?.message ||
        "Failed to send OTP"
      );

    } finally {

      setLoading(false);

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
        shadow
      ">


        <h1 className="
          text-2xl
          font-bold
          mb-3
        ">
          Forgot Password
        </h1>


        <p className="
          text-gray-600
          mb-6
        ">
          Enter your registered email.
          We will send you an OTP to reset your password.
        </p>


        <form onSubmit={handleSubmit}>


          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
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
            type="submit"
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
              ? "Sending OTP..."
              : "Send OTP"
            }

          </button>


        </form>


      </div>

    </div>

  );
}