function openPage(id) { document.getElementById(id).style.display = 'block'; }
function closePage(id) { document.getElementById(id).style.display = 'none'; }

// 1. NON-REPETITIVE AI LOGIC
function generateDeepPlan() {
    const city = document.getElementById('city').value;
    const days = parseInt(document.getElementById('days').value);
    const output = document.getElementById('itinerary-output');

    const m = ["Sunrise street photography in", "Hidden library tour of", "Underground artisan workshop in", "Historic garden meditation in"];
    const a = ["Underrated brutalist architecture tour in", "Forgotten coastal ruins near", "Local heritage bistro tasting in"];

    let html = `<h3>${days} Days in ${city}</h3>`;
    for(let i = 1; i <= days; i++) {
        html += `<div class="day-card"><h4>⚜ Day ${i}</h4>
        <p>AM: ${m[i % m.length]} ${city}.</p>
        <p>PM: ${a[i % a.length]} the outskirts.</p></div>`;
    }
    output.innerHTML = html;
}

// 2. FINANCIAL GRAPH LOGIC
let chart;
function updateChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    const total = document.getElementById('total-limit').value;
    const spent = document.getElementById('current-spent').value;

    if(chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Spent', 'Remaining'],
            datasets: [{ data: [spent, total-spent], backgroundColor: ['#d4af37', '#333'] }]
        }
    });
}
