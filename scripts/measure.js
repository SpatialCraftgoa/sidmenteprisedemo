import Draw from 'ol/interaction/Draw.js';
import Overlay from 'ol/Overlay.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { LineString, Polygon } from 'ol/geom.js';
import { Vector as VectorSource } from 'ol/source.js';
import VectorLayer from 'ol/layer/Vector.js';
import { getArea, getLength } from 'ol/sphere.js';
import { unByKey } from 'ol/Observable.js';

const source = new VectorSource();
const map = $('#map').data('map');

const vector = new VectorLayer({
  source: source,
  style: {
    'fill-color': 'rgba(255, 255, 255, 0.2)',
    'stroke-color': '#ffcc33',
    'stroke-width': 2,
    'circle-radius': 7,
    'circle-fill-color': '#ffcc33',
  },
});

let sketch;
let helpTooltipElement;
let helpTooltip;
let measureTooltipElement;
let measureTooltip;
let draw;
let measureActive = false;

const typeSelect = document.getElementById('typeUnique101');
const measureIcon = document.getElementById("measure-tool");
const measureForm = document.getElementById("measureFormUnique456");
const closeBtn = document.getElementById("closeBtnUnique303");
const resetBtn = document.getElementById("resetBtnUnique202");

const formatLength = function (line) {
  const length = getLength(line);
  return Math.round(length * 100) / 100 + ' m';
};

const formatArea = function (polygon) {
  const area = getArea(polygon);
  return Math.round(area * 100) / 100 + ' m²';
};

const style = new Style({
  fill: new Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
  stroke: new Stroke({ color: 'rgba(0, 0, 0, 0.5)', lineDash: [10, 10], width: 2 }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({ color: 'rgba(0, 0, 0, 0.7)' }),
    fill: new Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
  }),
});

function addInteraction() {
  if (!measureActive) return;
  const type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
  draw = new Draw({ source: source, type: type, style: () => style });
  map.addInteraction(draw);
  createMeasureTooltip();
  createHelpTooltip();

  let listener;
  draw.on('drawstart', function (evt) {
    sketch = evt.feature;
    let tooltipCoord = evt.coordinate;

    listener = sketch.getGeometry().on('change', function (evt) {
      const geom = evt.target;
      let output;
      if (geom instanceof Polygon) {
        output = formatArea(geom);
        tooltipCoord = geom.getInteriorPoint().getCoordinates();
      } else if (geom instanceof LineString) {
        output = formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();
      }
      measureTooltipElement.innerHTML = output;
      measureTooltip.setPosition(tooltipCoord);
    });
  });

  draw.on('drawend', function () {
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
    measureTooltip.setOffset([0, -7]);
    sketch = null;
    measureTooltipElement = null;
    createMeasureTooltip();
    unByKey(listener);
  });
}

function createHelpTooltip() {
  if (helpTooltipElement) helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'ol-tooltip hidden';
  helpTooltip = new Overlay({ element: helpTooltipElement, offset: [15, 0], positioning: 'center-left' });
  map.addOverlay(helpTooltip);
}

function createMeasureTooltip() {
  if (measureTooltipElement) measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
  measureTooltip = new Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center',
    stopEvent: false,
    insertFirst: false,
  });
  map.addOverlay(measureTooltip);
}

function enableMeasuringTool() {
  measureActive = true;
  addInteraction();
}

function disableMeasuringTool() {
  measureActive = false;
  map.removeInteraction(draw);
  source.clear();
  map.getOverlays().clear();
}

typeSelect.onchange = function () {
  if (measureActive) {
    map.removeInteraction(draw);
    addInteraction();
  }
};

// Show Measurement Form & Hide Icon
measureIcon.addEventListener("click", function () {
  measureIcon.classList.add("hidden");
  measureForm.classList.remove("hidden");
  enableMeasuringTool();
});

// Hide Form & Show Icon (Disable Measurements)
closeBtn.addEventListener("click", function () {
  measureForm.classList.add("hidden");
  measureIcon.classList.remove("hidden");
  disableMeasuringTool();
});

// Reset Button Clears All Measurements
resetBtn.addEventListener("click", function () {
  source.clear();
  map.getOverlays().clear();
  createMeasureTooltip();
  createHelpTooltip();
});

map.addLayer(vector);
