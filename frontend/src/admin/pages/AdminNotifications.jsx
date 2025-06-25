import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Sample notification data
const initialNotifications = [
  {
    id: 1,
    title: "New Donation Received",
    message:
      "A donation of GH₵ 5,000 has been received for Clean Water Initiative.",
    timestamp: "2023-11-12T09:45:00",
    type: "donation",
    isRead: false,
    linkTo: "/admin/transactions/TRX54321",
    additionalInfo: { donorName: "Sarah Johnson", projectId: 3 },
  },
  {
    id: 2,
    title: "Project Milestone Reached",
    message: "Solar Power for Schools project has reached 75% completion.",
    timestamp: "2023-11-11T15:20:00",
    type: "project",
    isRead: false,
    linkTo: "/admin/projects/2",
    additionalInfo: { projectId: 2, milestone: "75%" },
  },
  {
    id: 3,
    title: "New Volunteer Application",
    message:
      "Daniel Smith has applied to volunteer for the Agricultural Training Program.",
    timestamp: "2023-11-10T14:30:00",
    type: "volunteer",
    isRead: true,
    linkTo: "/admin/volunteers/applications",
    additionalInfo: { applicantId: 42, projectId: 3 },
  },
  {
    id: 4,
    title: "Expense Approved",
    message: "Your expense request for GH₵ 1,200 has been approved.",
    timestamp: "2023-11-09T11:15:00",
    type: "expense",
    isRead: true,
    linkTo: "/admin/transactions/EXP10005",
    additionalInfo: { expenseId: "EXP10005", approvedBy: "Finance Manager" },
  },
  {
    id: 5,
    title: "Comment on Blog Post",
    message: "New comment on 'Clean Water Initiative Progress' blog post.",
    timestamp: "2023-11-08T16:45:00",
    type: "comment",
    isRead: false,
    linkTo: "/admin/reports/blogs/1#comments",
    additionalInfo: { blogId: 1, commentId: 14 },
  },
  {
    id: 6,
    title: "System Update",
    message:
      "The donation system will undergo maintenance on November 15th, 8-10 PM.",
    timestamp: "2023-11-07T09:00:00",
    type: "system",
    isRead: false,
    linkTo: "#",
    additionalInfo: {
      maintenanceDate: "2023-11-15",
      maintenanceTime: "20:00-22:00",
    },
  },
  {
    id: 7,
    title: "Project Deadline Approaching",
    message: "Agricultural Training Program phase 1 deadline is in 3 days.",
    timestamp: "2023-11-06T10:30:00",
    type: "deadline",
    isRead: true,
    linkTo: "/admin/projects/3",
    additionalInfo: { projectId: 3, deadlineDate: "2023-11-09" },
  },
  {
    id: 8,
    title: "New Message from Donor",
    message:
      "Robert Williams has sent a message regarding their recent donation.",
    timestamp: "2023-11-05T13:20:00",
    type: "message",
    isRead: true,
    linkTo: "/admin/messages/donor/15",
    additionalInfo: { donorId: 15, messageId: 73 },
  },
];

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "DoNect org | Notifications";

    // Simulate loading notifications from an API
    const loadNotifications = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // In a real app, you would fetch notifications from the server
        // For now, we'll use the sample data
        setNotifications(initialNotifications);
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, []);

  // Get unread count
  const unreadCount = notifications.filter((note) => !note.isRead).length;

  // Mark all as read handler
  const markAllAsRead = () => {
    setNotifications(notifications.map((note) => ({ ...note, isRead: true })));
  };

  // Mark single notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((note) =>
        note.id === id ? { ...note, isRead: true } : note
      )
    );
  };

  // Delete notification handler
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((note) => note.id !== id));
  };

  // Delete all read notifications
  const deleteAllRead = () => {
    setNotifications(notifications.filter((note) => !note.isRead));
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((note) => {
    const typeMatch = filter === "all" || note.type === filter;
    const readMatch = filter !== "unread" || !note.isRead;
    const searchMatch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.message.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && readMatch && searchMatch;
  });

  // Get unique notification types for filter dropdown
  const notificationTypes = [
    "all",
    "unread",
    ...new Set(notifications.map((note) => note.type)),
  ];

  // Get appropriate icon for notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "donation":
        return "fas fa-hand-holding-heart";
      case "project":
        return "fas fa-project-diagram";
      case "volunteer":
        return "fas fa-user-plus";
      case "expense":
        return "fas fa-file-invoice-dollar";
      case "comment":
        return "fas fa-comment";
      case "system":
        return "fas fa-cogs";
      case "deadline":
        return "fas fa-clock";
      case "message":
        return "fas fa-envelope";
      default:
        return "fas fa-bell";
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    // Today, show time
    if (date.toDateString() === now.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // This week, show day name and time
    const sixDaysAgo = new Date(now);
    sixDaysAgo.setDate(now.getDate() - 6);
    if (date > sixDaysAgo) {
      return `${date.toLocaleDateString([], {
        weekday: "long",
      })} at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // Older, show date
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="py-8 w-full max-w-full overflow-hidden" data-aos="fade-up">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
        Notifications
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <p className="text-gray-600 text-lg">
          Stay updated with all activities across the platform.
        </p>
        <div className="flex mt-3 md:mt-0">
          <div
            className={`px-3 py-1 rounded-lg ${
              unreadCount > 0
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            } font-medium flex items-center gap-2`}
          >
            <i className="fas fa-envelope-open"></i>
            <span>{unreadCount} unread</span>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border-t-3 shadow border-blue-500 rounded-xl p-4 flex flex-col items-center">
          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
            <i className="fas fa-bell text-blue-600"></i>
          </div>
          <p className="text-xl font-bold text-gray-800">
            {notifications.length}
          </p>
          <p className="text-sm text-gray-600">Total</p>
        </div>
        <div className="bg-green-50 border-t-3 shadow border-green-500 rounded-xl p-4 flex flex-col items-center">
          <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
            <i className="fas fa-envelope text-green-600"></i>
          </div>
          <p className="text-xl font-bold text-gray-800">{unreadCount}</p>
          <p className="text-sm text-gray-600">Unread</p>
        </div>
        <div className="bg-yellow-50 border-t-3 shadow border-yellow-500 rounded-xl p-4 flex flex-col items-center">
          <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
            <i className="fas fa-clock text-yellow-600"></i>
          </div>
          <p className="text-xl font-bold text-gray-800">
            {notifications.filter((n) => n.type === "deadline").length}
          </p>
          <p className="text-sm text-gray-600">Deadlines</p>
        </div>
        <div className="bg-red-50 border-t-3 shadow border-red-500 rounded-xl p-4 flex flex-col items-center">
          <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
            <i className="fas fa-exclamation-circle text-red-600"></i>
          </div>
          <p className="text-xl font-bold text-gray-800">
            {notifications.filter((n) => n.type === "system").length}
          </p>
          <p className="text-sm text-gray-600">System Alerts</p>
        </div>
      </div>

      {/* Filter and Search section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            {notificationTypes.map(
              (type) =>
                type !== "all" &&
                type !== "unread" && (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                )
            )}
          </select>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={markAllAsRead}
            className="flex-1 sm:flex-initial px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            disabled={unreadCount === 0}
          >
            <i className="fas fa-check-double"></i>
            <span className="whitespace-nowrap">Mark All Read</span>
          </button>
          <button
            onClick={deleteAllRead}
            className="flex-1 sm:flex-initial px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            disabled={notifications.filter((n) => n.isRead).length === 0}
          >
            <i className="fas fa-trash-alt"></i>
            <span className="whitespace-nowrap">Delete Read</span>
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-16 bg-white rounded-xl shadow">
          <div className="text-gray-400 mb-2">
            <i className="fas fa-bell-slash text-5xl"></i>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-1">
            No notifications found
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Try adjusting your search or filters"
              : "You're all caught up!"}
          </p>
        </div>
      ) : (
        // Notifications list
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <li
                key={notification.id}
                className={`transition-colors ${
                  notification.isRead
                    ? "bg-white hover:bg-gray-50"
                    : "bg-green-50 hover:bg-green-100"
                }`}
              >
                <div className="relative flex px-4 py-5 sm:px-6">
                  {/* Type icon */}
                  <div className="mr-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.isRead
                          ? "bg-gray-100"
                          : notification.type === "donation"
                          ? "bg-green-100"
                          : notification.type === "deadline"
                          ? "bg-yellow-100"
                          : notification.type === "system"
                          ? "bg-red-100"
                          : "bg-blue-100"
                      }`}
                    >
                      <i
                        className={`${getNotificationIcon(notification.type)} ${
                          notification.isRead
                            ? "text-gray-500"
                            : notification.type === "donation"
                            ? "text-green-600"
                            : notification.type === "deadline"
                            ? "text-yellow-600"
                            : notification.type === "system"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      ></i>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={notification.linkTo}
                      className="block focus:outline-none"
                    >
                      <p
                        className={`text-sm font-medium ${
                          notification.isRead
                            ? "text-gray-800"
                            : "text-green-800"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2 my-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(notification.timestamp)}
                        <span className="ml-2 capitalize px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          {notification.type}
                        </span>
                      </p>
                    </Link>
                  </div>

                  {/* Actions */}
                  <div className="ml-4 flex-shrink-0 flex gap-2 self-start">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                        title="Mark as read"
                      >
                        <i className="fas fa-check"></i>
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                      title="Delete notification"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  {/* Unread indicator */}
                  {!notification.isRead && (
                    <span className="absolute left-0 inset-y-0 w-1 bg-green-500"></span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminNotifications;
