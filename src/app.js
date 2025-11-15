const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

const playlists = {};

searchBtn.addEventListener('click', async () => {
    const word = searchInput.value.trim();
    if(!word) return;

    // Example: Fetch definition (replace with real API if you want)
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

// Register Service Worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registered'));
}
