const User = require("../models/User");

const getStudents = async (
  req,
  res
) => {
  try {

    const students =
      await User.find(
        { role: "student" },
        "-password -otp -otpExpires"
      );

    res.json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



const addStudent = async (req, res) => {
  const { name, status, handRaised } = req.body;

  const student = await User.create({
    name,
    status,
    handRaised,
    role: "student",
  });

  res.status(201).json(student);
};
const deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Student deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateAttendance = async (
  req,
  res
) => {
  try {
    const student =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          attendance:
            req.body.attendance,
        },
        { new: true }
      );

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStudents,
  addStudent,
  deleteStudent,
  updateAttendance,
};