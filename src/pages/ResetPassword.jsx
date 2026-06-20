import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";

import {
  resetPassword,
} from "../services/authService";

function ResetPassword() {
  const navigate =
  useNavigate();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [formData, setFormData] =
    useState({
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {

      const email =
        localStorage.getItem(
          "resetEmail"
        );

      await resetPassword({
        email,
        newPassword:
          formData.password,
      });

      alert(
        "Password Reset Successfully"
      );

      localStorage.removeItem(
        "resetEmail"
      );

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
          "Reset Failed"
      );
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a strong new password"
    >

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
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

              <Lock
                size={34}
                className="text-green-600"
              />

            </div>

          </div>

          <p className="text-slate-500">
            Your new password must be
            different from previous
            passwords.
          </p>

        </div>

        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="New Password"
            value={
              formData.password
            }
            onChange={handleChange}
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-600
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-4
              top-4
            "
          >
            {showPassword
              ? <EyeOff size={20}/>
              : <Eye size={20}/>}
          </button>

        </div>

        <div className="relative">

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            placeholder="Confirm Password"
            value={
              formData.confirmPassword
            }
            onChange={handleChange}
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-600
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="
              absolute
              right-4
              top-4
            "
          >
            {showConfirmPassword
              ? <EyeOff size={20}/>
              : <Eye size={20}/>}
          </button>

        </div>

        <div className="bg-slate-100 p-4 rounded-xl text-sm text-slate-600">

          Password should contain:

          <ul className="mt-2 space-y-1">
            <li>
              ✓ Minimum 8 characters
            </li>
            <li>
              ✓ One uppercase letter
            </li>
            <li>
              ✓ One number
            </li>
            <li>
              ✓ One special character
            </li>
          </ul>

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
          Reset Password
        </button>

      </motion.form>

    </AuthLayout>
  );
}

export default ResetPassword;