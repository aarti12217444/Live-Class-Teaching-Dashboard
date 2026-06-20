import { useState, useEffect } from "react";
import socket from "../socket";

function ChatPanel() {
  const [newMessage, setNewMessage] = useState("");
  
 const [messages, setMessages] = useState([]);

  const sendMessage = () => {
  if (!newMessage.trim()) return;

  const msg = {
    id: Date.now(),
    sender: "Teacher",
    role: "teacher",
    text: newMessage,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  socket.emit("sendMessage", msg);

  setNewMessage("");
};

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

  return (
  <div className="bg-white rounded-2xl shadow-md p-5">
    <h2 className="text-xl font-semibold mb-4">
      Live Student Messages
    </h2>

    <div className="h-72 overflow-y-auto border rounded-xl p-3 bg-slate-50">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`mb-3 p-3 rounded-xl ${
            msg.role === "teacher"
              ? "bg-blue-100 ml-10"
              : "bg-white mr-10"
          }`}
        >
          <div className="flex justify-between text-xs text-gray-500 mb-1">
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
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Reply to students..."
        className="flex-1 border rounded-lg px-3 py-2"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 rounded-lg"
      >
        Send
      </button>
    </div>
  </div>
);
}

export default ChatPanel;