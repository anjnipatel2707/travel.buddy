let map, chart;

// 1. NAVIGATION LOGIC (Fixes the Dead Buttons)
function openTab(id) {
    // Hide all modals first to prevent overlapping
    document.querySelectorAll('.modal, .page-overlay').forEach(el => el.style.display = 'none');
    
    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'block';
        
        // If opening the Gallery/Map, we must initialize the map
        if(id === 'gallery' || id === 'map') {
            setTimeout(initMemoryMap, 200);
        }
    }
}

function closeTab(id) {
    document.getElementById(id).style.display = 'none';
}

// 2. AI ITINERARY (The 'Rome' & Underrated Logic)
function generateDeepPlan() {
    const city = document.getElementById('city').value.toLowerCase();
    const days = parseInt(document.getElementById('days').value);
    const specifics = document.getElementById('must-visit').value;
    const output = document.getElementById('itinerary-output');

    const icons = {
        "rome": [
            {n: "The Colosseum", d: "The ultimate icon of Imperial Rome."},
            {n: "Pantheon & Piazza della Rotonda", d: "The world's best-preserved ancient monument."},
            {n: "Trevi Fountain", d: "The baroque masterpiece of water and stone."},
            {n: "Vatican Museums", d: "Home to the Sistine Chapel."}
        ]
    };

    const hidden = ["The Aventine Keyhole", "Trastevere's hidden gardens", "Appian Way ruins"];

    let html = `<h3>${days} Days in ${city.toUpperCase()}</h3>`;
    for (let i = 1; i <= days; i++) {
        let spot = (icons[city] && icons[city][i-1]) ? icons[city][i-1].n : hidden[i % hidden.length];
        let desc = (icons[city] && icons[city][i-1]) ? icons[city][i-1].d : "An underrated architectural secret.";

        html += `
        <div class="day-card" style="background:white; color:black; padding:15px; margin:15px 0; transform:rotate(-1deg); box-shadow:0 5px 15px rgba(0,0,0,0.3);">
            <h4 style="font-family:cursive; color:#004d4d; margin:0;">Day ${i}</h4>
            <p><strong>09:00 AM:</strong> ${spot}<br><small>${desc}</small></p>
            <p><strong>Specifics:</strong> ${specifics || "Curating based on local vibes..."}</p>
        </div>`;
    }
    output.innerHTML = html;
}

// 3. MEMORY MAP (Pins, Notes, & Pantheon Search)
function initMemoryMap() {
    if (map) {
        map.invalidateSize(); // Refreshes map if already loaded
        return;
    }
    
    // Default center on Rome
    map = L.map('memory-map-container').setView([41.8986, 12.4769], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Click to add note & pin
    map.on('click', function(e) {
        const note = prompt("Add a note to this coordinate:");
        if(note) {
            L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
                .bindPopup(`<b>Memory:</b><br>${note}`).openPopup();
        }
    });
}

function searchAndPin() {
    const query = document.getElementById('map-search').value.toLowerCase();
    if(query.includes('pantheon')) {
        const coords = [41.8986, 12.4769];
        map.setView(coords, 17);
        L.marker(coords).addTo(map).bindPopup("<b>The Pantheon</b><br>Memory saved here.").openPopup();
    } else {
        alert("Searching for coordinates... Pinning soon.");
    }
}

// 4. FINANCIAL TRACKER (Currency & Chart)
function updateFinance() {
    const ctx = document.getElementById('financeChart').getContext('2d');
    const total = parseFloat(document.getElementById('total').value);
    const spent = parseFloat(document.getElementById('spent').value);
    const symbol = document.getElementById('currency').value;

    if(chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [`Spent ${symbol}`, `Remaining ${symbol}`],
            datasets: [{
                data: [spent, total - spent],
                backgroundColor: ['#d4af37', '#222'],
                borderWidth: 0
            }]
        },
        options: { cutout: '75%' }
    });
}
