const User = require("../models/User");
const { admin, isReady } = require("../config/firebase");

exports.sendNotification = async (req, res) => {
  try {
    if (!isReady()) {
      return res.status(500).json({ message: "Firebase is not set up. Add firebase-key.json" });
    }

    const { title, body, token } = req.body;

    // If a device token is sent, save it on the user for next time
    if (token) {
      await User.findByIdAndUpdate(req.user._id, { fcmToken: token });
    }

    const target = token || req.user.fcmToken;
    if (!target) {
      return res.status(400).json({ message: "No device token. Send a 'token' in the body" });
    }

    const response = await admin.messaging().send({
      token: target,
      notification: { title, body },
    });

    res.json({ message: "Notification sent", response });
  } catch (error) {
    res.status(500).json({ message: "Firebase error: " + error.message });
  }
};
