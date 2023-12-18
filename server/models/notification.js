import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
	sender: String,
	receiver: String,
	college: String,
	message: String,
	timestamp: { type: Date, default: Date.now },
	isRead: { type: Boolean, default: false },
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
