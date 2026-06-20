import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function StudentChatPanel() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);
  useEffect(() => {
  socket.on(
    "receiveMessage",
    (message) => {
      setMessages((prev) => [
        ...prev,
        message,
      ]);
    }
  );

  return () => {
    socket.off("receiveMessage");
  };
}, []);

  const sendMessage = () => {
  if (!message.trim()) return;

  const newMessage = {
    id: Date.now(),
    sender: "Student",
    text: message,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    role: "student",
  };

  socket.emit(
    "sendMessage",
    newMessage
  );

  setMessage("");
};

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Class Chat
      </h2>

      <div className="h-72 overflow-y-auto border rounded-xl p-3 bg-slate-50">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 p-3 rounded-xl ${
              msg.role === "teacher"
                ? "bg-blue-100"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>{msg.sender}</span>
              <span>{msg.time}</span>
            </div>

            <p>{msg.text}</p>
          </div>
        ))}

      </div>

      <div className="flex gap-2 mt-4">

        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default StudentChatPanel;