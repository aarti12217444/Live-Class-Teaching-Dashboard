import axios from "axios";

const API_URL =
  "http://localhost:5000/api/students";

export const getStudents = async () => {
  const response =
    await axios.get(API_URL);

  return response.data;
};

export const addStudent = async (
  studentData
) => {
  const response = await axios.post(
    "http://localhost:5000/api/students",
    studentData
  );

  return response.data;
};
export const deleteStudent = async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/students/${id}`
  );

  return response.data;
};
export const updateAttendance =
  async (id, attendance) => {
    const response =
      await axios.put(
        `http://localhost:5000/api/students/attendance/${id}`,
        { attendance }
      );

    return response.data;
  };