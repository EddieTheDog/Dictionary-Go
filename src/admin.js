async function sendAnnouncement() {
    const msg = document.getElementById("announcementText").value.trim();
    if (!msg) return alert("Write something first.");

    await fetch('/admin/send-announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
    });

    alert("Announcement sent!");
}

async function clearUserCookies() {
    await fetch('/admin/clear-cookies', { method: 'POST' });
    alert("All users will reset on next load.");
}

async function forceReload() {
    await fetch('/admin/force-reload', { method: 'POST' });
    alert("Clients will reload.");
}
