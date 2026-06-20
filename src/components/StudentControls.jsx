import { useState } from "react";

function StudentControls() {

  const [handRaised, setHandRaised] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Student Controls
      </h2>

      <div className="grid grid-cols-2 gap-3">

        <button
          onClick={() => setHandRaised(!handRaised)}
          className={`p-3 rounded-xl font-medium ${
            handRaised
              ? "bg-yellow-100 text-yellow-700"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          ✋ {handRaised ? "Raised" : "Raise Hand"}
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 font-medium"
        >
          {isMuted ? "🔇 Unmute" : "🎤 Mute"}
        </button>

        {/* <button
          onClick={() => setCameraOn(!cameraOn)}
          className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 font-medium"
        >
          {cameraOn ? "📷 Camera On" : "📷 Camera Off"}
        </button> */}

        <button
          className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 font-medium"
        >
          🚪 Leave
        </button>

      </div>

      {/* Attendance Card */}

      <div className="mt-5 border-t pt-4">

        <h3 className="font-semibold text-slate-700 mb-3">
          Attendance
        </h3>

        <div className="space-y-2 text-sm">

          <div className="bg-green-50 p-3 rounded-lg">
            Status: Present
          </div>

          <div className="bg-slate-50 p-3 rounded-lg">
            Join Time: 10:05 AM
          </div>

          <div className="bg-slate-50 p-3 rounded-lg">
            Duration: 45 min
          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentControls;