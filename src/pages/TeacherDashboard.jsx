import Header from "../components/Header";
import TeachingArea from "../components/TeachingArea";
import ParticipantsPanel from "../components/ParticipantsPanel";
import ControlBar from "../components/ControlBar";
import Sidebar from "../components/Sidebar";
import ChatPanel from "../components/ChatPanel";
// import TeacherCamera from "./TeacherCamera";
import TeacherCamera from "../components/TeacherCamera";
import AttendancePanel from "../components/AttendancePanel";
import TeacherFilesPanel from "../components/TeacherFilesPanel";

import { useState } from "react";

function TeacherDashboard() {

  const [activePanel, setActivePanel] = useState("participants");

  return (
    <div className="min-h-screen bg-slate-100">

      <Header />

      <div className="flex">

        <Sidebar
          activePanel={activePanel}
          setActivePanel={setActivePanel}
        />

        <div className="flex-1 p-4 relative">

          <TeachingArea />
          {/* <TeacherCamera /> */}
          <div className="fixed bottom-24 right-6 w-64 z-50">
            <TeacherCamera />
          </div>

        </div>

        <div className="w-96 p-4">

          {activePanel ===
            "participants" && (
            <ParticipantsPanel />
          )}

          {activePanel ===
            "chat" && (
            <ChatPanel />
          )}

          {activePanel === "attendance" && (
            <AttendancePanel />
          )}

          {activePanel === "files" && (
            <TeacherFilesPanel />
          )}

        </div>

      </div>

      <ControlBar />

    </div>
  );
}

export default TeacherDashboard;