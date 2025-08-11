import { getLayerByName } from './customFunctions';

const player = document.getElementById('map-switcher');
const osmmap = getLayerByName('OSM');
const gsmmap = getLayerByName('Google Satellite');



player.addEventListener("click", function () {
    // Check the visibility state of the layers
    if (osmmap.getVisible()) {
        // If OSM is visible, switch to Satellite
        osmmap.setVisible(false);
        gsmmap.setVisible(true);
    } else {
        // If Satellite is visible, switch to OSM
        gsmmap.setVisible(false);
        osmmap.setVisible(true);
    }
});
