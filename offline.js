// Function to display an offline message
function displayOfflineMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.id = 'offline-message';
    messageContainer.className = 'bg-red-500 text-white p-4 rounded-lg text-center';
    messageContainer.textContent = "Couldn't load any songs. Please check your internet connection.";
    document.body.prepend(messageContainer);
}

// Function to remove the offline message
function removeOfflineMessage() {
    const messageContainer = document.getElementById('offline-message');
    if (messageContainer) {
        messageContainer.remove();
    }
}

// Check online status when the page loads
window.addEventListener('load', () => {
    if (!navigator.onLine) {
        displayOfflineMessage();
    }
});

// Listen for changes in the online status
window.addEventListener('online', () => {
    removeOfflineMessage();
    // Optionally, you can reload the songs here
    createSongGrid(songs);
    loadSong(currentSongIndex);
});

window.addEventListener('offline', () => {
    displayOfflineMessage();
});