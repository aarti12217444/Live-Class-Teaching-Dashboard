import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import AuthLayout from "../components/AuthLayout";

import {
  loginUser,
} from "../services/authService";

function Login() {

  const navigate =
  useNavigate();

const [showPassword, setShowPassword] =
  useState(false);

const [formData, setFormData] =
  useState({
    email: "",
    password: "",
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

    try {
      const data =
        await loginUser(
          formData
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        data.role
      );

      localStorage.setItem(
        "fullName",
        data.fullName
      );

      if (
        data.role ===
        "teacher"
      ) {
        navigate("/teacher");
      } else {
        navigate("/student");
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your learning journey"
    >

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block mb-2 text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Password
          </label>

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={
                formData.password
              }
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>
        </div>

        <div className="flex justify-between items-center">

          <label className="flex items-center gap-2 text-sm">

            <input type="checkbox" />

            Remember Me

          </label>

          <Link
            to="/forgot-password"
            className="text-blue-600 text-sm"
          >
            Forgot Password?
          </Link>

        </div>

        <button
          type="submit"
          className="
            w-full
            bg-gradient-to-r
            from-blue-700
            to-blue-500
            hover:scale-109
            transition
            duration-300
            "
        >
          Login
        </button>

        <p className="text-center text-sm">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>

        </p>

      </form>

    </AuthLayout>
  );
}

export default Login;