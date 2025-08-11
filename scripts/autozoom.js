// Function to zoom to the point of interest
const zoom = $('#projectname');

import { getLayerByName } from './customFunctions';
const indicator = getLayerByName('Indicator');

zoom.click(function() {
    const map = $('#map').data('map'); // Map data
    

    // Define the coordinate you want to zoom to
    const coordinate = centerpoint.split(',').map(parseFloat); // Convert to array of numbers

    // Set the center and zoom level with animation
    map.getView().animate({
        center: coordinate,
        zoom: 17, // Replace with your desired zoom level
        duration: 1000 // Replace with your desired animation duration in milliseconds
    });
});


var geolink = document.getElementsByClassName("LogoGeo31");
for (var i = 0; i < geolink.length; i++) {
    geolink[i].addEventListener("click", function() {
        window.open('https://spatialcraft.in/geosensitive/', '_blank');
    });
}
var svgElements = document.getElementsByClassName("svg");
for (var i = 0; i < svgElements.length; i++) {
    svgElements[i].addEventListener("click", function() {
        window.open('https://swamisamarthinfra.com/', '_blank');
    });
}
const clientimg=$('#pro-img')

clientimg.click(function() {
    window.open('https://swamisamarthinfra.com/', '_blank');
})