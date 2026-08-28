
(function() {
    const cardsData = [{"label": "Today", "max": 15, "min": 8, "icon": "\u2614"}, {"label": "Tomorrow", "max": 15, "min": 7, "icon": "\u2614"}, {"label": "Saturday", "max": 17, "min": 5, "icon": "\u2614"}];

    // Inyectar el Widget de 3 Días dinámicamente
    const container = document.getElementById('dynamic-weather-widget');
    if (container) {
        let htmlCards = '<h3 class="h3 forecast-widget-title">Santiago 3-Day Forecast</h3><div class="weather-forecast-row">';
        cardsData.forEach(card => {
            htmlCards += `
                <div class="content-card forecast-card-item">
                  <span class="forecast-day-label">${card.label}</span>
                  <div class="forecast-icon-box" style="font-size: 22px;">${card.icon}</div>
                  <div class="forecast-temps-row">
                    <span class="temp-max">${card.max}°C</span>
                    <span class="temp-min">${card.min}°C</span>
                  </div>
                </div>`;
        });
        htmlCards += '</div>';
        container.innerHTML = htmlCards;
    }
})();
