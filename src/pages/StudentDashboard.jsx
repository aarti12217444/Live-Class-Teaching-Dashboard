import StudentVideoPanel from "../components/StudentVideoPanel";
import StudentChatPanel from "../components/StudentChatPanel";
import StudentFilesPanel from "../components/StudentFilesPanel";
import StudentControls from "../components/StudentControls";
import NotificationPanel from "../components/NotificationPanel";

function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Live Classroom
        </h1>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
          Class Active
        </span>

      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">

        {/* Left Area */}
        <div className="xl:col-span-3">
          <StudentVideoPanel />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-5">
          <StudentControls />
          <StudentFilesPanel />
          <NotificationPanel />
        </div>

      </div>

      {/* Bottom Chat */}
      <div className="mt-5">
        <StudentChatPanel />
      </div>

    </div>
  );
}

export default StudentDashboard;