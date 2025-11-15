const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const announcementBanner = document.getElementById('announcementBanner');

const playlists = {};

searchBtn.addEventListener('click', async () => {
    const word = searchInput.value.trim();
    if(!word) return;

    const definition = `Definition of ${word}`;

    resultsDiv.innerHTML = `
        <h3>${word}</h3>
        <p>${definition}</p>
        <button onclick="addToPlaylist('${word}')">Add to Playlist</button>
    `;

    showBanner(`Searched for "${word}"`);
});

function addToPlaylist(word) {
    const playlistName = prompt("Enter playlist name:");
    if(!playlistName) return;

    if(!playlists[playlistName]) playlists[playlistName] = [];
    playlists[playlistName].push(word);

    showBanner(`Added "${word}" to playlist "${playlistName}"`);
}

// Banner display function
function showBanner(message) {
    announcementBanner.textContent = message;
    announcementBanner.classList.remove('hidden');

    setTimeout(() => {
        announcementBanner.classList.add('hidden');
    }, 5000);
}

// Poll admin commands including premade announcements
async function checkAdminCommands() {
    const res = await fetch('/admin/commands');
    const data = await res.json();

    if(data.clearCookies) {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach(c => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        showBanner("All user data cleared by admin.");
        location.reload();
    }

    if(data.forceReload) {
        showBanner("Admin forced reload.");
        location.reload();
    }

    if(data.announcement) {
        showBanner(data.announcement);
    }
}

setInterval(checkAdminCommands, 5000);

// Register Service Worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registered'));
}
