import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import TileWMS from 'ol/source/TileWMS';
import ImageWMS from 'ol/source/ImageWMS';

// Assuming you have a map with layers already initialized
const map = $('#map').data('map');

// Function to decode URL and clean it by keeping only necessary parameters
const cleanUrl = (url, params, isMobile) => {
  const urlObj = new URL(url);
  const allowedParams = [
    'MAP', 'VERSION', 'SERVICE', 'REQUEST', 'FORMAT', 'LAYERS', 'LAYER',
    'LAYERTITLE', 'RULELABEL', 'ITEMFONTBOLD', 'ITEMFONTSIZE', 'ITEMFONTITALIC',
    'ITEMFONTCOLOR', 'SYMBOLWIDTH', 'SYMBOLHEIGHT', 'ICONLABELSPACE', 'SYMBOLSPACE', 'TRANSPARENT'
  ];

  urlObj.pathname = decodeURIComponent(urlObj.pathname);

  // Remove any unnecessary parameters
  [...urlObj.searchParams].forEach(([key]) => {
    if (!allowedParams.includes(key)) {
      urlObj.searchParams.delete(key);
    }
  });

  // Set filter parameters based on screen size
  const filterParams = {
    LAYERTITLE: 'FALSE',
    RULELABEL: 'FALSE',
    ITEMFONTBOLD: 'FALSE',
    ITEMFONTSIZE: '0',
    ITEMFONTITALIC: 'FALSE',
    ITEMFONTCOLOR: 'transparent',
    SYMBOLWIDTH: isMobile ? '7' : '16', // Smaller for mobile view
    SYMBOLHEIGHT: isMobile ? '2' : '3', // Smaller for mobile view
    ICONLABELSPACE: '0',
    SYMBOLSPACE: '0',
    TRANSPARENT: 'TRUE'
  };

  for (const param in filterParams) {
    if (!urlObj.searchParams.has(param)) {
      urlObj.searchParams.set(param, filterParams[param]);
    }
  }

  return urlObj.toString();
};

// Function to extract the URL and LAYER parameter from a given layer's source URL
const extractLayerData = (layer, isMobile) => {
  const source = layer.getSource();

  if (source instanceof TileWMS) {
    const url = source.getUrls();
    const params = source.getParams();
    const cleanedUrl = url ? cleanUrl(url[0], params, isMobile) : "Unknown";
    return {
      url: cleanedUrl,
      layerName: params.LAYERS || "Unknown"
    };
  } else if (source instanceof ImageWMS) {
    const url = source.getUrl();
    const params = source.getParams();
    const cleanedUrl = url ? cleanUrl(url, params, isMobile) : "Unknown";
    return {
      url: cleanedUrl,
      layerName: params.LAYERS || "Unknown"
    };
  }

  return null;
};

// Check if the screen width is less than 600px (mobile view)
const isMobile = window.innerWidth <= 600;

// Iterate through layers and attach the cleaned URL to each layer's graphic
map.getLayers().getArray().forEach(layer => {
  const layerName = layer.get('name');

  if (layerName === 'Map') {
    // Set a local image path for the "map" layer
    layer.set('graphic', './maplegend.png'); // Update this path as per your folder structure
  } else {
    const layerData = extractLayerData(layer, isMobile);
    if (layerData) {
      layer.set('graphic', layerData.url);
    }
  }
});

// To verify the updated layers
const layersData = map.getLayers().getArray().map(layer => ({
  layerName: layer.get('name'),
  graphic: layer.get('graphic') || "No graphic attached"
}));

// Output the result to the console
console.log(layersData);
