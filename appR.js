const express = require("express");
const admin = require("firebase-admin");

const appR = express();
const PORT = process.env.PORT || 3000;

// initialisation Firebase avec variables Render
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

const db = admin.firestore();

appR.get("/", (req, res) => {
  res.send("Server running");
});

// route test Firebase
appR.get("/firebase-test", async (req, res) => {
  try {
    const doc = await db.collection("test").doc("connection").set({
      status: "ok",
      time: new Date()
    });

    res.json({ firebase: "connected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

appR.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
