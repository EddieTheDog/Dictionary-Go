const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Serve static files from public
app.use(express.static(path.join(__dirname, "../public")));

// In-memory admin state
let adminState = {
  announcement: null,
  clearCookies: false,
  forceReload: false
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

  // Reset after delivering
  adminState = {
    announcement: null,
    clearCookies: false,
    forceReload: false
  };
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
