const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

// Admin action state
let adminState = {
    announcement: null,
    clearCookies: false,
    forceReload: false
};

// ===== Admin Endpoints =====

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

// ===== Used by Clients =====
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
app.listen(port, () => console.log("Server listening on " + port));
