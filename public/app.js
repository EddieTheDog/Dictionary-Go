const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

const playlists = {};

searchBtn.addEventListener('click', async () => {
    const word = searchInput.value.trim();
    if(!word) return;

    // Placeholder definition
    const definition = `Definition of ${word}`;

    resultsDiv.innerHTML = `
        <h3>${word}</h3>
        <p>${definition}</p>
        <button onclick="addToPlaylist('${word}')">Add to Playlist</button>
    `;
});

function addToPlaylist(word) {
    const playlistName = prompt("Enter playlist name:");
    if(!playlistName) return;

    if(!playlists[playlistName]) playlists[playlistName] = [];
    playlists[playlistName].push(word);

    alert(`${word} added to ${playlistName}`);
}

// Poll admin commands
async function checkAdminCommands() {
    const res = await fetch('/admin/commands');
    const data = await res.json();

    if (data.clearCookies) {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach(c => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        location.reload();
    }

    if (data.forceReload) {
        location.reload();
    }

    if (data.announcement) {
        alert("Announcement:\n\n" + data.announcement);
    }
}

setInterval(checkAdminCommands, 10000);

// Register Service Worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registered'));
}
