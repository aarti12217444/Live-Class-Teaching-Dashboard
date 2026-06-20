import { useState, useRef } from "react";

function ControlBar() {

  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef(null);

  const recordedChunksRef = useRef([]);

  const [isLocked, setIsLocked] = useState(false);
  const [classEnded, setClassEnded] = useState(false);

  const startRecording = async () => {
  try {
    const stream =
      await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

    const mediaRecorder =
      new MediaRecorder(stream);

    mediaRecorderRef.current =
      mediaRecorder;

    recordedChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(
          event.data
        );
      }
    };

    mediaRecorder.start();

    setIsRecording(true);
  } catch (error) {
    console.log(error);
  }
};

const stopRecording = () => {
  if (!mediaRecorderRef.current) return;

  mediaRecorderRef.current.stop();

  setIsRecording(false);
};

const saveRecording = () => {
  const blob = new Blob(
    recordedChunksRef.current,
    {
      type: "video/webm",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download = "class-recording.webm";

  a.click();

  window.URL.revokeObjectURL(url);
};

const toggleClassroomLock = () => {
  setIsLocked(!isLocked);
};

const endClass = () => {
  setClassEnded(true);
  alert("Class Ended");
};

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={startRecording}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Start Recording
        </button>

        <button
          onClick={stopRecording}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
        >
          Stop Recording
        </button>

        <button
          onClick={saveRecording}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Save Recording
        </button>
        <button
  onClick={toggleClassroomLock}
  className={`px-5 py-2 rounded-lg text-white ${
    isLocked
      ? "bg-red-600"
      : "bg-slate-700"
  }`}
>
  {isLocked
    ? "Unlock Classroom"
    : "Lock Classroom"}
</button>

<button
  onClick={endClass}
  className="bg-red-800 text-white px-5 py-2 rounded-lg"
>
  End Class
</button>
      </div>
    </div>
  );
}

export default ControlBar;