import { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function TeacherFilesPanel() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData
      );

      console.log(response.data);

      socket.emit("newNotification", {
        message: `${file.name} uploaded`,
      });
      console.log("Notification Sent");
      alert("File Uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4">
        Upload Files
      </h2>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        className="mb-4"
      />

      <button
        onClick={uploadFile}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Upload
      </button>
    </div>
  );
}

export default TeacherFilesPanel;