async function sendAnnouncement() {
    const msg = document.getElementById("announcementText").value.trim();
    if(!msg) return alert("Write something first.");

    await fetch('/admin/send-announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
    });

    showBanner(`Announcement sent: "${msg}"`);
}

async function clearUserCookies() {
    await fetch('/admin/clear-cookies', { method: 'POST' });
    showBanner("All users will reset on next load.");
}

async function forceReload() {
    await fetch('/admin/force-reload', { method: 'POST' });
    showBanner("Clients will reload.");
}

// Local banner function
function showBanner(message) {
    const banner = document.getElementById('announcementBanner');
    banner.textContent = message;
    banner.classList.remove('hidden');
    setTimeout(() => banner.classList.add('hidden'), 5000);
}
