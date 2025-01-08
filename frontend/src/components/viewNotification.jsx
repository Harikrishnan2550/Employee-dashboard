import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewNotification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications for the logged-in employee
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/notifications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });

        if (response.data.success) {
          setNotifications(response.data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/notification/read/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Notification marked as read.");
        // Update state to reflect the read status
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === id ? { ...notif, read: true } : notif
          )
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Notifications</h1>

      {loading ? (
        <div className="text-xl text-gray-600">Loading notifications...</div>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
          <div className="p-6">
            {notifications.length === 0 ? (
              <div className="text-center text-lg text-gray-500">
                No notifications available.
              </div>
            ) : (
              <ul>
                {notifications.map((notif) => (
                  <li
                    key={notif._id}
                    className={`p-4 mb-4 border rounded-lg ${
                      notif.read ? "bg-gray-200" : "bg-yellow-100"
                    }`}
                  >
                    <h3 className="text-xl font-semibold text-gray-800">{notif.type}</h3>
                    <p className="text-gray-600">{notif.message}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(notif.created_at).toLocaleString()}
                    </p>
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif._id)}
                        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Mark as Read
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewNotification;
