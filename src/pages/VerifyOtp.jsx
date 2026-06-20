import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import AuthLayout from "../components/AuthLayout";

function VerifyOtp() {

  const navigate =
    useNavigate();

  const [otp, setOtp] =
    useState([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

  const handleChange = (
    value,
    index
  ) => {

    if (!/^\d*$/.test(value))
      return;

    const newOtp = [...otp];

    newOtp[index] =
      value;

    setOtp(newOtp);

    if (
      value &&
      index < 5
    ) {
      document
        .getElementById(
          `otp-${index + 1}`
        )
        ?.focus();
    }
  };

  const handleVerify =
    async (e) => {

      e.preventDefault();

      const finalOtp =
        otp.join("");

      console.log(
        finalOtp
      );

      // Verify API call yahan lagegi

      navigate(
        "/reset-password"
      );
    };

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the verification code"
    >

      <motion.form
        onSubmit={
          handleVerify
        }
        className="space-y-6"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <div className="text-center">

          <div className="flex justify-center mb-4">

            <div className="bg-green-100 p-4 rounded-full">

              <ShieldCheck
                size={34}
                className="text-green-600"
              />

            </div>

          </div>

          <p className="text-slate-500">
            Enter the 6-digit code
            sent to your email.
          </p>

        </div>

        <div className="flex justify-center gap-3">

          {otp.map(
            (
              digit,
              index
            ) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(
                    e.target
                      .value,
                    index
                  )
                }
                className="
                  w-12
                  h-14
                  text-center
                  text-xl
                  font-bold
                  border
                  border-slate-300
                  rounded-xl
                  focus:border-blue-600
                  outline-none
                "
              />
            )
          )}

        </div>

        <button
          type="submit"
          className="
            w-full
            bg-gradient-to-r
            from-green-600
            to-green-500
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:scale-105
            transition
          "
        >
          Verify OTP
        </button>

      </motion.form>

    </AuthLayout>
  );
}

export default VerifyOtp;