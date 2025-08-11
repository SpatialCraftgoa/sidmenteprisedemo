const map = $('#map').data('map');
import { fromLonLat } from 'ol/proj';

const searchBtn = $('#search-global');


// Desktop view
searchBtn.click(function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    handleGeocoding('#global-input');
});



function handleGeocoding(inputSelector) {
    const query = $(inputSelector).val();

    // Perform geocoding using Nominatim API
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    fetch(nominatimUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const location = data[0];

                // Transform coordinates from EPSG:4326 to EPSG:3857
                const coordinates = fromLonLat([parseFloat(location.lon), parseFloat(location.lat)], 'EPSG:3857');

                // Center the map on the geocoded location with a duration of 1 second
                map.getView().animate({
                    center: coordinates,
                    duration: 1000 // 1 second
                });

                // Optionally, set a fixed zoom level
                map.getView().animate({
                    zoom: 17,
                    duration: 1000 // 1 second
                });
                $(inputSelector).val('');
            } else {
                window.alert('Location not found');
            }
        })
        .catch(error => {
            console.error('Error fetching geocoding data:', error);
            window.alert('An error occurred while fetching geocoding data');
        });
}


