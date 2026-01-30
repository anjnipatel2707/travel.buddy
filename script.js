// Navigation Control
function showScreen(screenId) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
    
    // Initialize Map if the screen is Map View or Photo Gallery
    if(screenId === 'photo-gallery') initPhotoMap();
    if(screenId === 'map-view') initRouteMap();
}

// 1. Plan Trip Logic
async function generatePlan() {
    const dest = document.getElementById('destination').value;
    const days = document.getElementById('days').value;
    const resultDiv = document.getElementById('itinerary-result');
    
    resultDiv.innerHTML = "AI is thinking...";
    
    // In a real app, you'd call an API here. 
    // This is a simulated AI response:
    setTimeout(() => {
        resultDiv.innerHTML = `
            <h3>${days} Days in ${dest}</h3>
            <p><strong>Day 1:</strong> Visit the city center and hidden cafes.</p>
            <p><strong>Food:</strong> Try the local street food at 10:00 PM.</p>
            <p><strong>Hotel Recommendation:</strong> Blue Horizon Boutique (Within Budget).</p>
        `;
    }, 1500);
}

// 2. Budget Logic
let expenses = [];
function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amt = parseFloat(document.getElementById('expense-amt').value);
    expenses.push({name, amt});
    
    const summary = document.getElementById('budget-summary');
    const total = expenses.reduce((sum, item) => sum + item.amt, 0);
    
    summary.innerHTML = `
        <p>Current Spend: $${total}</p>
        <p style="color: green;">AI Tip: Eating at local markets could save you 20%!</p>
    `;
}

// 3. Map & Photo Logic (Leaflet.js)
function initPhotoMap() {
    let map = L.map('photo-map').setView([48.8584, 2.2945], 13); // Default to Eiffel Tower
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    map.on('click', function(e) {
        let name = prompt("Enter Memory Name:");
        if (name) {
            L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
             .bindPopup(`<b>${name}</b><br><input type="file">`).openPopup();
        }
    });
}

function initRouteMap() {
    let map = L.map('route-map').setView([48.8584, 2.2945], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // Example: Day 1 Route (Blue)
    var latlngs = [
        [48.8584, 2.2945],
        [48.8606, 2.3376],
        [48.8529, 2.3501]
    ];
    var polyline = L.polyline(latlngs, {color: 'blue'}).addTo(map);
    map.fitBounds(polyline.getBounds());
}
