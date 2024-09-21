

fetch('songs.json')
    .then(response => response.json())
    .then(data => {
        songs = data;
        createSongGrid(songs);
        loadSong(currentSongIndex);
        updatePlayPauseIcon();
    })
    .catch(error => console.error('Error loading songs:', error));
//https://via.placeholder.com/300?text=DEMO
let currentSongIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const songGrid = document.getElementById('song-grid');
const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');
const currentSongImage = document.getElementById('current-song-image');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const playbackBar = document.getElementById('playback-bar');
const currentTimeLabel = document.getElementById('current-time');
const totalTimeLabel = document.getElementById('total-time');

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    currentSongTitle.textContent = song.title;
    currentSongArtist.textContent = song.artist;
    currentSongImage.src = song.cover;
    if (isPlaying) {
        audioPlayer.play();
    }
}

function createSongGrid(songsToDisplay) {
    songGrid.innerHTML = ''; // Clear existing songs
    songsToDisplay.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = 'bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer';
        songElement.innerHTML = `
            <img src="${song.cover}" alt="${song.title}" class="w-full aspect-square object-cover rounded-md mb-4">
            <h3 class="font-semibold truncate">${song.title}</h3>
            <p class="text-sm text-gray-400 truncate">${song.artist}</p>
        `;
        songElement.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            isPlaying = true;
            updatePlayPauseIcon();
        });
        songGrid.appendChild(songElement);
    });
}

function updatePlayPauseIcon() {
    playPauseButton.innerHTML = isPlaying
        ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
}

function searchSongs(query) {
    return songs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );
}

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
});

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    const searchResults = searchSongs(query);
    createSongGrid(searchResults);
});

searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    const searchResults = searchSongs(query);
    createSongGrid(searchResults);
});

// Load song duration when the song is loaded
audioPlayer.addEventListener('loadedmetadata', () => {
    playbackBar.max = Math.floor(audioPlayer.duration);
    totalTimeLabel.textContent = formatTime(audioPlayer.duration);
});

// Update the playback bar and current time while playing
audioPlayer.addEventListener('timeupdate', () => {
    playbackBar.value = Math.floor(audioPlayer.currentTime);
    currentTimeLabel.textContent = formatTime(audioPlayer.currentTime);
});

// Allow scrubbing by changing the playback bar
playbackBar.addEventListener('input', (e) => {
    audioPlayer.currentTime = e.target.value;
});

// Utility function to format time (minutes:seconds)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
    }
  })


createSongGrid(songs);
loadSong(currentSongIndex);
updatePlayPauseIcon();

currentSongTitle.textContent = ""; // Set default text
currentSongArtist.textContent = ""; // Clear artist
currentSongImage.src = "https://via.placeholder.com/56?text=play"; // Set a placeholder image

console.log("%c🐾 Welcome to Meowify! 🎶", "font-size: 24px; color: #00FF7F; font-weight: bold");
console.log("%cCreated by Michon van Vilsteren", "font-size: 16px; color: #00FF7F;");
console.log("%cThanks for checking out the code! 🐱", "font-size: 18px; color: #FF69B4;");
console.log("%cIf you have any suggestions, feel free to reach out!", "font-size: 16px; color: #FFD700;");
console.log("%cHappy listening! 🎵🐾", "font-size: 20px; color: #FF69B4;");
