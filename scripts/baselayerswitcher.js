import { getLayerByName } from './customFunctions';

$(document).ready(function() {
  const osm = $('#osm');
  const gsm = $('#gsm');
  const osmmap = getLayerByName('OSM');
  const gsmmap = getLayerByName('Google Satellite');

  // Hover events
  osm.hover(function() {
    $('#tooltips').html("Turn on Google Satellite Map");
  });

  gsm.hover(function() {
    $('#tooltips').html("Turn on Open Street Map");
  });

  // Click event for gsm
  gsm.click(function() {
    if (gsm.css('display') === 'block' && osmmap.getVisible()) {
      osm.css('display', 'block');
      gsm.css('display', 'none');
      osmmap.setVisible(false);
      gsmmap.setVisible(true);
    }
  });

  // Click event for osm (vice versa)
  osm.click(function() {
    if (osm.css('display') === 'block' && gsmmap.getVisible()) {
      gsm.css('display', 'block');
      osm.css('display', 'none');
      gsmmap.setVisible(false);
      osmmap.setVisible(true);
    }
  });
});
