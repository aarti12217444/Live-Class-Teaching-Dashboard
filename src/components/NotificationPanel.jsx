import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function NotificationPanel() {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    socket.on(
      "receiveNotification",
      (notification) => {

         console.log(
          "Notification Arrived:",
          notification
        );


        setNotifications((prev) => [
          notification,
          ...prev,
        ]);
      }
    );

    return () => {
      socket.off(
        "receiveNotification"
      );
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">

      <h2 className="text-lg font-semibold mb-4">
        🔔 Notifications
      </h2>

      <div className="space-y-2 max-h-60 overflow-y-auto">

        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No notifications
          </p>
        ) : (
          notifications.map(
            (item, index) => (
              <div
                key={index}
                className="bg-blue-50 p-3 rounded-lg"
              >
                {item.message}
              </div>
            )
          )
        )}

      </div>

    </div>
  );
}

export default NotificationPanel;