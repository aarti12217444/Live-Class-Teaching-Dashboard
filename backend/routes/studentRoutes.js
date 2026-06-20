const express = require("express");
const router = express.Router();

const {
  getStudents,
  addStudent,
  deleteStudent,
  updateAttendance,
} = require("../controllers/studentController");

router.get("/", getStudents);
router.post("/", addStudent);
router.delete("/:id", deleteStudent);
router.put(
  "/attendance/:id",
  updateAttendance
);

module.exports = router;