function openOverlay(id) {
    document.getElementById(id).classList.add('active');
    if(id === 'photo-gallery') initPhotoMap();
}

function closeOverlay() {
    document.querySelectorAll('.overlay').forEach(o => o.classList.remove('active'));
}

async function generatePlan() {
    const dest = document.getElementById('destination').value;
    const days = parseInt(document.getElementById('days').value);
    const mustVisit = document.getElementById('must-visit').value;
    const resultDiv = document.getElementById('itinerary-result');

    resultDiv.innerHTML = "Consulting the architectural archives...";

    setTimeout(() => {
        let itineraryHTML = `<h3>Master Plan for ${dest}</h3>`;
        
        for (let i = 1; i <= days; i++) {
            itineraryHTML += `
                <div class="day-block" style="border-bottom: 1px solid #d4af37; padding: 15px 0;">
                    <h4>🔱 Day ${i}</h4>
                    <p><strong>09:00 AM:</strong> Historical walking tour starting at ${mustVisit ? mustVisit.split(',')[0] : 'The Old Quarter'}.</p>
                    <p><strong>01:00 PM:</strong> Lunch at a local heritage bistro recommended for architectural views.</p>
                    <p><strong>04:00 PM:</strong> Sunset viewing at the city's highest natural point.</p>
                    <p><strong>08:00 PM:</strong> Curated dinner & Jazz at a Golden Hour hotspot.</p>
                </div>
            `;
        }
        resultDiv.innerHTML = itineraryHTML;
    }, 2000);
}
