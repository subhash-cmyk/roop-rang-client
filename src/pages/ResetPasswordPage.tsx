import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { userAuthAPI } from "../services/api";

export default function ResetPasswordPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);



  const handleReset = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    if (!password || !confirmPassword) {
      toast.error(
        "Please enter password"
      );
      return;
    }


    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }


    if (password.length < 6) {
      toast.error(
        "Password must be minimum 6 characters"
      );
      return;
    }


    try {

      setLoading(true);


      const res =
        await userAuthAPI.resetPassword({
          email,
          password,
        });


      if(res.success){

        toast.success(
          "Password reset successfully"
        );


        navigate("/login");

      }


    } catch(error:any){

      toast.error(
        error.response?.data?.message ||
        "Password reset failed"
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
      ">


        <h2 className="
          text-2xl
          font-bold
          mb-5
        ">
          Reset Password
        </h2>


        <form onSubmit={handleReset}>


          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
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


          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>
              setConfirmPassword(e.target.value)
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
            ? "Updating..."
            : "Reset Password"
          }

          </button>


        </form>


      </div>

    </div>

  );
}