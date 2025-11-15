const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// In-memory admin state
let adminState = {
  announcement: null,
  clearCookies: false,
  forceReload: false,
  premadeAnnouncements: [
    "Tip: You can create playlists of your favorite words!",
    "Remember to add this app to your home screen for offline access.",
    "New words added daily!",
    "Collaborate with friends by sharing playlists.",
    "Check out the top trending words today."
  ]
};

// Admin endpoints
app.post("/admin/send-announcement", (req, res) => {
  adminState.announcement = req.body.message;
  res.json({ ok: true });
});

app.post("/admin/clear-cookies", (req, res) => {
  adminState.clearCookies = true;
  res.json({ ok: true });
});

app.post("/admin/force-reload", (req, res) => {
  adminState.forceReload = true;
  res.json({ ok: true });
});

// Client polls admin commands
app.get("/admin/commands", (req, res) => {
  res.json(adminState);

  // Rotate premade announcements randomly for display
  const randomIndex = Math.floor(Math.random() * adminState.premadeAnnouncements.length);
  adminState.announcement = adminState.premadeAnnouncements[randomIndex];

  // Reset commands after sending
  adminState.clearCookies = false;
  adminState.forceReload = false;
});
  
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
