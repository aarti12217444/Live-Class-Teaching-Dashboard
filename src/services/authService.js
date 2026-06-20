import axios from "axios";

const API_URL =
  "http://localhost:5000/api/auth";

export const registerUser =
  async (userData) => {
    const response =
      await axios.post(
        `${API_URL}/register`,
        userData
      );

    return response.data;
  };

export const loginUser =
  async (userData) => {
    const response =
      await axios.post(
        `${API_URL}/login`,
        userData
      );

    return response.data;
  };
  export const forgotPassword =
  async (email) => {
    const response =
      await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

    return response.data;
  };
  export const verifyOtp =
  async (email, otp) => {
    const response =
      await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );

    return response.data;
  };
  export const resetPassword =
  async (data) => {

    const response =
      await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        data
      );

    return response.data;
  };