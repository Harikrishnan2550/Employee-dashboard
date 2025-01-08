import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId
    ref: "Employee", // Reference the Employee model
    required: true,
  },
  message: { type: String, required: true },
  type: { type: String, required: true }, // "Leave Approved", "Leave Rejected"
  read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  expires_at: { type: Date, default: () => Date.now() + 2 * 24 * 60 * 60 * 1000 }, // Default to 2 days after creation
});

// Index for better query performance
notificationSchema.index({ employee_id: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ read: 1 });
notificationSchema.index({ expires_at: 1 }); // Index for expiration time

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
