import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { forgotPassword }
  from "../services/authService";

function ForgotPassword() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await forgotPassword(
          email
        );

        localStorage.setItem(
          "resetEmail",
          email
        );

        alert(
          "OTP Sent Successfully"
        );

        navigate(
          "/verify-otp"
        );

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
            "Failed to send OTP"
        );
      }
    };

  return (
    <div>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <button
          type="submit"
        >
          Send OTP
        </button>

      </form>

    </div>
  );
}

export default ForgotPassword;