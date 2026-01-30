let map;

function openTab(id) {
    document.getElementById(id).style.display = 'block';
    if(id === 'gallery') {
        // Fix for "Dead Buttons": Initialize map only when opened
        setTimeout(initMemoryMap, 200);
    }
}

function initMemoryMap() {
    if (map) return;
    // Centers on Rome by default as requested
    map = L.map('memory-map-container').setView([41.8986, 12.4769], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Manual Pinning with Notes
    map.on('click', function(e) {
        const note = prompt("Add a memory note for this location:");
        if(note) {
            L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
                .bindPopup(`<b>Memory:</b><br>${note}<br><small>Click to add photos</small>`).openPopup();
        }
    });
}

// Pantheon Search Logic
function searchAndPin() {
    const input = document.getElementById('map-search').value.toLowerCase();
    if(input.includes('pantheon')) {
        const coords = [41.8986, 12.4769];
        map.setView(coords, 18); // Zoom in close to the Pantheon
        L.marker(coords).addTo(map).bindPopup("<b>The Pantheon</b><br>Saving memory to exact coordinates...").openPopup();
    }
}
