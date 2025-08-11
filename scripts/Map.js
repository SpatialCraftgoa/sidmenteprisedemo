// Import required modules and CSS
import 'ol/ol.css';
import { Map, View } from 'ol/';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import { Image as ImageLayer } from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import { OSM } from 'ol/source';
import { ScaleLine, defaults as defaultControls } from 'ol/control.js';
import XYZ from 'ol/source/XYZ.js';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';

// ScaleLine control
let control = new ScaleLine({
    units: 'metric',
    steps: 1,
    bar: true,
    text: true,
    minWidth: 100,
    className: 'scale',
});

// Basemaps
const Osmlayer = new TileLayer({
    source: new OSM(),
    visible: true,
    name: 'OSM',
});



// Projection setup
proj4.defs('EPSG:32643', '+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs');
register(proj4);
const mapProjection2 = getProjection('EPSG:32643');

/* Primary raster layer - will be replaced by bash script
const orthosource = new TileWMS({
    url: '',
});
const ortholayer = new TileLayer({
    source: orthosource,
    opacity: 1,
    name: 'Map',
});/*

/*boundslayer layer - this can have many injected dynamically
const boundslayer = new ImageLayer({
    source: new ImageWMS({
        url: '',
    }),
    visible: true,
    name: '',
});*/

// View configuration
const centerCoordinates = centerpoint.split(',').map(parseFloat);
const isMobile = window.innerWidth <= 600;
const zoomLevel = isMobile ? 15 : 18.5;

const view1 = new View({
    center: centerCoordinates,
    zoom: zoomLevel,
    multiWorld: false,
    projection: mapProjection2,
});

// Map configuration
const map = new Map({
    //controls: defaultControls().extend([control]),
    target: "map",
    layers: [
       Osmlayer
      
        
         // more boundslayers injected dynamically if needed
    ],
    view: view1,
});

// Store map reference for later
$('#map').data('map', map);
