// Import required modules and CSS
import 'ol/ol.css';
import Overlay from 'ol/Overlay.js';
import { toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';
import { getLayerByName } from './customFunctions';

const map = $('#map').data('map'); // map data
const mapLayers = map.getLayers();

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

map.addOverlay(overlay);

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;

  // Check if the click is on the 'WFS' layer
  const plotsLayer = getLayerByName('WFS');

  if (plotsLayer && plotsLayer.getVisible()) {
    const clickedFeature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });

    if (clickedFeature) {
      const Survey_No = clickedFeature.get('plot_numbe');
      const Area = clickedFeature.get('area');
      //const availibilty = clickedFeature.get('Availibili');

      // Collect IDs of plots with similar areas
      const similarPlots = [];
      plotsLayer.getSource().forEachFeature(function (feature) {
        const areaDiff = Math.abs(Area - feature.get('area'));
        if (areaDiff <= 0 && feature.get('plot_numbe') !== Survey_No) {
          similarPlots.push(feature.get('plot_numbe'));
        }
      });

      //if (availibilty === 1) {
        const plotsinfo = $('#info');
        plotsinfo.html(`<h5>Plot Info:</h5>
          <style>
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            h5 {
              font-size: 20px
            }
          </style>
          <script>
            function val() {
              var plot = '${Survey_No}';
              var project = $('#Title').text();

              window.open('./formzoho.html?survey=' + plot + '&project=' + project, '_blank');
            }
          </script>
          <p>Plot Number: ${Survey_No}</p>
          <p>Plot Area: ${Area} sqm</p>
          <!--<p>Similar Plot Areas: ${similarPlots.join(', ')}</p>-->

          <p id="damn"></p>
          <button id="clickButton" onclick="val()" class="button" ">Enquire</button>
        `);
     /* } else {
        const plotsinfo = $('#info');
        plotsinfo.html(`<h5>Plot Info:</h5>
          <style>
            p {
              color: red;
              font-size: larger;
            }
          </style>

          <p>Plot is sold </p>
        `);
      }*/

      // Clear the 'noFeatures' message
      $('#no-feature').html('');

      // Set the overlay position only if it's on the 'WFS' layer
      overlay.setPosition(coordinate);
    }
  }
});
