import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

import { registerUser } from "../services/authService";

function Register() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
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
        await registerUser({
          fullName:
            formData.fullName,
          email:
            formData.email,
          password:
            formData.password,
          role: formData.role,
        });

        alert(
          "Registration Successful"
        );

        navigate("/");

      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Registration Failed"
        );
      }
    };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Vedic Classes"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={
            formData.fullName
          }
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={
            formData.confirmPassword
          }
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        >
          <option value="student">
            Student
          </option>

          <option value="teacher">
            Teacher
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Register
        </button>

        <p className="text-center">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>

        </p>

      </form>

    </AuthLayout>
  );
}

export default Register;