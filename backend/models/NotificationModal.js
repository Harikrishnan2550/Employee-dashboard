import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  message: { type: String, required: true },
  type: { type: String, required: true }, // "Leave Approved", "Leave Rejected"
  read: { type: Boolean, default: false }, // Whether the notification has been read
  created_at: { type: Date, default: Date.now }, // Notification creation time
  updated_at: { type: Date }, // Optional: Track last update time
  expires_at: { type: Date, default: null }, // Optional: Expiration date
});

// Indexing for better query performance
notificationSchema.index({ employee_id: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ read: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
