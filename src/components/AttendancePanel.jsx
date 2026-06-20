import { useEffect, useState } from "react";

import {
  getStudents,
  updateAttendance,
} from "../services/studentService";

function AttendancePanel() {

  const [attendance, setAttendance] =
    useState([]);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setAttendance(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const toggleAttendance = async (
    id,
    currentAttendance
  ) => {
    try {
      await updateAttendance(
        id,
        !currentAttendance
      );

      loadStudents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      <h2 className="text-lg font-semibold mb-4">
        Attendance
      </h2>

      <div className="space-y-3">

        {attendance.map((student) => (
          <div
            key={student._id}
            className="flex justify-between items-center p-3 bg-slate-50 rounded-xl"
          >
            <span>
              {student.name}
            </span>

            <button
              onClick={() =>
                toggleAttendance(
                  student._id,
                  student.attendance
                )
              }
              className={`px-3 py-1 rounded-lg text-white ${
                student.attendance
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {student.attendance
                ? "Present"
                : "Absent"}
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AttendancePanel;