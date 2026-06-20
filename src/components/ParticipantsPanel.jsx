// import { useState } from "react";
import { useEffect, useState } from "react";
import {
  getStudents,
  deleteStudent,
  addStudent,
} from "../services/studentService";
function ParticipantsPanel() {

 const [participants, setParticipants] = useState([]);

 const loadStudents = async () => {
  try {
    const data = await getStudents();
    setParticipants(data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  const fetchStudents = async () => {
    try {
      const data = await getStudents();

      console.log(data);

      setParticipants(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchStudents();
}, []);

const activities = [
  "Rahul joined the class",
  "Priya raised hand",
  "Aman left and rejoined",
];


const addParticipant = async () => {
  try {
    await addStudent({
      name: `Student ${
        participants.length + 1
      }`,
      status: "online",
      handRaised: false,
    });

    loadStudents();
  } catch (error) {
    console.log(error);
  }
};

const removeParticipant = async (id) => {
  try {
    await deleteStudent(id);

    const updatedStudents =
      await getStudents();

    setParticipants(updatedStudents);
  } catch (error) {
    console.log(error);
  }
};

const toggleMute = (id) => {
  setParticipants(
    participants.map((student) =>
      student.id === id
        ? {
            ...student,
            muted: !student.muted,
          }
        : student
    )
  );
};
return (
  <div className="bg-white rounded-2xl shadow-md p-5">

    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">
        Participants
      </h2>

      <div className="flex gap-2 items-center">
        {/* <button
          onClick={addParticipant}
          className="bg-green-600 text-white px-3 py-1 rounded-lg"
        >
          Add Student
        </button> */}
        <span className="font-medium">
          Registered Students
        </span>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {participants.length}
        </span>
      </div>
    </div>

    <div className="mb-6">
      <h3 className="font-medium mb-3">
        Student List
      </h3>

      <div className="space-y-3">
        {participants.map((student) => (
          <div
            key={student._id}
            className="flex justify-between items-center p-3 bg-slate-50 rounded-xl"
          >
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center font-bold">
                {student.fullName.charAt(0)}
              </div>

              <div>
                <div className="font-medium">
                  {student.fullName}
                </div>

                <div className="text-xs text-gray-500">
                  Join: {student.joinTime}
                </div>

                <div className="text-xs text-gray-500">
                  Exit: {student.exitTime}
                </div>

                <div className="text-xs text-gray-500">
                  Duration: {student.duration}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">

  {student.handRaised && (
    <span title="Raised Hand">
      ✋
    </span>
  )}

  <button
    onClick={() =>
      toggleMute(student._id)
    }
    className="bg-orange-500 text-white px-2 py-1 rounded text-xs"
  >
    {student.muted
      ? "Unmute"
      : "Mute"}
  </button>

  <button
    onClick={() =>
      removeParticipant(student._id)
    }
    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
  >
    Remove
  </button>

  <span className="w-3 h-3 rounded-full bg-green-500"></span>

</div>
              
          </div>
        ))}
      </div>
    </div>

    <div className="mb-6">
      <h3 className="font-semibold mb-3">
        Attendance Summary
      </h3>

      <div className="space-y-2">
        <div className="bg-green-50 p-3 rounded-lg">
          Present: {
            participants.filter(
              (p) => p.attendance
            ).length
          }
        </div>

        <div className="bg-red-50 p-3 rounded-lg">
          Absent: {
            participants.length -
            participants.filter(
              (p) => p.attendance
            ).length
          }
        </div>
      </div>
    </div>

    <div>
      <h3 className="font-medium mb-3">
        Recent Activity
      </h3>

      <div className="space-y-2 text-sm text-slate-600">
        {activities.map((item, index) => (
          <div
            key={index}
            className="bg-slate-50 p-2 rounded-lg"
          >
            {item}
          </div>
        ))}
      </div>
    </div>

  </div>
);
}
export default ParticipantsPanel;