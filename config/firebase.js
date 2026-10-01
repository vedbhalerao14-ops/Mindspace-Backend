const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const keyPath = path.join(__dirname, "..", "firebase-key.json");
let ready = false;

if (fs.existsSync(keyPath)) {
  admin.initializeApp({ credential: admin.credential.cert(require(keyPath)) });
  ready = true;
} else {
  console.log("firebase-key.json not found. Notifications are disabled.");
}

module.exports = { admin, isReady: () => ready };
