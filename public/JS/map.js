const lat = coordinates.lat;
const lng = coordinates.lng;


if (lat && lng) {  // lat and lng exist
    var map = L.map('map').setView([lat, lng], 9);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<p>Exact location will be provided after booking</p>`).openPopup();

} else {
    var map = L.map('map').setView([23.0225, 72.5714], 9);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([23.0225, 72.5714]).addTo(map);
    marker.bindPopup(`<b>Ahmedabad</b><br><p>Exact location will be provided after booking</p>` ).openPopup();

}


