const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Serve static files from public/
app.use(express.static(path.join(__dirname, "../public")));

// In-memory admin state
let adminState = {
  announcement: null,
  clearCookies: false,
  forceReload: false
};

// Endpoint to send a custom announcement from admin
app.post("/admin/send-announcement", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  adminState.announcement = message;
  res.json({ ok: true });
});

// Endpoint to trigger clearing all client cookies/data
app.post("/admin/clear-cookies", (req, res) => {
  adminState.clearCookies = true;
  res.json({ ok: true });
});

// Endpoint to force all clients to reload
app.post("/admin/force-reload", (req, res) => {
  adminState.forceReload = true;
  res.json({ ok: true });
});

// Clients poll this endpoint to get current admin commands
app.get("/admin/commands", (req, res) => {
  res.json(adminState);

  // Reset commands after sending to clients
  adminState.clearCookies = false;
  adminState.forceReload = false;
  adminState.announcement = null;
});

// Listen on the correct port for Render
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
