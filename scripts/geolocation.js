import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature.js';
import Geolocation from 'ol/Geolocation.js';
import Point from 'ol/geom/Point.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';

// Define the EPSG:32643 projection using proj4
proj4.defs('EPSG:32643', '+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs');
register(proj4);

// Get the projection
const mapProjection2 = getProjection('EPSG:32643');

// Get the OpenLayers map object from the DOM
const map = $('#map').data('map');

// Create vector layer to display position
const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({
  source: vectorSource,
});
map.addLayer(vectorLayer);

$(document).ready(function () {
  let geolocation;
  let positionFeature;
  let isButtonBlue = false;

  $('#my-location').on('click', function () {
    const locator = document.getElementById('my-location');

    if (!isButtonBlue) {
      // Change button color to blue
      locator.style.setProperty('background-color', 'blue', 'important');
      isButtonBlue = true;

      // Initialize Geolocation
      geolocation = new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: mapProjection2,
      });

      // Handle errors
      geolocation.on('error', function (error) {
        alert('Geolocation error: ' + error.message);
        if (error.code === 1) {
          alert('Please enable location services to use this feature.');
        }
      });

      // Update position feature
      geolocation.on('change:position', function () {
        const coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
        if (isButtonBlue && coordinates && geolocation.getTracking()) {
          map.getView().animate({
            center: coordinates,
            zoom: 17,
            duration: 1000,
          });
        }
      });

      // Create and style the position feature
      positionFeature = new Feature();
      positionFeature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: '#3399CC' }),
            stroke: new Stroke({ color: '#fff', width: 2 }),
          }),
        })
      );
      vectorSource.addFeature(positionFeature);

      // Start tracking
      geolocation.setTracking(true);

    } else {
      // Revert button color to white
      locator.style.setProperty('background-color', 'white', 'important');
      isButtonBlue = false;

      // Stop tracking and remove position marker
      geolocation.setTracking(false);
      vectorSource.removeFeature(positionFeature);
    }

    // Center map on location if available
    if (isButtonBlue) {
      const coordinates = geolocation.getPosition();
      if (coordinates && geolocation.getTracking()) {
        map.getView().animate({
          center: coordinates,
          zoom: 17,
          duration: 1000,
        });
      }
    }
  });
});
