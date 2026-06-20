import { useRef, useState } from "react";
// import { useRef, useState } from "react";
// import Draggable from "react-draggable";

function TeacherCamera() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (error) {
      console.error("Camera Error:", error);
      alert("Camera access denied!");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  const toggleMute = () => {
  if (stream) {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsMuted(!isMuted);
  }
};

  if (!isVisible) return null;

return (
  <div className="bg-white rounded-2xl shadow-2xl p-3 border border-slate-200">

    <div className="flex items-center justify-between mb-4">

      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Teacher Camera
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            stream
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {stream ? "Live" : "Offline"}
        </span>
      </div>

      <div className="flex gap-2">

        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200"
        >
          −
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200"
        >
          □
        </button>

        <button
          onClick={() => setIsVisible(false)}
          className="w-7 h-7 rounded bg-red-100 text-red-600 hover:bg-red-200"
        >
          ✕
        </button>

      </div>

    </div>

    {!isMinimized && (
      <>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`w-full rounded-xl bg-black object-cover border ${
            isExpanded
              ? "h-80"
              : "h-40"
          }`}
        />

        <div className="grid grid-cols-3 gap-2 mt-3">

          <button
            onClick={startCamera}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
          >
            Start
          </button>

          <button
            onClick={stopCamera}
            className="bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-lg text-sm"
          >
            Stop
          </button>

          <button
            onClick={toggleMute}
            className="bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-lg text-sm"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>

        </div>
      </>
    )}

  </div>
);
}
export default TeacherCamera;